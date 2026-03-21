import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;
import '../config/theme.dart';
import '../config/app_config.dart';
import '../widgets/common/glass_card.dart';
import '../widgets/common/neon_button.dart';

class RouteScreen extends StatefulWidget {
  const RouteScreen({super.key});

  @override
  State<RouteScreen> createState() => _RouteScreenState();
}

class _RouteScreenState extends State<RouteScreen> {
  final MapController _mapController = MapController();
  bool _isCalculating = false;
  bool _routeFound = false;
  bool _destinationSet = false;
  bool _argsLoaded = false;
  bool _isEmergencyRoute = false;
  double _startLat = AppConfig.defaultLatitude;
  double _startLng = AppConfig.defaultLongitude;
  double _destLat = AppConfig.defaultLatitude + 0.018;
  double _destLng = AppConfig.defaultLongitude;
  String? _destName;
  String? _destDesc;
  String _distanceText = '--';
  String _timeText = '--';
  List<LatLng> _routePoints = [];
  List<Map<String, dynamic>> _steps = [];
  String? _routeError;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_argsLoaded) {
      _argsLoaded = true;
      final args = ModalRoute.of(context)?.settings.arguments as Map<String, dynamic>?;
      if (args != null) {
        _destLat = double.tryParse(args['destLat']?.toString() ?? '') ?? 0.0;
        _destLng = double.tryParse(args['destLng']?.toString() ?? '') ?? 0.0;
        _destName = args['destName'] as String?;
        _destDesc = args['destDesc'] as String?;
        _destinationSet = true;
        _isEmergencyRoute = true;
      }
    }
  }

  @override
  void initState() {
    super.initState();
    _getLocation();
  }

  Future<void> _getLocation() async {
    try {
      bool serviceEnabled = await Geolocator.isLocationServiceEnabled();
      if (!serviceEnabled) return;
      LocationPermission perm = await Geolocator.checkPermission();
      if (perm == LocationPermission.denied) {
        perm = await Geolocator.requestPermission();
        if (perm == LocationPermission.denied) return;
      }
      final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.medium);
      if (mounted) {
        setState(() {
          _startLat = pos.latitude;
          _startLng = pos.longitude;
          if (!_destinationSet) {
            _destLat = pos.latitude + 0.018;
            _destLng = pos.longitude;
          }
        });
        _mapController.move(LatLng(_startLat, _startLng), 13.5);
        if (_destinationSet && _isEmergencyRoute) {
          await _calculateSafeRoute();
        }
      }
    } catch (_) {
      if (_destinationSet && _isEmergencyRoute && mounted) {
        await _calculateSafeRoute();
      }
    }
  }

  Future<void> _calculateSafeRoute() async {
    setState(() {
      _isCalculating = true;
      _routeError = null;
      _routeFound = false;
      _steps = [];
    });

    try {
      final url = Uri.parse(
        'https://router.project-osrm.org/route/v1/walking/'
        '$_startLng,$_startLat;$_destLng,$_destLat'
        '?overview=full&geometries=geojson&steps=true',
      );

      final response = await http
          .get(url, headers: {'User-Agent': 'Hydromesh/1.0'})
          .timeout(const Duration(seconds: 15));

      if (!mounted) return;

      final data = jsonDecode(response.body) as Map<String, dynamic>;
      if (data['code'] != 'Ok' || (data['routes'] as List).isEmpty) {
        setState(() {
          _routeError = 'No route found. Try tapping a closer destination.';
          _isCalculating = false;
        });
        return;
      }

      final route = (data['routes'] as List).first as Map<String, dynamic>;
      final distanceM = double.tryParse(route['distance']?.toString() ?? '') ?? 0.0;
      final durationS = double.tryParse(route['duration']?.toString() ?? '') ?? 0.0;

      final coords = (route['geometry']['coordinates'] as List)
          .map((c) => LatLng(
                double.tryParse(c[1]?.toString() ?? '') ?? 0.0,
                double.tryParse(c[0]?.toString() ?? '') ?? 0.0,
              ))
          .toList();

      final legs = route['legs'] as List;
      final rawSteps = legs.isNotEmpty ? (legs.first as Map)['steps'] as List : [];
      final steps = rawSteps.map<Map<String, dynamic>>((s) {
        final maneuver = s['maneuver'] as Map<String, dynamic>;
        final type = maneuver['type'] as String? ?? '';
        final modifier = maneuver['modifier'] as String? ?? '';
        final name = s['name'] as String? ?? '';
        final dist = double.tryParse(s['distance']?.toString() ?? '') ?? 0.0;

        IconData icon;
        String instruction;

        if (type == 'depart') {
          icon = Icons.my_location;
          instruction = 'Start on ${name.isNotEmpty ? name : 'the route'}';
        } else if (type == 'arrive') {
          icon = Icons.location_on;
          instruction = _destName != null ? 'Arrive at $_destName' : 'Arrive at destination';
        } else if (modifier.contains('left')) {
          icon = modifier.contains('sharp') ? Icons.turn_sharp_left : Icons.turn_left;
          instruction = 'Turn ${modifier.replaceAll('-', ' ')} onto ${name.isNotEmpty ? name : 'the road'}';
        } else if (modifier.contains('right')) {
          icon = modifier.contains('sharp') ? Icons.turn_sharp_right : Icons.turn_right;
          instruction = 'Turn ${modifier.replaceAll('-', ' ')} onto ${name.isNotEmpty ? name : 'the road'}';
        } else if (modifier == 'uturn') {
          icon = Icons.u_turn_left;
          instruction = 'Make a U-turn';
        } else {
          icon = Icons.straight;
          instruction = name.isNotEmpty ? 'Continue on $name' : 'Continue straight';
        }

        final distStr = dist < 1000
            ? '${dist.toStringAsFixed(0)} m'
            : '${(dist / 1000).toStringAsFixed(1)} km';

        return {'icon': icon, 'instruction': instruction, 'distance': distStr};
      }).toList();

      if (!mounted) return;

      setState(() {
        _routePoints = coords;
        _routeFound = true;
        _isCalculating = false;
        _distanceText = distanceM < 1000
            ? '${distanceM.toStringAsFixed(0)} m'
            : '${(distanceM / 1000).toStringAsFixed(1)} km';
        _timeText = durationS < 3600
            ? '${(durationS / 60).ceil()} min'
            : '${(durationS / 3600).toStringAsFixed(1)} h';
        _steps = steps;
      });

      if (coords.length >= 2) {
        final minLat = coords.map((c) => c.latitude).reduce((a, b) => a < b ? a : b);
        final maxLat = coords.map((c) => c.latitude).reduce((a, b) => a > b ? a : b);
        final minLng = coords.map((c) => c.longitude).reduce((a, b) => a < b ? a : b);
        final maxLng = coords.map((c) => c.longitude).reduce((a, b) => a > b ? a : b);
        _mapController.fitCamera(
          CameraFit.bounds(
            bounds: LatLngBounds(LatLng(minLat, minLng), LatLng(maxLat, maxLng)),
            padding: const EdgeInsets.all(48),
          ),
        );
      }
    } catch (e) {
      if (!mounted) return;
      setState(() {
        _routeError = 'Connection error. Check your network.';
        _isCalculating = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: LatLng(_startLat, _startLng),
              initialZoom: 13.5,
              onTap: (tapPosition, point) {
                if (!_isEmergencyRoute) {
                  setState(() {
                    _destLat = point.latitude;
                    _destLng = point.longitude;
                    _destinationSet = true;
                    _destName = null;
                  });
                }
              },
            ),
            children: [
              TileLayer(
                urlTemplate: isDark 
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
                  : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png',
                subdomains: const ['a', 'b', 'c', 'd'],
                userAgentPackageName: 'com.hydromesh.app',
              ),
              if (_routePoints.isNotEmpty)
                PolylineLayer(
                  polylines: [
                    Polyline(
                      points: _routePoints,
                      color: _isEmergencyRoute ? AppTheme.dangerColor : AppTheme.safeColor,
                      strokeWidth: 5.0,
                    ),
                  ],
                ),
              MarkerLayer(
                markers: [
                  Marker(
                    point: LatLng(_startLat, _startLng),
                    width: 40,
                    height: 40,
                    child: Container(
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: theme.colorScheme.primary.withOpacity(0.2),
                        border: Border.all(color: theme.colorScheme.primary, width: 2),
                      ),
                      child: Icon(Icons.my_location, color: theme.colorScheme.primary, size: 20),
                    ),
                  ),
                  if (_destinationSet)
                    Marker(
                      point: LatLng(_destLat, _destLng),
                      width: 40,
                      height: 40,
                      child: Icon(
                        _isEmergencyRoute ? Icons.health_and_safety : Icons.location_on,
                        color: _isEmergencyRoute ? AppTheme.dangerColor : AppTheme.warningColor,
                        size: 36,
                      ),
                    ),
                ],
              ),
            ],
          ),

          // Back button
          Positioned(
            top: MediaQuery.of(context).padding.top + 8,
            left: 16,
            child: GestureDetector(
              onTap: () => Navigator.pop(context),
              child: GlassCard(
                padding: const EdgeInsets.all(10),
                child: Icon(Icons.arrow_back, color: theme.colorScheme.onSurface, size: 22),
              ),
            ),
          ),

          // Emergency Route Banner
          if (_isEmergencyRoute)
            Positioned(
              top: MediaQuery.of(context).padding.top + 8,
              left: 72,
              right: 16,
              child: GlassCard(
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(
                  children: [
                    const Icon(Icons.health_and_safety, color: AppTheme.dangerColor, size: 18),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'EVACUATION ROUTE',
                            style: TextStyle(
                              color: AppTheme.dangerColor,
                              fontSize: 10,
                              fontWeight: FontWeight.w900,
                              letterSpacing: 1,
                            ),
                          ),
                          if (_destName != null)
                            Text(
                              _destName!,
                              style: TextStyle(color: theme.colorScheme.onSurface, fontSize: 11, fontWeight: FontWeight.w700),
                              overflow: TextOverflow.ellipsis,
                            ),
                        ],
                      ),
                    ),
                  ],
                ),
              ).animate().fadeIn(duration: 300.ms).slideY(begin: -0.3),
            ),

          // Hint when not emergency
          if (!_isEmergencyRoute && !_destinationSet)
            Positioned(
              top: MediaQuery.of(context).padding.top + 60,
              left: 0,
              right: 0,
              child: Center(
                child: GlassCard(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  child: Text('Tap on the map to set destination', 
                    style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 13, fontWeight: FontWeight.w600)),
                ),
              ).animate().fadeIn(duration: 400.ms),
            ),

          // Bottom draggable panel
          DraggableScrollableSheet(
            initialChildSize: 0.28,
            minChildSize: 0.15,
            maxChildSize: 0.65,
            builder: (context, scrollController) {
              return Container(
                decoration: BoxDecoration(
                  color: theme.colorScheme.surface,
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(isDark ? 0.4 : 0.1), blurRadius: 20)],
                ),
                child: ListView(
                  controller: scrollController,
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  children: [
                    Center(
                      child: Container(
                        width: 40, height: 4,
                        decoration: BoxDecoration(
                          color: isDark ? theme.colorScheme.surfaceContainerHigh : Colors.black.withOpacity(0.1), 
                          borderRadius: BorderRadius.circular(2)
                        ),
                      ),
                    ),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _statChip(context, Icons.directions_walk, _timeText, 'Walk Time'),
                        _statChip(context, Icons.straighten, _distanceText, 'Distance'),
                        _statChip(
                          context,
                          Icons.shield,
                          _isEmergencyRoute ? 'Evac' : 'Safe',
                          'Status',
                          color: _isEmergencyRoute ? AppTheme.dangerColor : AppTheme.safeColor,
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    if (_isCalculating)
                      Center(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 24),
                          child: Column(
                            children: [
                              CircularProgressIndicator(color: theme.colorScheme.primary),
                              const SizedBox(height: 12),
                              Text('Calculating route...', style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontWeight: FontWeight.w600)),
                            ],
                          ),
                        ),
                      )
                    else if (_routeError != null)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        child: Column(
                          children: [
                            Text(_routeError!, 
                              style: const TextStyle(color: AppTheme.dangerColor, fontWeight: FontWeight.w700), 
                              textAlign: TextAlign.center),
                            const SizedBox(height: 12),
                            ElevatedButton.icon(
                              onPressed: _calculateSafeRoute,
                              icon: const Icon(Icons.refresh),
                              label: const Text('Retry'),
                            ),
                          ],
                        ),
                      )
                    else if (!_destinationSet)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 16),
                        child: Text('Tap the map to choose a destination', 
                          style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontWeight: FontWeight.w600), 
                          textAlign: TextAlign.center),
                      )
                    else if (!_routeFound)
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 8),
                        child: Semantics(
                          label: 'Calculate safe route',
                          button: true,
                          child: NeonButton(
                            text: 'Calculate Route',
                            icon: Icons.route,
                            neonColor: _isEmergencyRoute ? AppTheme.dangerColor : AppTheme.safeColor,
                            onPressed: _calculateSafeRoute,
                          ),
                        ),
                      )
                    else ...[
                      if (_destName != null)
                        Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: Row(
                            children: [
                              const Icon(Icons.health_and_safety, color: AppTheme.dangerColor, size: 16),
                              const SizedBox(width: 8),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(_destName!, style: TextStyle(fontWeight: FontWeight.w800, fontSize: 13, color: theme.colorScheme.onSurface)),
                                    if (_destDesc != null)
                                      Text(_destDesc!, style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.w500)),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ..._steps.map((step) => Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(6),
                                  decoration: BoxDecoration(
                                    color: (_isEmergencyRoute ? AppTheme.dangerColor : AppTheme.safeColor).withOpacity(0.15),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Icon(step['icon'] as IconData, color: _isEmergencyRoute ? AppTheme.dangerColor : AppTheme.safeColor, size: 18),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(step['instruction'] as String, 
                                        style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: theme.colorScheme.onSurface)),
                                      Text(step['distance'] as String, 
                                        style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.w600)),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                          )),
                    ],
                    const SizedBox(height: 20),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _statChip(BuildContext context, IconData icon, String value, String label, {Color? color}) {
    final theme = Theme.of(context);
    final c = color ?? theme.colorScheme.primary;
    return Column(
      children: [
        Icon(icon, color: c, size: 22),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(color: c, fontWeight: FontWeight.w900, fontSize: 16)),
        Text(label, style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 11, fontWeight: FontWeight.w700)),
      ],
    );
  }
}
