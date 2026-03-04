import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../services/api_service.dart';
import '../models/sensor_node.dart';
import '../widgets/sensor_card.dart';
import 'map_screen.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  late Future<List<SensorNode>> _sensorsFuture;

  @override
  void initState() {
    super.initState();
    _fetchSensors();
  }

  void _fetchSensors() {
    final apiService = Provider.of<ApiService>(context, listen: false);
    setState(() {
      _sensorsFuture = apiService.fetchSensors();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('HydroMesh Dashboard'),
        actions: [
          IconButton(
            icon: const Icon(Icons.map),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const MapScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () {
              Provider.of<ApiService>(context, listen: false).logout();
            },
          ),
        ],
      ),
      body: RefreshIndicator(
        onRefresh: () async {
          _fetchSensors();
        },
        child: FutureBuilder<List<SensorNode>>(
          future: _sensorsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text('No sensors found.'));
            }

            final sensors = snapshot.data!;
            return ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: sensors.length,
              itemBuilder: (context, index) {
                return SensorCard(sensor: sensors[index]);
              },
            );
          },
        ),
      ),
    );
  }
}
