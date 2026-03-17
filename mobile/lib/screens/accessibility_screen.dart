import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:provider/provider.dart';
import '../config/theme.dart';
import '../providers/theme_provider.dart';

class AccessibilityScreen extends StatefulWidget {
  const AccessibilityScreen({super.key});

  @override
  State<AccessibilityScreen> createState() => _AccessibilityScreenState();
}

class _AccessibilityScreenState extends State<AccessibilityScreen> {
  AppThemeMode _selected = AppThemeMode.dark;
  bool _saving = false;

  static const _options = [
    _ThemeOption(
      mode: AppThemeMode.dark,
      label: 'Dark',
      description: 'Neon-accented deep dark.\nEasy on eyes in low light.',
      icon: Icons.dark_mode_rounded,
      bg: Color(0xFF0A0A0A),
      surface: Color(0xFF111111),
      accent: Color(0xFF4F8EF7),
      textCol: Colors.white,
    ),
    _ThemeOption(
      mode: AppThemeMode.light,
      label: 'Light',
      description: 'Clean white interface.\nIdeal for bright environments.',
      icon: Icons.light_mode_rounded,
      bg: Color(0xFFF5F7FA),
      surface: Color(0xFFFFFFFF),
      accent: Color(0xFF1A6EFF),
      textCol: Color(0xFF0D0D0D),
    ),
    _ThemeOption(
      mode: AppThemeMode.highContrast,
      label: 'High Contrast',
      description: 'Bold black & yellow.\nMaximum readability.',
      icon: Icons.contrast_rounded,
      bg: Color(0xFF000000),
      surface: Color(0xFF1A1A1A),
      accent: Color(0xFFFFD600),
      textCol: Colors.white,
    ),
    _ThemeOption(
      mode: AppThemeMode.colorblind,
      label: 'Colorblind',
      description: 'Blue & amber palette.\nDeuteranopia-safe, no red/green.',
      icon: Icons.remove_red_eye_outlined,
      bg: Color(0xFF0C0E1A),
      surface: Color(0xFF141828),
      accent: Color(0xFF3B82F6),
      textCol: Color(0xFFE8EAED),
    ),
  ];

  Future<void> _confirm() async {
    setState(() => _saving = true);
    await context.read<ThemeProvider>().setTheme(_selected);
    if (!mounted) return;
    Navigator.pushReplacementNamed(context, '/login');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Header
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 32, 24, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryColor.withValues(alpha: 0.12),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.accessibility_new_rounded,
                            color: AppTheme.primaryColor, size: 24),
                      ),
                      const SizedBox(width: 14),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Accessibility',
                            style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                          Text(
                            'Choose your display preference',
                            style: Theme.of(context).textTheme.bodyMedium,
                          ),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'This can be changed anytime from your profile settings.',
                    style: Theme.of(context)
                        .textTheme
                        .bodyMedium
                        ?.copyWith(fontSize: 12),
                  ),
                ],
              ),
            ).animate().fadeIn(duration: 500.ms).slideY(begin: -0.2, end: 0, duration: 500.ms),

            const SizedBox(height: 24),

            // Theme cards grid
            Expanded(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                child: GridView.builder(
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 0.85,
                  ),
                  itemCount: _options.length,
                  itemBuilder: (ctx, i) {
                    final opt = _options[i];
                    final isSelected = _selected == opt.mode;
                    return _ThemeCard(
                      option: opt,
                      isSelected: isSelected,
                      onTap: () => setState(() => _selected = opt.mode),
                    )
                        .animate(delay: Duration(milliseconds: 100 + i * 80))
                        .fadeIn(duration: 400.ms)
                        .slideY(begin: 0.3, end: 0, duration: 400.ms, curve: Curves.easeOut);
                  },
                ),
              ),
            ),

            // Continue button
            Padding(
              padding: const EdgeInsets.fromLTRB(24, 16, 24, 32),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _saving ? null : _confirm,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primaryColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 18),
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16)),
                    textStyle: const TextStyle(
                        fontWeight: FontWeight.w700, fontSize: 16),
                  ),
                  child: _saving
                      ? const SizedBox(
                          height: 22,
                          width: 22,
                          child: CircularProgressIndicator(
                              color: Colors.white, strokeWidth: 2.5),
                        )
                      : const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text('Continue'),
                            SizedBox(width: 8),
                            Icon(Icons.arrow_forward_rounded, size: 18),
                          ],
                        ),
                ),
              ),
            ).animate().fadeIn(duration: 500.ms, delay: 500.ms),
          ],
        ),
      ),
    );
  }
}

class _ThemeOption {
  final AppThemeMode mode;
  final String label;
  final String description;
  final IconData icon;
  final Color bg;
  final Color surface;
  final Color accent;
  final Color textCol;

  const _ThemeOption({
    required this.mode,
    required this.label,
    required this.description,
    required this.icon,
    required this.bg,
    required this.surface,
    required this.accent,
    required this.textCol,
  });
}

class _ThemeCard extends StatelessWidget {
  final _ThemeOption option;
  final bool isSelected;
  final VoidCallback onTap;

  const _ThemeCard({
    required this.option,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeOut,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? option.accent : Colors.white.withValues(alpha: 0.08),
            width: isSelected ? 2.5 : 1.5,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: option.accent.withValues(alpha: 0.3),
                    blurRadius: 20,
                    spreadRadius: 2,
                  )
                ]
              : [],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(18),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // Preview swatch
              Expanded(
                flex: 5,
                child: Container(
                  color: option.bg,
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Mock top bar
                      Container(
                        height: 8,
                        decoration: BoxDecoration(
                          color: option.surface,
                          borderRadius: BorderRadius.circular(4),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Container(
                            width: 22,
                            height: 22,
                            decoration: BoxDecoration(
                              color: option.accent,
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Container(
                                  height: 6,
                                  decoration: BoxDecoration(
                                    color: option.textCol.withValues(alpha: 0.7),
                                    borderRadius: BorderRadius.circular(3),
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Container(
                                  height: 4,
                                  width: 40,
                                  decoration: BoxDecoration(
                                    color: option.textCol.withValues(alpha: 0.3),
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const Spacer(),
                      // Mock button
                      Container(
                        height: 20,
                        decoration: BoxDecoration(
                          color: option.accent,
                          borderRadius: BorderRadius.circular(6),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              // Info section
              Container(
                padding: const EdgeInsets.all(10),
                color: Theme.of(context).brightness == Brightness.dark
                    ? const Color(0xFF161616)
                    : const Color(0xFFF0F0F0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Icon(option.icon, size: 14, color: option.accent),
                        const SizedBox(width: 5),
                        Text(
                          option.label,
                          style: TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w700,
                            color: Theme.of(context).colorScheme.onSurface,
                          ),
                        ),
                        const Spacer(),
                        if (isSelected)
                          Icon(Icons.check_circle_rounded,
                              size: 16, color: option.accent),
                      ],
                    ),
                    const SizedBox(height: 4),
                    Text(
                      option.description,
                      style: TextStyle(
                        fontSize: 10,
                        color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
                        height: 1.4,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
