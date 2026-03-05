import 'package:flutter/material.dart';

class WaterLevelSelector extends StatelessWidget {
  final Function(String) onSelected;

  const WaterLevelSelector({
    super.key,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Select Water Level:',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          children: [
            _buildLevelChip('Ankle', 'ankle', Colors.yellow),
            _buildLevelChip('Knee', 'knee', Colors.orange),
            _buildLevelChip('Waist', 'waist', Colors.deepOrange),
            _buildLevelChip('Chest', 'chest', Colors.red),
            _buildLevelChip('Above Head', 'above_head', Colors.purple),
          ],
        ),
      ],
    );
  }

  Widget _buildLevelChip(String label, String value, Color color) {
    return ActionChip(
      label: Text(label),
      backgroundColor: color.withOpacity(0.2),
      side: BorderSide(color: color),
      onPressed: () => onSelected(value),
    );
  }
}