import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_service.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  String? _token;
  bool _isLoading = false;
  String? _error;

  User? get user => _user;
  String? get token => _token;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _token != null;
  String? get error => _error;

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    final result = await AuthService.login(email, password);

    _isLoading = false;
    if (result['success']) {
      _user = result['user'];
      _token = result['token'];
      notifyListeners();
      return true;
    } else {
      _error = result['error'];
      notifyListeners();
      return false;
    }
  }

  Future<bool> register({
    required String name,
    required String email,
    required String password,
    String role = 'citizen',
  }) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    final result = await AuthService.register(
      name: name,
      email: email,
      password: password,
      role: role,
    );

    _isLoading = false;
    if (result['success']) {
      _user = result['user'];
      _token = result['token'];
      notifyListeners();
      return true;
    } else {
      _error = result['error'];
      notifyListeners();
      return false;
    }
  }

  void logout() {
    AuthService.logout();
    _user = null;
    _token = null;
    notifyListeners();
  }
}