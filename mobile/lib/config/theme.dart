import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/theme_provider.dart';

class AppTheme {
  // Rive-inspired Deep Dark Colors
  static const Color background = Color(0xFF0A0A0A);
  static const Color surface = Color(0xFF111111);
  static const Color surfaceLight = Color(0xFF1C1C1C);
  
  // Neon Accents
  static const Color primaryColor = Color(0xFF4F8EF7); // Electric Blue
  static const Color accentColor = Color(0xFF7C3AED); // Violet
  static const Color dangerColor = Color(0xFFFF3366); // Neon Red
  static const Color warningColor = Color(0xFFFFD60A); // Neon Yellow
  static const Color safeColor = Color(0xFF00E676); // Neon Green

  static ThemeData forMode(AppThemeMode mode) {
    switch (mode) {
      case AppThemeMode.light:       return lightTheme;
      case AppThemeMode.highContrast: return highContrastTheme;
      case AppThemeMode.colorblind:  return colorblindTheme;
      case AppThemeMode.dark:        return darkTheme;
    }
  }

  static ThemeData get darkTheme {
    const txtPrimary = Color(0xFFFFFFFF);
    const txtSecondary = Color(0xFFA0A0A0);

    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: primaryColor,
      colorScheme: const ColorScheme.dark(
        primary: primaryColor,
        secondary: accentColor,
        surface: surface,
        surfaceContainerHigh: surfaceLight,
        error: dangerColor,
        onSurface: txtPrimary,
        onSurfaceVariant: txtSecondary,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        headlineLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w800, letterSpacing: -1.0),
        headlineMedium: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w700, letterSpacing: -0.5),
        headlineSmall: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w600),
        bodyLarge: GoogleFonts.inter(color: txtPrimary),
        bodyMedium: GoogleFonts.inter(color: txtSecondary),
        labelLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w600, letterSpacing: 0.5),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: txtPrimary),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryColor,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfaceLight,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: primaryColor, width: 1.5)),
        hintStyle: const TextStyle(color: txtSecondary),
        prefixIconColor: txtSecondary,
      ),
    );
  }

  static ThemeData get lightTheme {
    const bg = Color(0xFFF8FAFC);
    const surf = Color(0xFFFFFFFF);
    const surfL = Color(0xFFF1F5F9);
    const primary = Color(0xFF2563EB); // Deep Blue
    const accent = Color(0xFF7C3AED);
    const txtPrimary = Color(0xFF0F172A); // Slate 900
    const txtSecondary = Color(0xFF64748B); // Slate 500

    return ThemeData(
      brightness: Brightness.light,
      scaffoldBackgroundColor: bg,
      primaryColor: primary,
      colorScheme: const ColorScheme.light(
        primary: primary,
        secondary: accent,
        surface: surf,
        surfaceContainerHigh: surfL,
        error: Color(0xFFDC2626),
        onPrimary: Colors.white,
        onSurface: txtPrimary,
        onSurfaceVariant: txtSecondary,
      ),
      textTheme: GoogleFonts.interTextTheme(ThemeData.light().textTheme).copyWith(
        headlineLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w800, letterSpacing: -1.0),
        headlineMedium: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w700, letterSpacing: -0.5),
        headlineSmall: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w600),
        bodyLarge: GoogleFonts.inter(color: txtPrimary),
        bodyMedium: GoogleFonts.inter(color: txtSecondary),
        labelLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w600, letterSpacing: 0.5),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        centerTitle: false,
        iconTheme: IconThemeData(color: txtPrimary),
        titleTextStyle: TextStyle(color: txtPrimary, fontSize: 20, fontWeight: FontWeight.w800),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
          textStyle: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surfL,
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
        focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: const BorderSide(color: primary, width: 1.5)),
        hintStyle: const TextStyle(color: txtSecondary),
        prefixIconColor: txtSecondary,
      ),
      cardTheme: CardThemeData(color: surf, elevation: 0, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16), side: const BorderSide(color: Color(0xFFE2E8F0)))),
      iconTheme: const IconThemeData(color: txtPrimary),
    );
  }

  static ThemeData get highContrastTheme {
    const bg = Color(0xFF000000);
    const surf = Color(0xFF111111);
    const surfL = Color(0xFF222222);
    const primary = Color(0xFFFFD600); // High-vis yellow
    const txtPrimary = Color(0xFFFFFFFF);
    const txtSecondary = Color(0xFFFFFFFF); // Keep secondary white for contrast

    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bg,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: Color(0xFF00E5FF),
        surface: surf,
        surfaceContainerHigh: surfL,
        error: Color(0xFFFF1744),
        onPrimary: Colors.black,
        onSurface: txtPrimary,
        onSurfaceVariant: txtSecondary,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        headlineLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w900, letterSpacing: -1.0),
        headlineMedium: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w800),
        headlineSmall: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w700),
        bodyLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w600),
        bodyMedium: GoogleFonts.inter(color: txtSecondary, fontWeight: FontWeight.w500),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(color: primary, size: 28),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.black,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8), side: const BorderSide(color: primary, width: 3)),
          textStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
        ),
      ),
      iconTheme: const IconThemeData(color: primary, size: 28),
    );
  }

  static ThemeData get colorblindTheme {
    const bg = Color(0xFF0C0E1A);
    const surf = Color(0xFF141828);
    const surfL = Color(0xFF1E2236);
    const primary = Color(0xFF3B82F6);
    const accent = Color(0xFFF59E0B);
    const safe = Color(0xFF60A5FA);
    const danger = Color(0xFFF59E0B);
    const txtPrimary = Color(0xFFE8EAED);
    const txtSecondary = Color(0xFF9AA5B4);

    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: bg,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: accent,
        surface: surf,
        surfaceContainerHigh: surfL,
        error: danger,
        onPrimary: Colors.white,
        onSurface: txtPrimary,
        onSurfaceVariant: txtSecondary,
      ),
      textTheme: GoogleFonts.interTextTheme().copyWith(
        headlineLarge: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w800),
        headlineMedium: GoogleFonts.inter(color: txtPrimary, fontWeight: FontWeight.w700),
        bodyLarge: GoogleFonts.inter(color: txtPrimary),
        bodyMedium: GoogleFonts.inter(color: txtSecondary),
      ),
      appBarTheme: const AppBarTheme(backgroundColor: Colors.transparent, elevation: 0),
      extensions: const [_ColorblindColors(safe: safe, danger: danger)],
    );
  }
}

@immutable
class _ColorblindColors extends ThemeExtension<_ColorblindColors> {
  const _ColorblindColors({required this.safe, required this.danger});
  final Color safe;
  final Color danger;

  @override
  _ColorblindColors copyWith({Color? safe, Color? danger}) => _ColorblindColors(safe: safe ?? this.safe, danger: danger ?? this.danger);

  @override
  _ColorblindColors lerp(_ColorblindColors? other, double t) {
    if (other == null) return this;
    return _ColorblindColors(
      safe: Color.lerp(safe, other.safe, t)!,
      danger: Color.lerp(danger, other.danger, t)!,
    );
  }
}
