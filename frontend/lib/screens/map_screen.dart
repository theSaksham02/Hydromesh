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

    // Mock user location for the prototype
    final userLocation = const LatLng(51.495, -0.085);

    // Mock Flood Zones for F-07 implementation
    final highRiskZone = Polygon(
      points: const [
        LatLng(51.515, -0.105),
        LatLng(51.510, -0.090),
        LatLng(51.500, -0.095),
        LatLng(51.505, -0.110),
      ],
      color: Colors.red.withOpacity(0.4),
      borderStrokeWidth: 2,
      borderColor: Colors.red,
      isFilled: true,
    );

    final mediumRiskZone = Polygon(
      points: const [
        LatLng(51.490, -0.080),
        LatLng(51.490, -0.070),
        LatLng(51.480, -0.070),
        LatLng(51.480, -0.080),
      ],
      color: Colors.orange.withOpacity(0.4),
      borderStrokeWidth: 2,
      borderColor: Colors.orange,
      isFilled: true,
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Real-Time Flood Map (F-07)'),
      ),
      body: FutureBuilder<List<SensorNode>>(
        future: apiService.fetchSensors(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final sensors = snapshot.data ?? [];
          
          // Sensor markers
          final markers = sensors.map((sensor) {
            return Marker(
              point: LatLng(sensor.lat, sensor.lng),
              width: 40,
              height: 40,
              child: const Icon(
                Icons.sensors,
                color: Colors.black87,
                size: 30,
              ),
            );
          }).toList();

          // Add User Location Marker
          markers.add(
            Marker(
              point: userLocation,
              width: 40,
              height: 40,
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.blue,
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white, width: 3),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.blue.withOpacity(0.5),
                      spreadRadius: 4,
                      blurRadius: 10,
                    )
                  ],
                ),
              ),
            ),
          );

          return FlutterMap(
            options: MapOptions(
              initialCenter: const LatLng(51.5, -0.09), // Default center
              initialZoom: 13.0,
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.example.hydromesh_frontend',
              ),
              PolygonLayer(
                polygons: [highRiskZone, mediumRiskZone],
              ),
              MarkerLayer(markers: markers),
            ],
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Re-center on user mock location
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Locating user...')),
          );
        },
        child: const Icon(Icons.my_location),
      ),
    );
  }
}
