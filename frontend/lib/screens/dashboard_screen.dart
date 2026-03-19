import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
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
    final theme = Theme.of(context);
    
    return Scaffold(
      backgroundColor: theme.colorScheme.background,
      appBar: AppBar(
        title: const Text(
          'Sensor Network',
          style: TextStyle(fontWeight: FontWeight.w800, fontSize: 20),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.map_outlined),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const MapScreen()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.logout_outlined),
            onPressed: () {
              Provider.of<ApiService>(context, listen: false).logout();
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: RefreshIndicator(
        color: theme.colorScheme.primary,
        onRefresh: () async {
          _fetchSensors();
        },
        child: FutureBuilder<List<SensorNode>>(
          future: _sensorsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(
                child: const CircularProgressIndicator(strokeWidth: 2)
                    .animate(onPlay: (controller) => controller.repeat())
                    .shimmer(duration: 1200.ms, color: theme.colorScheme.primary.withOpacity(0.3))
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(Icons.error_outline, size: 48, color: Colors.redAccent)
                        .animate().shake(duration: 500.ms),
                    const SizedBox(height: 16),
                    Text('Failed to load sensors', style: theme.textTheme.bodyLarge),
                    TextButton(onPressed: _fetchSensors, child: const Text('Try Again')),
                  ],
                ),
              );
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.sensors_off_outlined, size: 48, color: Color(0xFF94A3B8))
                        .animate().fadeIn(duration: 600.ms).scale(begin: const Offset(0.8, 0.8)),
                    SizedBox(height: 16),
                    Text('No sensors found'),
                  ],
                ),
              );
            }

            final sensors = snapshot.data!;
            return ListView.builder(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
              itemCount: sensors.length,
              itemBuilder: (context, index) {
                return SensorCard(sensor: sensors[index])
                    .animate(delay: (100 * index).ms) // Staggered delay
                    .fadeIn(duration: 500.ms, curve: Curves.easeOutQuad)
                    .slideY(begin: 0.2, end: 0, duration: 500.ms, curve: Curves.easeOutQuad);
              },
            );
          },
        ),
      ),
    );
  }
}
