import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../config/theme.dart';
import '../providers/emergency_provider.dart';
import '../providers/report_provider.dart';
import '../widgets/common/glass_card.dart';

class AlertsScreen extends StatefulWidget {
  const AlertsScreen({super.key});

  @override
  State<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends State<AlertsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<EmergencyProvider>().fetchPendingRequests();
      context.read<ReportProvider>().fetchReports();
    });
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        title: const Text('Alerts & Notifications', style: TextStyle(fontWeight: FontWeight.w700)),
        bottom: TabBar(
          controller: _tabController,
          indicatorColor: AppTheme.primaryColor,
          labelColor: AppTheme.primaryColor,
          unselectedLabelColor: AppTheme.textSecondary,
          tabs: const [
            Tab(text: 'Emergency SOS'),
            Tab(text: 'Flood Reports'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          _EmergencyTab(),
          _ReportsTab(),
        ],
      ),
    );
  }
}

class _EmergencyTab extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Consumer<EmergencyProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }
        final requests = provider.pendingRequests;
        if (requests.isEmpty) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.check_circle_outline, size: 64, color: AppTheme.safeColor),
                const SizedBox(height: 16),
                const Text('No active emergencies', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                const Text('All clear — no SOS requests pending', style: TextStyle(color: AppTheme.textSecondary)),
                const SizedBox(height: 24),
                ElevatedButton.icon(
                  onPressed: () => context.read<EmergencyProvider>().fetchPendingRequests(),
                  icon: const Icon(Icons.refresh),
                  label: const Text('Refresh'),
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.primaryColor),
                ),
              ],
            ),
          );
        }
        return RefreshIndicator(
          onRefresh: () => context.read<EmergencyProvider>().fetchPendingRequests(),
          color: AppTheme.primaryColor,
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: requests.length,
            itemBuilder: (context, i) {
              final req = requests[i];
              final priority = req['priority']?.toString() ?? 'medium';
              final color = priority == 'critical' ? AppTheme.accentColor
                  : priority == 'high' ? AppTheme.dangerColor
                  : priority == 'medium' ? AppTheme.warningColor
                  : AppTheme.safeColor;
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: GlassCard(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 48, height: 48,
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.15),
                          shape: BoxShape.circle,
                          border: Border.all(color: color.withOpacity(0.5)),
                        ),
                        child: Icon(Icons.sos, color: color, size: 24),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              req['description']?.toString() ?? 'Emergency request',
                              style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Row(children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: color.withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(8),
                                ),
                                child: Text(priority.toUpperCase(), style: TextStyle(fontSize: 10, color: color, fontWeight: FontWeight.bold)),
                              ),
                              const SizedBox(width: 8),
                              Text(
                                req['status']?.toString() ?? 'pending',
                                style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                              ),
                            ]),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.arrow_forward_ios, size: 16),
                        onPressed: () => Navigator.pushNamed(context, '/emergency'),
                        color: AppTheme.textSecondary,
                      ),
                    ],
                  ),
                ).animate().fadeIn(delay: (i * 80).ms).slideX(begin: 0.05),
              );
            },
          ),
        );
      },
    );
  }
}

class _ReportsTab extends StatelessWidget {
  Color _levelColor(String level) {
    switch (level) {
      case 'above_head': return AppTheme.accentColor;
      case 'chest': return AppTheme.dangerColor;
      case 'waist': return Colors.orange;
      case 'knee': return AppTheme.warningColor;
      default: return AppTheme.safeColor;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<ReportProvider>(
      builder: (context, provider, _) {
        if (provider.isLoading && provider.reports.isEmpty) {
          return const Center(child: CircularProgressIndicator(color: AppTheme.primaryColor));
        }
        final reports = provider.reports;
        if (reports.isEmpty) {
          return Center(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(Icons.water_drop_outlined, size: 64, color: AppTheme.textSecondary),
                const SizedBox(height: 16),
                const Text('No flood reports yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                const Text('Community reports will appear here', style: TextStyle(color: AppTheme.textSecondary)),
              ],
            ),
          );
        }
        return RefreshIndicator(
          onRefresh: () => provider.fetchReports(),
          color: AppTheme.primaryColor,
          child: ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: reports.length,
            itemBuilder: (context, i) {
              final r = reports[i];
              final color = _levelColor(r.waterLevel);
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: GlassCard(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 48, height: 48,
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Icon(Icons.water_drop, color: color, size: 24),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              '${r.waterLevel.toUpperCase()} water level',
                              style: TextStyle(fontWeight: FontWeight.w600, fontSize: 15, color: color),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              r.description ?? 'No description',
                              style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            const SizedBox(height: 4),
                            Text(
                              '${r.latitude.toStringAsFixed(4)}, ${r.longitude.toStringAsFixed(4)}',
                              style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ).animate().fadeIn(delay: (i * 60).ms).slideX(begin: 0.05),
              );
            },
          ),
        );
      },
    );
  }
}
