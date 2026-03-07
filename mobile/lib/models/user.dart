class User {
  final String userId;
  final String name;
  final String email;
  final String role;
  final String? phone;
  final DateTime createdAt;

  User({
    required this.userId,
    required this.name,
    required this.email,
    required this.role,
    this.phone,
    required this.createdAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      userId: json['user_id']?.toString() ?? '',
      name: json['name']?.toString() ?? '',
      email: json['email']?.toString() ?? '',
      role: json['role']?.toString() ?? 'citizen',
      phone: json['phone']?.toString(),
      createdAt: DateTime.tryParse(json['created_at']?.toString() ?? '') ?? DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'user_id': userId,
      'name': name,
      'email': email,
      'role': role,
      'phone': phone,
      'created_at': createdAt.toIso8601String(),
    };
  }
}