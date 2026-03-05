import 'package:flutter_test/flutter_test.dart';
import 'package:hydromesh/models/user.dart';

void main() {
  group('User', () {
    test('should create from JSON', () {
      final json = {
        'user_id': '123',
        'name': 'Test User',
        'email': 'test@test.com',
        'role': 'citizen',
        'phone': '1234567890',
        'created_at': '2024-03-01T12:00:00Z',
      };

      final user = User.fromJson(json);

      expect(user.userId, '123');
      expect(user.name, 'Test User');
      expect(user.email, 'test@test.com');
      expect(user.role, 'citizen');
    });

    test('should convert to JSON', () {
      final user = User(
        userId: '123',
        name: 'Test User',
        email: 'test@test.com',
        role: 'responder',
        createdAt: DateTime.parse('2024-03-01T12:00:00Z'),
      );

      final json = user.toJson();

      expect(json['user_id'], '123');
      expect(json['role'], 'responder');
    });
  });
}