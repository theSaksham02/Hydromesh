import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/auth_provider.dart';
import '../providers/theme_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    Future.wait([
      Future.delayed(const Duration(milliseconds: 2800)),
      _waitForRestore(),
      _waitForThemeLoad(),
    ]).then((_) {
      if (!mounted) return;
      final themeProvider = context.read<ThemeProvider>();
      if (themeProvider.isFirstLaunch) {
        Navigator.pushReplacementNamed(context, '/accessibility');
      } else {
        final auth = context.read<AuthProvider>();
        Navigator.pushReplacementNamed(
          context,
          auth.isAuthenticated ? '/home' : '/login',
        );
      }
    });
  }

  Future<void> _waitForRestore() async {
    final auth = context.read<AuthProvider>();
    if (!auth.isRestoring) return;
    await Future.doWhile(() async {
      await Future.delayed(const Duration(milliseconds: 50));
      return context.read<AuthProvider>().isRestoring;
    });
  }

  Future<void> _waitForThemeLoad() async {
    await Future.doWhile(() async {
      await Future.delayed(const Duration(milliseconds: 50));
      return !context.read<ThemeProvider>().isLoaded;
    });
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppTheme.background : const Color(0xFFF5F7FA);
    final textColor = isDark ? Colors.white : const Color(0xFF0D0D0D);
    final subtitleColor = isDark ? AppTheme.textSecondary : const Color(0xFF6B7280);

    return Scaffold(
      backgroundColor: bg,
      body: SafeArea(
        child: Column(
          children: [
            // ── Main Logo Section ──────────────────────────────────────
            Expanded(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    // Logo glow container
                    Container(
                      padding: const EdgeInsets.all(32),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppTheme.primaryColor.withValues(alpha: 0.1),
                        boxShadow: [
                          BoxShadow(
                            color: AppTheme.primaryColor.withValues(alpha: 0.3),
                            blurRadius: 60,
                            spreadRadius: 20,
                          ),
                        ],
                      ),
                      child: const Icon(
                        Icons.water_drop_rounded,
                        size: 80,
                        color: AppTheme.primaryColor,
                      ),
                    )
                        .animate()
                        .scaleXY(begin: 0.5, end: 1.0, duration: 800.ms, curve: Curves.easeOutBack)
                        .fadeIn(duration: 800.ms)
                        .then()
                        .shimmer(duration: 1.5.seconds, color: Colors.white.withValues(alpha: 0.4)),

                    const SizedBox(height: 32),

                    // App name
                    Text(
                      'HydroMesh',
                      style: TextStyle(
                        fontSize: 40,
                        fontWeight: FontWeight.w900,
                        letterSpacing: -1.5,
                        color: textColor,
                      ),
                    )
                        .animate()
                        .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 400.ms, curve: Curves.easeOut)
                        .fadeIn(duration: 600.ms, delay: 400.ms),

                    const SizedBox(height: 10),

                    Text(
                      'Community-Driven Flood Prediction & Emergency Response',
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w500,
                        color: subtitleColor,
                        letterSpacing: 0.3,
                      ),
                      textAlign: TextAlign.center,
                    )
                        .animate()
                        .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 600.ms, curve: Curves.easeOut)
                        .fadeIn(duration: 600.ms, delay: 600.ms),

                    const SizedBox(height: 20),

                    // Version badge
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(color: AppTheme.primaryColor.withValues(alpha: 0.4)),
                        color: AppTheme.primaryColor.withValues(alpha: 0.08),
                      ),
                      child: Text(
                        'v1.0.0  ·  Open Source',
                        style: TextStyle(
                          fontSize: 11,
                          color: AppTheme.primaryColor,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 0.8,
                        ),
                      ),
                    )
                        .animate()
                        .fadeIn(duration: 500.ms, delay: 900.ms),
                  ],
                ),
              ),
            ),

            // ── Powered By Section ─────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
              child: Column(
                children: [
                  Text(
                    'POWERED BY OPEN SOURCE',
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      color: subtitleColor,
                      letterSpacing: 2.0,
                    ),
                  ),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    alignment: WrapAlignment.center,
                    children: const [
                      _PoweredByChip(icon: Icons.map_outlined,       label: 'OpenStreetMap'),
                      _PoweredByChip(icon: Icons.route,               label: 'OSRM Routing'),
                      _PoweredByChip(icon: Icons.wb_sunny_outlined,   label: 'Open-Meteo'),
                      _PoweredByChip(icon: Icons.storage_outlined,    label: 'Supabase'),
                      _PoweredByChip(icon: Icons.bolt_outlined,       label: 'Socket.io'),
                    ],
                  ),
                ],
              )
                  .animate()
                  .fadeIn(duration: 700.ms, delay: 1200.ms)
                  .slideY(begin: 0.3, end: 0, duration: 600.ms, delay: 1200.ms),
            ),
          ],
        ),
      ),
    );
  }
}

class _PoweredByChip extends StatelessWidget {
  final IconData icon;
  final String label;

  const _PoweredByChip({required this.icon, required this.label});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        color: isDark
            ? Colors.white.withValues(alpha: 0.06)
            : Colors.black.withValues(alpha: 0.05),
        border: Border.all(
          color: isDark
              ? Colors.white.withValues(alpha: 0.1)
              : Colors.black.withValues(alpha: 0.1),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: AppTheme.primaryColor),
          const SizedBox(width: 5),
          Text(
            label,
            style: TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: isDark ? const Color(0xFFCCCCCC) : const Color(0xFF444444),
              letterSpacing: 0.2,
            ),
          ),
        ],
      ),
    );
  }
}
