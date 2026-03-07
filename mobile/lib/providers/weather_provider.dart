import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/api_service.dart';

class WeatherProvider with ChangeNotifier {
  Map<String, dynamic>? _currentWeather;
  bool _isLoading = false;
  String? _error;
  bool _fromCache = false;

  static const _cacheKey = 'cached_weather';

  Map<String, dynamic>? get currentWeather => _currentWeather;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get fromCache => _fromCache;

  Future<void> _loadCache() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final raw = prefs.getString(_cacheKey);
      if (raw != null && _currentWeather == null) {
        _currentWeather = Map<String, dynamic>.from(jsonDecode(raw) as Map);
        _fromCache = true;
        notifyListeners();
      }
    } catch (_) {}
  }

  Future<void> _saveCache(Map<String, dynamic> data) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(_cacheKey, jsonEncode(data));
    } catch (_) {}
  }

  Future<void> fetchWeather(double lat, double lng) async {
    // Load cached data first for instant display
    await _loadCache();

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await ApiService.get('/weather/current?latitude=$lat&longitude=$lng');
      
      if (result['success'] && result['data'] != null && result['data'] is Map) {
        _currentWeather = Map<String, dynamic>.from(result['data'] as Map);
        _fromCache = false;
        await _saveCache(_currentWeather!);
      } else {
        _error = result['error'] as String? ?? 'Failed to load weather';
        // Keep cached data if available
      }
    } catch (e) {
      _error = 'Connection error. Check your network.';
      // Keep cached data if available
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
