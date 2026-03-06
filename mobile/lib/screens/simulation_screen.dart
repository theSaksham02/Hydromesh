import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../config/theme.dart';
import '../services/api_service.dart';
import '../widgets/common/glass_card.dart';

class SimulationScreen extends StatefulWidget {
  const SimulationScreen({super.key});

  @override
  State<SimulationScreen> createState() => _SimulationScreenState();
}

class _SimulationScreenState extends State<SimulationScreen> {
  bool _isLoading = false;
  String _activeCity = 'london';

  final List<Map<String, dynamic>> _cities = [
    {'name': 'London', 'id': 'london'},
    {'name': 'Mumbai', 'id': 'mumbai'},
    {'name': 'Miami', 'id': 'miami'},
    {'name': 'Tokyo', 'id': 'tokyo'},
  ];

  final List<Map<String, dynamic>> _simulations = [
    {'type': 1, 'name': 'Flash Flood', 'desc': 'Sudden spike of severe reports', 'icon': Icons.flash_on},
    {'type': 2, 'name': 'Rising Tide', 'desc': 'Gradual escalation of water levels', 'icon': Icons.waves},
    {'type': 3, 'name': 'Mass Evacuation', 'desc': 'Radius escape vector stress-test', 'icon': Icons.run_circle_outlined},
    {'type': 4, 'name': 'Responder Coordination', 'desc': 'Simulate multiple SOS beacons', 'icon': Icons.health_and_safety},
    {'type': 5, 'name': 'Global Anomaly', 'desc': 'Spawns events across multiple cities', 'icon': Icons.public},
  ];

  Future<void> _runSimulation(int type) async {
    setState(() => _isLoading = true);

    try {
      final res = await ApiService.post('/simulation/run', {
        'type': type,
        'cityKey': _activeCity,
      });

      if (!mounted) return;

      if (res['success']) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Simulation $type initiated! Open Map to view.'),
            backgroundColor: AppTheme.safeColor,
          ),
        );
      } else {
        throw Exception(res['error']);
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Failed: $e'),
          backgroundColor: AppTheme.dangerColor,
        ),
      );
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        title: const Text('God Mode (Simulations)'),
        backgroundColor: Colors.transparent,
      ),
      body: _isLoading 
        ? const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor))
        : SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const Text('Select Target Region', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 16),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: _cities.map((city) {
                    final isSelected = _activeCity == city['id'];
                    return ChoiceChip(
                      label: Text(city['name']),
                      selected: isSelected,
                      onSelected: (val) => setState(() => _activeCity = city['id']),
                      selectedColor: AppTheme.primaryColor.withOpacity(0.3),
                      backgroundColor: AppTheme.surfaceLight,
                      side: BorderSide(color: isSelected ? AppTheme.primaryColor : Colors.transparent),
                    );
                  }).toList(),
                ).animate().fadeIn().slideY(begin: 0.1),
                
                const SizedBox(height: 32),
                
                const Text('Trigger Simulation Events', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                const SizedBox(height: 16),
                
                ..._simulations.map((sim) => Padding(
                  padding: const EdgeInsets.only(bottom: 16),
                  child: GestureDetector(
                    onTap: () => _runSimulation(sim['type']),
                    child: GlassCard(
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        children: [
                          Icon(sim['icon'], color: AppTheme.dangerColor, size: 32),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(sim['name'], style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
                                const SizedBox(height: 4),
                                Text(sim['desc'], style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                              ],
                            ),
                          ),
                          const Icon(Icons.play_arrow, color: Colors.white),
                        ],
                      ),
                    ),
                  ).animate().fadeIn(delay: (100 * sim['type']).ms).slideX(begin: 0.1),
                )).toList(),
              ],
            ),
          ),
    );
  }
}
