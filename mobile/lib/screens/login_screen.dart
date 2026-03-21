import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/auth_provider.dart';
import '../widgets/common/glass_card.dart';
import '../widgets/common/neon_button.dart';
import '../config/theme.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});
  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen>
    with SingleTickerProviderStateMixin {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();

  bool _isLogin = true;
  bool _obscurePassword = true;
  String? _inlineError;

  late final AnimationController _shakeCtrl;
  late final Animation<double> _shakeAnim;

  @override
  void initState() {
    super.initState();
    _shakeCtrl = AnimationController(
        duration: const Duration(milliseconds: 480), vsync: this);
    _shakeAnim = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 0.0, end: -12.0), weight: 1),
      TweenSequenceItem(tween: Tween(begin: -12.0, end: 12.0), weight: 2),
      TweenSequenceItem(tween: Tween(begin: 12.0, end: -8.0), weight: 2),
      TweenSequenceItem(tween: Tween(begin: -8.0, end: 8.0), weight: 2),
      TweenSequenceItem(tween: Tween(begin: 8.0, end: 0.0), weight: 1),
    ]).animate(CurvedAnimation(parent: _shakeCtrl, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    _shakeCtrl.dispose();
    super.dispose();
  }

  String _parseError(String? raw) {
    if (raw == null) return 'Authentication failed. Please try again.';
    final l = raw.toLowerCase();
    if (l.contains('network') || l.contains('socket') ||
        l.contains('timeout') || l.contains('connect')) {
      return 'No connection — check your internet and try again.';
    }
    if (l.contains('invalid') || l.contains('credentials') ||
        l.contains('password') || l.contains('401')) {
      return 'Incorrect email or password.';
    }
    if (l.contains('not found') || l.contains('404')) {
      return 'No account found with that email.';
    }
    if (l.contains('exist') || l.contains('taken') ||
        l.contains('duplicate')) {
      return 'An account with this email already exists.';
    }
    return raw;
  }

  Future<void> _submit() async {
    setState(() => _inlineError = null);
    if (!(_formKey.currentState?.validate() ?? false)) {
      HapticFeedback.mediumImpact();
      _shakeCtrl.forward(from: 0);
      return;
    }

    final auth = Provider.of<AuthProvider>(context, listen: false);
    final success = _isLogin
        ? await auth.login(
            _emailController.text.trim(), _passwordController.text)
        : await auth.register(
            name: _nameController.text.trim(),
            email: _emailController.text.trim(),
            password: _passwordController.text,
          );

    if (!mounted) return;
    if (success) {
      Navigator.pushReplacementNamed(context, '/home');
    } else {
      HapticFeedback.heavyImpact();
      setState(() => _inlineError = _parseError(auth.error));
      _shakeCtrl.forward(from: 0);
    }
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isLoading = context.watch<AuthProvider>().isLoading;
    final isDark = theme.brightness == Brightness.dark;

    return Scaffold(
      body: Stack(
        children: [
          Positioned.fill(child: CustomPaint(painter: _AquaticWavePainter(isDark: isDark))),
          Center(
            child: SingleChildScrollView(
              padding:
                  const EdgeInsets.symmetric(horizontal: 24, vertical: 48),
              child: AnimatedBuilder(
                animation: _shakeAnim,
                builder: (ctx, child) =>
                    Transform.translate(offset: Offset(_shakeAnim.value, 0), child: child),
                child: Column(
                  children: [
                    // ── Logo ───────────────────────────────────────
                    Icon(Icons.water_drop_outlined,
                            size: 64, color: theme.colorScheme.primary)
                        .animate(onPlay: (c) => c.repeat(reverse: true))
                        .scaleXY(end: 1.08, duration: 2.seconds, curve: Curves.easeInOut)
                        .shimmer(duration: 3.seconds),
                    const SizedBox(height: 12),
                    Text(
                      _isLogin ? 'Welcome Back' : 'Join HydroMesh',
                      style: theme.textTheme.headlineMedium
                          ?.copyWith(fontWeight: FontWeight.w900, color: theme.colorScheme.onSurface),
                      textAlign: TextAlign.center,
                    ).animate().fadeIn(duration: 400.ms).slideY(begin: 0.15),
                    const SizedBox(height: 4),
                    Text(
                      _isLogin
                          ? 'Sign in to your account'
                          : 'Create your citizen account',
                      style: TextStyle(
                          color: theme.colorScheme.onSurfaceVariant, fontSize: 14, fontWeight: FontWeight.w500),
                    ).animate().fadeIn(delay: 100.ms, duration: 400.ms),
                    const SizedBox(height: 32),

                    // ── Form card ─────────────────────────────────
                    GlassCard(
                      padding: const EdgeInsets.all(28),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            // Inline error banner
                            AnimatedSize(
                              duration: const Duration(milliseconds: 250),
                              child: _inlineError != null
                                  ? Container(
                                      margin: const EdgeInsets.only(bottom: 16),
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 14, vertical: 10),
                                      decoration: BoxDecoration(
                                        color: AppTheme.dangerColor
                                            .withValues(alpha: 0.12),
                                        borderRadius: BorderRadius.circular(10),
                                        border: Border.all(
                                            color: AppTheme.dangerColor
                                                .withValues(alpha: 0.4)),
                                      ),
                                      child: Row(
                                        children: [
                                          const Icon(Icons.error_outline,
                                              color: AppTheme.dangerColor,
                                              size: 18),
                                          const SizedBox(width: 10),
                                          Expanded(
                                            child: Text(
                                              _inlineError!,
                                              style: const TextStyle(
                                                color: AppTheme.dangerColor,
                                                fontSize: 13,
                                                fontWeight: FontWeight.w600,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    )
                                      .animate()
                                      .fadeIn(duration: 250.ms)
                                      .slideY(begin: -0.2)
                                  : const SizedBox.shrink(),
                            ),

                            if (!_isLogin) ...[
                              _HydroTextField(
                                controller: _nameController,
                                label: 'Full Name',
                                icon: Icons.person_outline,
                                textInputAction: TextInputAction.next,
                                validator: (v) {
                                  if (v == null || v.trim().isEmpty)
                                    return 'Name is required';
                                  if (v.trim().length < 2)
                                    return 'Enter your full name';
                                  return null;
                                },
                              ).animate().fadeIn(duration: 300.ms).slideX(begin: -0.08),
                              const SizedBox(height: 16),
                            ],

                            _HydroTextField(
                              controller: _emailController,
                              label: 'Email',
                              icon: Icons.email_outlined,
                              keyboardType: TextInputType.emailAddress,
                              textInputAction: TextInputAction.next,
                              validator: (v) {
                                if (v == null || v.trim().isEmpty)
                                  return 'Email is required';
                                if (!RegExp(r'^[^@]+@[^@]+\.[^@]+')
                                    .hasMatch(v.trim()))
                                  return 'Enter a valid email address';
                                return null;
                              },
                            ).animate().fadeIn(duration: 400.ms).slideX(begin: -0.08),
                            const SizedBox(height: 16),

                            _HydroTextField(
                              controller: _passwordController,
                              label: 'Password',
                              icon: Icons.lock_outline,
                              obscureText: _obscurePassword,
                              textInputAction: TextInputAction.done,
                              onSubmitted: (_) => _submit(),
                              suffixIcon: GestureDetector(
                                onTap: () => setState(
                                    () => _obscurePassword = !_obscurePassword),
                                child: Icon(
                                  _obscurePassword
                                      ? Icons.visibility_off_outlined
                                      : Icons.visibility_outlined,
                                  color: theme.colorScheme.onSurfaceVariant,
                                  size: 20,
                                ),
                              ),
                              validator: (v) {
                                if (v == null || v.isEmpty)
                                  return 'Password is required';
                                if (!_isLogin && v.length < 8)
                                  return 'Password must be at least 8 characters';
                                return null;
                              },
                            ).animate().fadeIn(duration: 500.ms).slideX(begin: -0.08),
                            const SizedBox(height: 28),

                            NeonButton(
                              text: _isLogin ? 'SIGN IN' : 'CREATE ACCOUNT',
                              isLoading: isLoading,
                              onPressed: _submit,
                            ).animate().fadeIn(duration: 600.ms).slideY(begin: 0.15),
                          ],
                        ),
                      ),
                    ).animate().fadeIn(delay: 150.ms, duration: 400.ms).slideY(begin: 0.08),

                    const SizedBox(height: 20),

                    // ── Biometric hint ────────────────────────────
                    if (_isLogin) ...[
                      Semantics(
                        label: 'Sign in with biometrics',
                        button: true,
                        child: GestureDetector(
                          onTap: () {
                            HapticFeedback.heavyImpact();
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Biometric auth coming soon')),
                            );
                          },
                          child: Container(
                            padding: const EdgeInsets.all(16),
                            decoration: BoxDecoration(
                              color: theme.colorScheme.surfaceContainerHigh,
                              shape: BoxShape.circle,
                              border: Border.all(
                                  color:
                                      theme.colorScheme.onSurface.withValues(alpha: 0.1)),
                            ),
                            child: Icon(Icons.fingerprint,
                                color: theme.colorScheme.primary, size: 32),
                          )
                              .animate(onPlay: (c) => c.repeat(reverse: true))
                              .shimmer(
                                  duration: 2.5.seconds,
                                  color: theme.colorScheme.primary
                                      .withValues(alpha: 0.3)),
                        ),
                      ).animate().fadeIn(delay: 650.ms),
                      const SizedBox(height: 20),
                    ],

                    TextButton(
                      onPressed: () => setState(() {
                        _isLogin = !_isLogin;
                        _inlineError = null;
                        _formKey.currentState?.reset();
                      }),
                      style: TextButton.styleFrom(
                          foregroundColor: theme.colorScheme.onSurfaceVariant),
                      child: Text(
                        _isLogin
                            ? "Don't have an account? Sign Up"
                            : 'Already have an account? Sign In',
                        style: const TextStyle(fontWeight: FontWeight.w600),
                      ),
                    ).animate().fadeIn(delay: 700.ms),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

// ── Aquatic wave background ───────────────────────────────────────────────────
class _AquaticWavePainter extends CustomPainter {
  final bool isDark;
  _AquaticWavePainter({required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    // Dynamic gradient base based on theme
    final colors = isDark 
      ? [const Color(0xFF050D1A), const Color(0xFF0A1628), const Color(0xFF0D1F3C)]
      : [const Color(0xFFF1F5F9), const Color(0xFFE2E8F0), const Color(0xFFCBD5E1)];

    final bg = Paint()
      ..shader = LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: colors,
      ).createShader(Rect.fromLTWH(0, 0, size.width, size.height));
    canvas.drawRect(Rect.fromLTWH(0, 0, size.width, size.height), bg);

    // Ambient glow
    final glowColor = isDark ? const Color(0xFF1A6EFF) : const Color(0xFF3B82F6);
    canvas.drawCircle(
      Offset(size.width * 0.15, size.height * 0.2),
      size.width * 0.7,
      Paint()
        ..shader = RadialGradient(
          colors: [
            glowColor.withValues(alpha: isDark ? 0.18 : 0.12),
            Colors.transparent
          ],
        ).createShader(Rect.fromCircle(
          center: Offset(size.width * 0.15, size.height * 0.2),
          radius: size.width * 0.7,
        )),
    );

    final waveBaseColor = isDark ? const Color(0xFF1A6EFF) : const Color(0xFF3B82F6);

    _wave(canvas, size,
        color: waveBaseColor.withValues(alpha: isDark ? 0.06 : 0.04),
        amp: 28, freq: 1.6, phase: 0, y: size.height * 0.72);
    _wave(canvas, size,
        color: waveBaseColor.withValues(alpha: isDark ? 0.09 : 0.06),
        amp: 20, freq: 2.2, phase: math.pi / 3, y: size.height * 0.80);
    _wave(canvas, size,
        color: waveBaseColor.withValues(alpha: isDark ? 0.35 : 0.15),
        amp: 16, freq: 1.0, phase: math.pi / 6, y: size.height * 0.88);
  }

  void _wave(Canvas canvas, Size size,
      {required Color color,
      required double amp,
      required double freq,
      required double phase,
      required double y}) {
    final paint = Paint()..color = color..style = PaintingStyle.fill;
    final path = Path()..moveTo(0, size.height);
    for (double x = 0; x <= size.width; x++) {
      path.lineTo(
          x,
          y +
              amp *
                  math.sin(
                      (x / size.width) * freq * math.pi * 2 + phase));
    }
    path.lineTo(size.width, size.height);
    path.close();
    canvas.drawPath(path, paint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter _) => false;
}

// ── Reusable HydroMesh text field ─────────────────────────────────────────────
class _HydroTextField extends StatelessWidget {
  final TextEditingController controller;
  final String label;
  final IconData icon;
  final bool obscureText;
  final TextInputType keyboardType;
  final TextInputAction textInputAction;
  final String? Function(String?)? validator;
  final Widget? suffixIcon;
  final void Function(String)? onSubmitted;

  const _HydroTextField({
    required this.controller,
    required this.label,
    required this.icon,
    this.obscureText = false,
    this.keyboardType = TextInputType.text,
    this.textInputAction = TextInputAction.next,
    this.validator,
    this.suffixIcon,
    this.onSubmitted,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;

    return TextFormField(
      controller: controller,
      obscureText: obscureText,
      keyboardType: keyboardType,
      textInputAction: textInputAction,
      onFieldSubmitted: onSubmitted,
      validator: validator,
      style: TextStyle(color: theme.colorScheme.onSurface, fontSize: 15, fontWeight: FontWeight.w600),
      decoration: InputDecoration(
        labelText: label,
        prefixIcon: Icon(icon,
            color: theme.colorScheme.primary.withValues(alpha: 0.7), size: 20),
        suffixIcon: suffixIcon,
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: theme.colorScheme.onSurface.withValues(alpha: 0.1)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: theme.colorScheme.primary, width: 1.5),
        ),
        errorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: theme.colorScheme.error.withValues(alpha: 0.7)),
        ),
        focusedErrorBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(14),
          borderSide:
              BorderSide(color: theme.colorScheme.error, width: 1.5),
        ),
        filled: true,
        fillColor: isDark ? Colors.white.withValues(alpha: 0.04) : Colors.black.withValues(alpha: 0.03),
        labelStyle: TextStyle(
            color: theme.colorScheme.onSurfaceVariant.withValues(alpha: 0.8),
            fontWeight: FontWeight.w500),
      ),
    );
  }
}
