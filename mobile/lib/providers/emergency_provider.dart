import 'package:flutter/material.dart';
import '../services/api_service.dart';

class EmergencyProvider with ChangeNotifier {
  bool _isLoading = false;
  bool _requestSent = false;
  String? _error;
  List<Map<String, dynamic>> _pendingRequests = [];

  bool get isLoading => _isLoading;
  bool get requestSent => _requestSent;
  String? get error => _error;
  List<Map<String, dynamic>> get pendingRequests => _pendingRequests;

  Future<bool> acceptEmergency(String id) async {
    try {
      final result = await ApiService.post('/emergency/$id/accept', {});
      if (result['success'] == true) {
        await fetchPendingRequests();
        return true;
      }
    } catch (_) {}
    return false;
  }

  Future<void> fetchPendingRequests() async {
    try {
      final result = await ApiService.get('/emergency/pending');
      if (result['success'] == true && result['data'] != null && result['data'] is List) {
        _pendingRequests = (result['data'] as List)
            .whereType<Map>()
            .map((e) => Map<String, dynamic>.from(e))
            .toList();
        notifyListeners();
      }
    } catch (_) {}
  }

  Future<bool> sendEmergencyRequest({
    required double latitude,
    required double longitude,
    String? description,
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final result = await ApiService.post('/emergency', {
        'latitude': latitude,
        'longitude': longitude,
        'description': description ?? 'Emergency assistance needed',
      });

      _isLoading = false;
      if (result['success']) {
        _requestSent = true;
        await fetchPendingRequests();
        notifyListeners();
        return true;
      } else {
        _error = result['error'] ?? 'Failed to send emergency request';
        notifyListeners();
        return false;
      }
    } catch (e) {
      _isLoading = false;
      _error = 'Connection error. Please try again.';
      notifyListeners();
      return false;
    }
  }

  void resetRequest() {
    _requestSent = false;
    _error = null;
    notifyListeners();
  }
}
