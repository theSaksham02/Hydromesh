import 'package:flutter/material.dart';
import '../models/sensor_node.dart';

class SensorCard extends StatelessWidget {
  final SensorNode sensor;

  const SensorCard({super.key, required this.sensor});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      color: sensor.isFlooding ? Colors.red.shade50 : Colors.white,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  sensor.name,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Icon(
                  sensor.isFlooding ? Icons.warning : Icons.check_circle,
                  color: sensor.isFlooding ? Colors.red : Colors.green,
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              'Water Level: ${sensor.waterLevel.toStringAsFixed(2)}m',
              style: const TextStyle(fontSize: 16),
            ),
            const SizedBox(height: 8),
            Text(
              'Status: ${sensor.isFlooding ? 'CRITICAL - Flooding Detected' : 'Normal'}',
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: sensor.isFlooding ? Colors.red : Colors.green,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
