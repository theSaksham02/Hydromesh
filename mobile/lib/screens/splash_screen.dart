import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/auth_provider.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    super.initState();
    // Wait for session restore then navigate after minimum splash duration
    Future.wait([
      Future.delayed(const Duration(seconds: 3)),
      _waitForRestore(),
    ]).then((_) {
      if (!mounted) return;
      final auth = context.read<AuthProvider>();
      Navigator.pushReplacementNamed(
        context,
        auth.isAuthenticated ? '/home' : '/login',
      );
    });
  }

  Future<void> _waitForRestore() async {
    final auth = context.read<AuthProvider>();
    // If already done, return immediately
    if (!auth.isRestoring) return;
    // Otherwise wait for the notifyListeners() from _restoreSession()
    await Future.doWhile(() async {
      await Future.delayed(const Duration(milliseconds: 50));
      return context.read<AuthProvider>().isRestoring;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.background,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Animated Logo
            Container(
              padding: const EdgeInsets.all(32),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppTheme.primaryColor.withOpacity(0.1),
                boxShadow: [
                  BoxShadow(
                    color: AppTheme.primaryColor.withOpacity(0.3),
                    blurRadius: 60,
                    spreadRadius: 20,
                  )
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
            .shimmer(duration: 1.5.seconds, color: Colors.white.withOpacity(0.4)),
            
            const SizedBox(height: 32),
            
            // App Name
            const Text(
              'HydroMesh',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.w900,
                letterSpacing: -1.5,
                color: Colors.white,
              ),
            )
            .animate()
            .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 400.ms, curve: Curves.easeOut)
            .fadeIn(duration: 600.ms, delay: 400.ms),

            const SizedBox(height: 12),

            // Tagline
            const Text(
              'A Community-Driven Flood Prediction System',
              style: TextStyle(
                fontSize: 14,
                fontWeight: FontWeight.w500,
                color: AppTheme.textSecondary,
                letterSpacing: 0.5,
              ),
              textAlign: TextAlign.center,
            )
            .animate()
            .slideY(begin: 0.5, end: 0, duration: 600.ms, delay: 600.ms, curve: Curves.easeOut)
            .fadeIn(duration: 600.ms, delay: 600.ms),
          ],
        ),
      ),
    );
  }
}
