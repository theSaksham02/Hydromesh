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
      reportId: json['report_id'],
      userId: json['user_id'],
      latitude: double.parse(json['latitude'].toString()),
      longitude: double.parse(json['longitude'].toString()),
      waterLevel: json['water_level'],
      description: json['description'],
      photoUrl: json['photo_url'],
      voiceUrl: json['voice_url'],
      isValidated: json['is_validated'] ?? false,
      createdAt: json['created_at'] != null 
          ? DateTime.parse(json['created_at']) 
          : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'latitude': latitude,
      'longitude': longitude,
      'waterLevel': waterLevel,
      'description': description,
      'photoUrl': photoUrl,
      'voiceUrl': voiceUrl,
    };
  }
}