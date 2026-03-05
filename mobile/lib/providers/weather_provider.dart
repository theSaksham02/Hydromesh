import 'package:flutter/material.dart';
import '../services/api_service.dart';

class WeatherProvider with ChangeNotifier {
  Map<String, dynamic>? _currentWeather;
  bool _isLoading = false;
  String? _error;

  Map<String, dynamic>? get currentWeather => _currentWeather;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> fetchWeather(double lat, double lng) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await ApiService.get('/weather/current?latitude=$lat&longitude=$lng');
      
      if (result['success']) {
        _currentWeather = result['data'];
      } else {
        _error = result['error'] ?? 'Failed to load weather';
      }
    } catch (e) {
      _error = 'Connection error. Check your network.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
