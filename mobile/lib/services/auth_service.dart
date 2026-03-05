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
      ApiService.setToken(result['data']['token']);
      return {
        'success': true,
        'user': User.fromJson(result['data']['user']),
        'token': result['data']['token'],
      };
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
      ApiService.setToken(result['data']['token']);
      return {
        'success': true,
        'user': User.fromJson(result['data']['user']),
        'token': result['data']['token'],
      };
    }
    return result;
  }

  // Logout
  static void logout() {
    ApiService.clearToken();
  }
}