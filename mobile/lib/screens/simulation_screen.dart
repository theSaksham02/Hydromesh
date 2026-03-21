import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/simulation_provider.dart';
import '../widgets/common/glass_card.dart';

class SimulationScreen extends StatelessWidget {
  const SimulationScreen({super.key});

  static const List<Map<String, dynamic>> _cities = [
    {'name': 'London', 'id': 'london'},
    {'name': 'Mumbai', 'id': 'mumbai'},
    {'name': 'Miami', 'id': 'miami'},
    {'name': 'Tokyo', 'id': 'tokyo'},
  ];

  static const List<Map<String, dynamic>> _simulations = [
    {'type': 1, 'name': 'Flash Flood', 'desc': 'Sudden spike of severe reports', 'icon': Icons.flash_on},
    {'type': 2, 'name': 'Rising Tide', 'desc': 'Gradual escalation of water levels', 'icon': Icons.waves},
    {'type': 3, 'name': 'Mass Evacuation', 'desc': 'Radius escape vector stress-test', 'icon': Icons.run_circle_outlined},
    {'type': 4, 'name': 'Responder Coordination', 'desc': 'Simulate multiple SOS beacons', 'icon': Icons.health_and_safety},
    {'type': 5, 'name': 'Global Anomaly', 'desc': 'Spawns events across multiple cities', 'icon': Icons.public},
  ];

  Future<void> _runSimulation(BuildContext context, int type, String name) async {
    final sim = context.read<SimulationProvider>();
    final ok = await sim.startSimulation(type, name);
    if (!context.mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(ok
            ? '$name simulation active! Open Map or press SOS to evacuate.'
            : 'Failed to start simulation. Check connection.'),
        backgroundColor: ok ? AppTheme.safeColor : AppTheme.dangerColor,
      ),
    );
  }

  Future<void> _stopSimulation(BuildContext context) async {
    await context.read<SimulationProvider>().stopSimulation();
    if (!context.mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Simulation stopped & data cleared'),
        backgroundColor: AppTheme.warningColor,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final sim = context.watch<SimulationProvider>();
    final isActive = sim.isActive;

    return Scaffold(
      backgroundColor: theme.scaffoldBackgroundColor,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text('God Mode', style: TextStyle(fontWeight: FontWeight.w900, color: theme.colorScheme.onSurface)),
            if (isActive) ...[
              const SizedBox(width: 10),
              Container(
                width: 8,
                height: 8,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppTheme.dangerColor,
                  boxShadow: [BoxShadow(color: AppTheme.dangerColor.withOpacity(0.7), blurRadius: 6)],
                ),
              ).animate(onPlay: (c) => c.repeat(reverse: true))
                  .scaleXY(end: 1.5, duration: 600.ms),
            ],
          ],
        ),
      ),
      body: sim.isLoading
          ? Center(child: CircularProgressIndicator(color: theme.colorScheme.primary))
          : SingleChildScrollView(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  if (isActive) ...[
                    GlassCard(
                      padding: const EdgeInsets.all(20),
                      child: Column(
                        children: [
                          Row(
                            children: [
                              const Icon(Icons.warning_amber_rounded, color: AppTheme.dangerColor, size: 28),
                              const SizedBox(width: 12),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Active: ${sim.activeSimName}',
                                      style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: theme.colorScheme.onSurface),
                                    ),
                                    Text(
                                      'Region: ${sim.activeCity[0].toUpperCase()}${sim.activeCity.substring(1)}',
                                      style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 13, fontWeight: FontWeight.w600),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 8),
                          const Text(
                            'Press SOS on the home screen to get your evacuation route.',
                            style: TextStyle(color: AppTheme.safeColor, fontSize: 12, fontWeight: FontWeight.w700),
                            textAlign: TextAlign.center,
                          ),
                          const SizedBox(height: 16),
                          Semantics(
                            label: 'Stop active simulation',
                            button: true,
                            child: SizedBox(
                              width: double.infinity,
                              child: ElevatedButton.icon(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: AppTheme.dangerColor,
                                  foregroundColor: Colors.white,
                                  padding: const EdgeInsets.symmetric(vertical: 14),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                                ),
                                onPressed: sim.isStopping ? null : () => _stopSimulation(context),
                                icon: sim.isStopping
                                    ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                                    : const Icon(Icons.stop_circle_outlined),
                                label: Text(sim.isStopping ? 'Stopping...' : 'Stop & Reset Simulation', style: const TextStyle(fontWeight: FontWeight.w900)),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ).animate().fadeIn().slideY(begin: -0.1),
                    const SizedBox(height: 24),
                  ],

                  Text('Select Target Region', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: theme.colorScheme.onSurface)),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: _cities.map((city) {
                      final isSelected = sim.activeCity == city['id'];
                      return Semantics(
                        label: 'Select ${city['name']} as target region',
                        selected: isSelected,
                        child: ChoiceChip(
                          label: Text(city['name'] as String, style: TextStyle(color: isSelected ? theme.colorScheme.onPrimary : theme.colorScheme.onSurface, fontWeight: FontWeight.w700)),
                          selected: isSelected,
                          onSelected: (_) => context.read<SimulationProvider>().setActiveCity(city['id'] as String),
                          selectedColor: theme.colorScheme.primary,
                          backgroundColor: theme.colorScheme.surfaceContainerHigh,
                          side: BorderSide(color: isSelected ? theme.colorScheme.primary : Colors.transparent),
                        ),
                      );
                    }).toList(),
                  ).animate().fadeIn(delay: 100.ms).slideY(begin: 0.1),

                  const SizedBox(height: 32),
                  Text('Trigger Simulation Events', style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: theme.colorScheme.onSurface)),
                  const SizedBox(height: 16),

                  ..._simulations.map((sim_item) => Padding(
                        padding: const EdgeInsets.only(bottom: 16),
                        child: Semantics(
                          label: 'Run ${sim_item['name']} simulation: ${sim_item['desc']}',
                          button: true,
                          child: GestureDetector(
                            onTap: () => _runSimulation(context, sim_item['type'] as int, sim_item['name'] as String),
                            child: GlassCard(
                              padding: const EdgeInsets.all(20),
                              child: Row(
                                children: [
                                  Icon(sim_item['icon'] as IconData, color: AppTheme.dangerColor, size: 32),
                                  const SizedBox(width: 16),
                                  Expanded(
                                    child: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text(sim_item['name'] as String, style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16, color: theme.colorScheme.onSurface)),
                                        const SizedBox(height: 4),
                                        Text(sim_item['desc'] as String, style: TextStyle(color: theme.colorScheme.onSurfaceVariant, fontSize: 12, fontWeight: FontWeight.w600)),
                                      ],
                                    ),
                                  ),
                                  Icon(Icons.play_arrow_rounded, color: theme.colorScheme.primary),
                                ],
                              ),
                            ),
                          ),
                        ).animate().fadeIn(delay: (150 * (sim_item['type'] as int)).ms).slideX(begin: 0.1),
                      )),
                ],
              ),
            ),
    );
  }
}
