import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../models/sensor_node.dart';

class MapScreen extends StatelessWidget {
  const MapScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final apiService = Provider.of<ApiService>(context, listen: false);

    return Scaffold(
      appBar: AppBar(
        title: const Text('FloodNet Map'),
      ),
      body: FutureBuilder<List<SensorNode>>(
        future: apiService.fetchSensors(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final sensors = snapshot.data ?? [];
          final markers = sensors.map((sensor) {
            return Marker(
              point: LatLng(sensor.lat, sensor.lng),
              width: 80,
              height: 80,
              child: const Icon(
                Icons.location_on,
                color: Colors.red,
                size: 40,
              ),
            );
          }).toList();

          return FlutterMap(
            options: MapOptions(
              initialCenter: const LatLng(51.5, -0.09), // Default center
              initialZoom: 12.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.example.hydromesh_frontend',
              ),
              MarkerLayer(markers: markers),
            ],
          );
        },
      ),
    );
  }
}
