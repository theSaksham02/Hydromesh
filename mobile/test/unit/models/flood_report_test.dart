import 'package:flutter_test/flutter_test.dart';
import 'package:hydromesh/models/flood_report.dart';

void main() {
  group('FloodReport', () {
    test('should create from JSON', () {
      final json = {
        'report_id': '123',
        'user_id': '456',
        'latitude': '51.5074',
        'longitude': '-0.1278',
        'water_level': 'knee',
        'description': 'Test report',
        'is_validated': false,
        'created_at': '2024-03-01T12:00:00Z',
      };

      final report = FloodReport.fromJson(json);

      expect(report.reportId, '123');
      expect(report.latitude, 51.5074);
      expect(report.longitude, -0.1278);
      expect(report.waterLevel, 'knee');
      expect(report.isValidated, false);
    });

    test('should convert to JSON', () {
      final report = FloodReport(
        latitude: 51.5074,
        longitude: -0.1278,
        waterLevel: 'waist',
        description: 'Test',
      );

      final json = report.toJson();

      expect(json['latitude'], 51.5074);
      expect(json['longitude'], -0.1278);
      expect(json['waterLevel'], 'waist');
    });

    test('should handle null optional fields', () {
      final json = {
        'latitude': '51.5074',
        'longitude': '-0.1278',
        'water_level': 'ankle',
      };

      final report = FloodReport.fromJson(json);

      expect(report.description, isNull);
      expect(report.photoUrl, isNull);
      expect(report.voiceUrl, isNull);
    });
  });
}