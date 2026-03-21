import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:geolocator/geolocator.dart';
import '../../providers/weather_provider.dart';
import '../../config/theme.dart';
import '../../config/app_config.dart';
import '../common/glass_card.dart';

class WeatherCard extends StatefulWidget {
  const WeatherCard({super.key});

  @override
  State<WeatherCard> createState() => _WeatherCardState();
}

class _WeatherCardState extends State<WeatherCard> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _fetchWithGps());
  }

  Future<void> _fetchWithGps() async {
    double lat = AppConfig.defaultLatitude;
    double lng = AppConfig.defaultLongitude;
    try {
      final svc = await Geolocator.isLocationServiceEnabled();
      if (svc) {
        var perm = await Geolocator.checkPermission();
        if (perm == LocationPermission.denied) {
          perm = await Geolocator.requestPermission();
        }
        if (perm == LocationPermission.whileInUse || perm == LocationPermission.always) {
          final pos = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.low);
          lat = pos.latitude;
          lng = pos.longitude;
        }
      }
    } catch (_) {}
    if (mounted) {
      Provider.of<WeatherProvider>(context, listen: false).fetchWeather(lat, lng);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<WeatherProvider>(
      builder: (context, weatherProvider, child) {
        final theme = Theme.of(context);
        if (weatherProvider.isLoading) {
          return GlassCard(
            padding: const EdgeInsets.all(20),
            child: Center(
              child: SizedBox(
                width: 24, height: 24,
                child: CircularProgressIndicator(strokeWidth: 2, color: theme.colorScheme.primary),
              ),
            ),
          ).animate().shimmer();
        }

        if (weatherProvider.error != null || weatherProvider.currentWeather == null) {
          return GlassCard(
            padding: const EdgeInsets.all(20),
            child: InkWell(
              borderRadius: BorderRadius.circular(20),
              onTap: _fetchWithGps,
              child: Row(
                children: [
                  Icon(Icons.cloud_off, color: theme.colorScheme.onSurfaceVariant),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Weather data unavailable',
                            style:
                                TextStyle(color: theme.colorScheme.onSurfaceVariant)),
                        const SizedBox(height: 2),
                        Text('Tap to retry',
                            style: TextStyle(
                                fontSize: 11,
                                color: theme.colorScheme.primary,
                                fontWeight: FontWeight.w600)),
                      ],
                    ),
                  ),
                  Icon(Icons.refresh_rounded,
                      color: theme.colorScheme.primary, size: 18),
                ],
              ),
            ),
          );
        }

        final data = weatherProvider.currentWeather!['current_weather'];
        final temp = data['temperature']?.toString() ?? '--';
        final wind = data['windspeed']?.toString() ?? '--';
        final isRaining = data['weathercode'] != null && (data['weathercode'] > 50);

        return GlassCard(
          padding: const EdgeInsets.all(20),
          color: isRaining ? theme.colorScheme.primary.withOpacity(0.1) : null,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Current Conditions', style: TextStyle(fontSize: 12, color: theme.colorScheme.onSurfaceVariant)),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Text(
                        '$temp°C',
                        style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: theme.colorScheme.onSurface),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Wind: $wind km/h', style: TextStyle(fontSize: 12, color: theme.colorScheme.onSurfaceVariant)),
                          Text(isRaining ? 'Rain Expected' : 'Clear', 
                            style: TextStyle(
                              fontSize: 12, 
                              fontWeight: FontWeight.bold,
                              color: isRaining ? theme.colorScheme.primary : AppTheme.safeColor,
                            )
                          ),
                        ],
                      )
                    ],
                  ),
                ],
              ),
              Icon(
                isRaining ? Icons.storm : Icons.wb_sunny,
                size: 48,
                color: isRaining ? theme.colorScheme.primary : AppTheme.warningColor,
              ).animate(onPlay: (c) => c.repeat(reverse: true)).slideY(end: 0.1, duration: 2.seconds),
            ],
          ),
        ).animate().fadeIn(duration: 400.ms).slideX(begin: 0.1);
      },
    );
  }
}
