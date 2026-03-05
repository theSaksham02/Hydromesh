import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';
import '../config/app_config.dart';
import '../config/theme.dart';
import '../providers/report_provider.dart';
import '../models/flood_report.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  final MapController _mapController = MapController();

  @override
  void initState() {
    super.initState();
    // Fetch reports when screen loads
    WidgetsBinding.instance.addPostFrameCallback((_) {
      Provider.of<ReportProvider>(context, listen: false).fetchReports();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Flood Map'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: () {
              Provider.of<ReportProvider>(context, listen: false).fetchReports();
            },
          ),
        ],
      ),
      body: Consumer<ReportProvider>(
        builder: (context, reportProvider, child) {
          return Stack(
            children: [
              FlutterMap(
                mapController: _mapController,
                options: MapOptions(
                  initialCenter: LatLng(
                    AppConfig.defaultLatitude,
                    AppConfig.defaultLongitude,
                  ),
                  initialZoom: AppConfig.defaultZoom,
                ),
                children: [
                  // Base map layer
                  TileLayer(
                    urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    userAgentPackageName: 'com.hydromesh.app',
                  ),
                  // Flood report markers
                  MarkerLayer(
                    markers: reportProvider.reports.map((report) {
                      return _buildMarker(report);
                    }).toList(),
                  ),
                ],
              ),
              // Loading indicator
              if (reportProvider.isLoading)
                const Center(child: CircularProgressIndicator()),
              // Legend
              Positioned(
                bottom: 16,
                left: 16,
                child: _buildLegend(),
              ),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => Navigator.pushNamed(context, '/report'),
        child: const Icon(Icons.add),
      ),
    );
  }

  Marker _buildMarker(FloodReport report) {
    return Marker(
      point: LatLng(report.latitude, report.longitude),
      width: 40,
      height: 40,
      child: GestureDetector(
        onTap: () => _showReportDetails(report),
        child: Icon(
          Icons.warning,
          color: _getWaterLevelColor(report.waterLevel),
          size: 40,
        ),
      ),
    );
  }

  Color _getWaterLevelColor(String waterLevel) {
    switch (waterLevel) {
      case 'ankle':
        return Colors.yellow;
      case 'knee':
        return Colors.orange;
      case 'waist':
        return Colors.deepOrange;
      case 'chest':
        return Colors.red;
      case 'above_head':
        return Colors.purple;
      default:
        return Colors.grey;
    }
  }

  Widget _buildLegend() {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text('Water Level', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 4),
            _legendItem(Colors.yellow, 'Ankle'),
            _legendItem(Colors.orange, 'Knee'),
            _legendItem(Colors.deepOrange, 'Waist'),
            _legendItem(Colors.red, 'Chest'),
            _legendItem(Colors.purple, 'Above Head'),
          ],
        ),
      ),
    );
  }

  Widget _legendItem(Color color, String label) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.circle, color: color, size: 12),
        const SizedBox(width: 4),
        Text(label, style: const TextStyle(fontSize: 12)),
      ],
    );
  }

  void _showReportDetails(FloodReport report) {
    showModalBottomSheet(
      context: context,
      builder: (context) => Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Flood Report',
              style: Theme.of(context).textTheme.headlineSmall,
            ),
            const SizedBox(height: 16),
            Text('Water Level: ${report.waterLevel}'),
            if (report.description != null)
              Text('Description: ${report.description}'),
            Text('Reported: ${report.createdAt?.toString() ?? 'Unknown'}'),
          ],
        ),
      ),
    );
  }
}