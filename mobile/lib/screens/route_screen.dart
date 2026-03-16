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
  double _startLat = AppConfig.defaultLatitude;
  double _startLng = AppConfig.defaultLongitude;
  double _destLat = AppConfig.defaultLatitude + 0.018;
  double _destLng = AppConfig.defaultLongitude;
  String _distanceText = '--';
  String _timeText = '--';
  List<LatLng> _routePoints = [];
  List<Map<String, dynamic>> _steps = [];
  String? _routeError;

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
          _destLat = pos.latitude + 0.018;
          _destLng = pos.longitude;
        });
        _mapController.move(LatLng(_startLat, _startLng), 13.5);
      }
    } catch (_) {}
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

      final response = await http.get(url, headers: {'User-Agent': 'Hydromesh/1.0'})
          .timeout(const Duration(seconds: 15));

      if (!mounted) return;

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['code'] == 'Ok' && (data['routes'] as List).isNotEmpty) {
          final route = data['routes'][0];
          final coords = (route['geometry']['coordinates'] as List)
              .map((c) => LatLng((c[1] as num).toDouble(), (c[0] as num).toDouble()))
              .toList();
          final distanceM = (route['distance'] as num).toDouble();
          final durationS = (route['duration'] as num).toDouble();

          // Parse turn-by-turn steps from first leg
          final rawSteps = (route['legs'][0]['steps'] as List?) ?? [];
          final steps = rawSteps.map<Map<String, dynamic>>((s) {
            final maneuver = s['maneuver'] as Map<String, dynamic>? ?? {};
            final type = maneuver['type']?.toString() ?? '';
            final modifier = maneuver['modifier']?.toString() ?? '';
            final name = s['name']?.toString() ?? '';
            final dist = ((s['distance'] as num?)?.toDouble() ?? 0);

            IconData icon;
            if (type == 'arrive') {
              icon = Icons.location_on;
            } else if (type == 'depart') {
              icon = Icons.my_location;
            } else if (modifier.contains('left')) {
              icon = Icons.turn_left;
            } else if (modifier.contains('right')) {
              icon = Icons.turn_right;
            } else if (modifier.contains('uturn')) {
              icon = Icons.u_turn_left;
            } else {
              icon = Icons.straight;
            }

            String instruction;
            if (type == 'arrive') {
              instruction = 'Arrive at destination';
            } else if (type == 'depart') {
              instruction = 'Head ${modifier.isNotEmpty ? modifier : 'forward'}${name.isNotEmpty ? ' on $name' : ''}';
            } else {
              instruction = '${modifier.isNotEmpty ? '${modifier[0].toUpperCase()}${modifier.substring(1)}' : 'Continue'}${name.isNotEmpty ? ' onto $name' : ''}';
            }

            return {
              'icon': icon,
              'instruction': instruction,
              'distance': dist >= 1000
                  ? '${(dist / 1000).toStringAsFixed(1)} km'
                  : '${dist.toInt()} m',
            };
          }).toList();

          setState(() {
            _routePoints = coords;
            _distanceText = distanceM >= 1000
                ? '${(distanceM / 1000).toStringAsFixed(1)} km'
                : '${distanceM.toInt()} m';
            _timeText = durationS >= 3600
                ? '${(durationS / 3600).toStringAsFixed(1)} h'
                : '${(durationS / 60).round()} min';
            _steps = steps;
            _routeFound = true;
          });

          // Fit map to route bounds
          if (coords.isNotEmpty) {
            final lats = coords.map((c) => c.latitude).toList();
            final lngs = coords.map((c) => c.longitude).toList();
            final bounds = LatLngBounds(
              LatLng(lats.reduce((a, b) => a < b ? a : b) - 0.005, lngs.reduce((a, b) => a < b ? a : b) - 0.005),
              LatLng(lats.reduce((a, b) => a > b ? a : b) + 0.005, lngs.reduce((a, b) => a > b ? a : b) + 0.005),
            );
            _mapController.fitCamera(CameraFit.bounds(bounds: bounds, padding: const EdgeInsets.all(50)));
          }
        } else {
          setState(() => _routeError = 'No route found. Try a different destination.');
          _routeFound = false;
        }
      } else {
        setState(() => _routeError = 'Routing service unavailable (${response.statusCode})');
      }
    } on Exception catch (_) {
      if (!mounted) return;
      setState(() => _routeError = 'Could not connect to routing service. Check your internet.');
    } finally {
      if (mounted) setState(() => _isCalculating = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: LatLng(_startLat, _startLng),
              initialZoom: 13.5,
              onTap: (tapPosition, point) {
                setState(() {
                  _destLat = point.latitude;
                  _destLng = point.longitude;
                  _destinationSet = true;
                  _routeFound = false;
                  _steps = [];
                });
              },
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
                subdomains: const ['a', 'b', 'c', 'd'],
                userAgentPackageName: 'com.hydromesh.app',
              ),
              if (_routeFound && _routePoints.isNotEmpty)
                PolylineLayer(
                  polylines: [
                    Polyline(
                      points: _routePoints,
                      color: AppTheme.safeColor,
                      strokeWidth: 5.0,
                    ),
                  ],
                ).animate().fadeIn(duration: 800.ms),
              MarkerLayer(
                markers: [
                  Marker(
                    point: LatLng(_startLat, _startLng),
                    width: 20, height: 20,
                    child: const Icon(Icons.circle, color: AppTheme.primaryColor, size: 20),
                  ),
                  Marker(
                    point: LatLng(_destLat, _destLng),
                    width: 24, height: 24,
                    child: Icon(
                      Icons.location_on,
                      color: _destinationSet ? AppTheme.warningColor : AppTheme.safeColor,
                      size: 24,
                    ),
                  ),
                ],
              ).animate().fadeIn(duration: 500.ms),
            ],
          ),

          // Top bar
          Positioned(
            top: MediaQuery.of(context).padding.top + 16,
            left: 16,
            right: 16,
            child: Row(
              children: [
                Semantics(
                  label: 'Go back',
                  button: true,
                  child: GestureDetector(
                    onTap: () => Navigator.pop(context),
                    child: const GlassCard(
                      padding: EdgeInsets.all(12),
                      borderRadius: 16,
                      child: Icon(Icons.arrow_back_ios_new_rounded, color: Colors.white, size: 20),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  child: GlassCard(
                    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                    borderRadius: 30,
                    child: Text(
                      'Safe Evacuation Routes',
                      style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ],
            ).animate().slideY(begin: -0.2).fadeIn(),
          ),

          // Bottom panel — route info + steps
          DraggableScrollableSheet(
            initialChildSize: _routeFound ? 0.4 : 0.22,
            minChildSize: 0.18,
            maxChildSize: 0.7,
            builder: (context, scrollController) {
              return GlassCard(
                padding: const EdgeInsets.fromLTRB(24, 12, 24, 24),
                borderRadius: 30,
                child: SingleChildScrollView(
                  controller: scrollController,
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Drag handle
                      Center(
                        child: Container(
                          width: 40, height: 4,
                          margin: const EdgeInsets.only(bottom: 16),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(2),
                          ),
                        ),
                      ),

                      // Origin → Destination
                      Row(children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(10)),
                          child: const Icon(Icons.my_location, color: AppTheme.primaryColor),
                        ),
                        const SizedBox(width: 16),
                        const Expanded(child: Text('Current Location', style: TextStyle(fontWeight: FontWeight.w600))),
                      ]),
                      Padding(
                        padding: const EdgeInsets.only(left: 20, top: 4, bottom: 4),
                        child: Container(width: 2, height: 20, color: AppTheme.surfaceLight),
                      ),
                      Row(children: [
                        Container(
                          padding: const EdgeInsets.all(8),
                          decoration: BoxDecoration(color: AppTheme.surfaceLight, borderRadius: BorderRadius.circular(10)),
                          child: const Icon(Icons.location_city, color: AppTheme.safeColor),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: Text(
                            _destinationSet
                                ? 'Custom (${_destLat.toStringAsFixed(4)}, ${_destLng.toStringAsFixed(4)})'
                                : 'Nearest Safe Zone — tap map to set',
                            style: const TextStyle(fontWeight: FontWeight.w600),
                          ),
                        ),
                      ]),

                      const SizedBox(height: 20),

                      if (_routeError != null)
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: AppTheme.dangerColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppTheme.dangerColor.withOpacity(0.3)),
                          ),
                          child: Text(_routeError!, style: const TextStyle(color: AppTheme.dangerColor, fontSize: 13)),
                        )
                      else if (_routeFound) ...[
                        // Stats row
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: AppTheme.safeColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(color: AppTheme.safeColor.withOpacity(0.3)),
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            children: [
                              _RouteStat(label: 'Walking Time', value: _timeText),
                              _RouteStat(label: 'Distance', value: _distanceText),
                              const _RouteStat(label: 'Status', value: 'Safe', color: AppTheme.safeColor),
                            ],
                          ),
                        ).animate().fadeIn().slideY(begin: 0.2),

                        if (_steps.isNotEmpty) ...[
                          const SizedBox(height: 20),
                          const Text('Turn-by-Turn Directions', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: AppTheme.textSecondary)),
                          const SizedBox(height: 12),
                          ..._steps.asMap().entries.map((entry) {
                            final i = entry.key;
                            final step = entry.value;
                            return Padding(
                              padding: const EdgeInsets.only(bottom: 10),
                              child: Row(
                                children: [
                                  Container(
                                    width: 36, height: 36,
                                    decoration: BoxDecoration(
                                      color: AppTheme.surfaceLight,
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    child: Icon(step['icon'] as IconData, color: AppTheme.primaryColor, size: 18),
                                  ),
                                  const SizedBox(width: 12),
                                  Expanded(
                                    child: Text(
                                      step['instruction'] as String,
                                      style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500),
                                    ),
                                  ),
                                  Text(
                                    step['distance'] as String,
                                    style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                                  ),
                                ],
                              ).animate().fadeIn(delay: (i * 40).ms),
                            );
                          }),
                        ],
                      ] else
                        Semantics(
                          label: 'Find safe evacuation route',
                          button: true,
                          child: NeonButton(
                            text: 'FIND SAFE ROUTE',
                            icon: Icons.route,
                            isLoading: _isCalculating,
                            onPressed: _calculateSafeRoute,
                          ),
                        ),
                    ],
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}

class _RouteStat extends StatelessWidget {
  final String label;
  final String value;
  final Color? color;

  const _RouteStat({required this.label, required this.value, this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(label, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: color ?? Colors.white)),
      ],
    );
  }
}
