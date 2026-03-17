import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum AppThemeMode { dark, light, highContrast, colorblind }

class ThemeProvider extends ChangeNotifier {
  static const String _themeKey = 'selected_theme';
  static const String _launchKey = 'has_selected_accessibility';

  AppThemeMode _mode = AppThemeMode.dark;
  bool _firstLaunch = true;
  bool _isLoaded = false;

  AppThemeMode get mode => _mode;
  bool get isFirstLaunch => _firstLaunch;
  bool get isLoaded => _isLoaded;

  ThemeProvider() {
    _loadPrefs();
  }

  Future<void> _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_themeKey);
    final hasLaunched = prefs.getBool(_launchKey) ?? false;
    _firstLaunch = !hasLaunched;
    if (saved != null) {
      _mode = AppThemeMode.values.firstWhere(
        (e) => e.name == saved,
        orElse: () => AppThemeMode.dark,
      );
    }
    _isLoaded = true;
    notifyListeners();
  }

  Future<void> setTheme(AppThemeMode mode) async {
    _mode = mode;
    _firstLaunch = false;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_themeKey, mode.name);
    await prefs.setBool(_launchKey, true);
    notifyListeners();
  }
}
