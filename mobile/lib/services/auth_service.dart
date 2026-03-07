import 'api_service.dart';
import '../models/user.dart';

class AuthService {
  // Login
  static Future<Map<String, dynamic>> login(String email, String password) async {
    final result = await ApiService.post('/auth/login', {
      'email': email,
      'password': password,
    });

    if (result['success']) {
      final data = result['data'];
      if (data is Map && data['token'] != null && data['user'] is Map) {
        ApiService.setToken(data['token']);
        return {
          'success': true,
          'user': User.fromJson(Map<String, dynamic>.from(data['user'])),
          'token': data['token'],
        };
      }
      return {'success': false, 'error': 'Unexpected server response'};
    }
    return result;
  }

  // Register
  static Future<Map<String, dynamic>> register({
    required String name,
    required String email,
    required String password,
    String role = 'citizen',
  }) async {
    final result = await ApiService.post('/auth/register', {
      'name': name,
      'email': email,
      'password': password,
      'role': role,
    });

    if (result['success']) {
      final data = result['data'];
      if (data is Map && data['token'] != null && data['user'] is Map) {
        ApiService.setToken(data['token']);
        return {
          'success': true,
          'user': User.fromJson(Map<String, dynamic>.from(data['user'])),
          'token': data['token'],
        };
      }
      return {'success': false, 'error': 'Unexpected server response'};
    }
    return result;
  }

  // Logout
  static void logout() {
    ApiService.clearToken();
  }
}