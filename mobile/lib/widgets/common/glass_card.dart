import 'dart:ui';
import 'package:flutter/material.dart';

class GlassCard extends StatelessWidget {
  final Widget child;
  final double blur;
  final EdgeInsetsGeometry padding;
  final double borderRadius;
  final Color? color;

  const GlassCard({
    super.key,
    required this.child,
    this.blur = 10.0,
    this.padding = const EdgeInsets.all(16.0),
    this.borderRadius = 20.0,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDark = theme.brightness == Brightness.dark;
    
    // In Light mode, use a slightly dark/tinted translucent color
    // In Dark mode, use a white translucent color
    final defaultColor = isDark 
        ? Colors.white.withOpacity(0.05) 
        : Colors.black.withOpacity(0.03);
        
    final defaultBorderColor = isDark
        ? Colors.white.withOpacity(0.1)
        : Colors.black.withOpacity(0.08);

    return ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: color ?? defaultColor,
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(
              color: defaultBorderColor,
              width: 1.0,
            ),
          ),
          child: child,
        ),
      ),
    );
  }
}
