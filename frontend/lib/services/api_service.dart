import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../models/sensor_node.dart';

class ApiService extends ChangeNotifier {
  final String baseUrl = 'http://localhost:3000/api'; // Update to your backend URL
  String? _token;
  bool _isAuthenticated = false;

  bool get isAuthenticated => _isAuthenticated;
  String? get token => _token;

  ApiService() {
    _loadToken();
  }

  Future<void> _loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString('auth_token');
    if (_token != null) {
      _isAuthenticated = true;
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    try {
      // Simulate backend delay and test credentials logic if backend is down
      await Future.delayed(const Duration(seconds: 1));
      
      if (email == 'test@example.com' && password == 'test123') {
        _token = 'dummy_token_12345';
        _isAuthenticated = true;
        
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('auth_token', _token!);
        notifyListeners();
        return true;
      }
      
      // Actual implementation for when backend is connected
      /*
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        _token = data['token'];
        _isAuthenticated = true;

        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('auth_token', _token!);
        notifyListeners();
        return true;
      }
      */
      
      return false;
    } catch (e) {
      return false;
    }
  }

  void logout() async {
    _token = null;
    _isAuthenticated = false;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    notifyListeners();
  }

  Future<List<SensorNode>> fetchSensors() async {
    try {
      // Dummy data for Hydromesh prototype
      await Future.delayed(const Duration(seconds: 1));
      return [
        SensorNode(id: '1', name: 'Node Alpha (River)', waterLevel: 2.4, isFlooding: false, lat: 51.5, lng: -0.09),
        SensorNode(id: '2', name: 'Node Beta (Downtown)', waterLevel: 4.8, isFlooding: true, lat: 51.51, lng: -0.1),
        SensorNode(id: '3', name: 'Node Gamma (Suburbs)', waterLevel: 1.2, isFlooding: false, lat: 51.49, lng: -0.08),
      ];

      /* Actual Backend call
      final response = await http.get(
        Uri.parse('$baseUrl/sensors'),
        headers: {'Authorization': 'Bearer $_token'},
      );
      
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        return data.map((json) => SensorNode.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load sensors');
      }
      */
    } catch (e) {
      throw Exception('Failed to connect to backend: $e');
    }
  }
}
