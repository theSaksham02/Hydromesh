class FloodReport {
  final String? reportId;
  final String? userId;
  final double latitude;
  final double longitude;
  final String waterLevel;
  final String? description;
  final String? photoUrl;
  final String? voiceUrl;
  final bool isValidated;
  final DateTime? createdAt;

  FloodReport({
    this.reportId,
    this.userId,
    required this.latitude,
    required this.longitude,
    required this.waterLevel,
    this.description,
    this.photoUrl,
    this.voiceUrl,
    this.isValidated = false,
    this.createdAt,
  });

  factory FloodReport.fromJson(Map<String, dynamic> json) {
    return FloodReport(
      reportId: json['report_id']?.toString(),
      userId: json['user_id']?.toString(),
      latitude: double.tryParse(json['latitude']?.toString() ?? '') ?? 0.0,
      longitude: double.tryParse(json['longitude']?.toString() ?? '') ?? 0.0,
      waterLevel: json['water_level']?.toString() ?? 'ankle',
      description: json['description']?.toString(),
      photoUrl: json['photo_url']?.toString(),
      voiceUrl: json['voice_url']?.toString(),
      isValidated: json['is_validated'] == true,
      createdAt: json['created_at'] != null
          ? DateTime.tryParse(json['created_at'].toString())
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'waterLevel': waterLevel,
      'description': description,
    };
  }
}