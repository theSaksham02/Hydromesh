import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';

class ApiService {
  static String? _token;

  static void setToken(String token) {
    _token = token;
  }

  static void clearToken() {
    _token = null;
  }

  static Map<String, String> get _headers {
    final headers = {'Content-Type': 'application/json'};
    if (_token != null) {
      headers['Authorization'] = 'Bearer $_token';
    }
    return headers;
  }

  // GET request
  static Future<Map<String, dynamic>> get(String endpoint) async {
    try {
      final response = await http.get(
        Uri.parse('${AppConfig.apiBaseUrl}$endpoint'),
        headers: _headers,
      );
      return _handleResponse(response);
    } catch (e) {
      return {'success': false, 'error': 'Network error: ${e.runtimeType}'};
    }
  }

  // POST request
  static Future<Map<String, dynamic>> post(
    String endpoint, 
    Map<String, dynamic> body
  ) async {
    try {
      final response = await http.post(
        Uri.parse('${AppConfig.apiBaseUrl}$endpoint'),
        headers: _headers,
        body: jsonEncode(body),
      );
      return _handleResponse(response);
    } catch (e) {
      return {'success': false, 'error': 'Network error: ${e.runtimeType}'};
    }
  }

  // Handle response
  static Map<String, dynamic> _handleResponse(http.Response response) {
    try {
      final data = jsonDecode(response.body);
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return {'success': true, 'data': data};
      } else {
        return {
          'success': false,
          'error': (data is Map ? data['message'] : null) ?? 'Server error ${response.statusCode}',
        };
      }
    } catch (_) {
      return {'success': false, 'error': 'Invalid server response (${response.statusCode})'};
    }
  }
}