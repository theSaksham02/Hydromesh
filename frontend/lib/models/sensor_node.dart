class SensorNode {
  final String id;
  final String name;
  final double waterLevel;
  final bool isFlooding;
  final double lat;
  final double lng;

  SensorNode({
    required this.id,
    required this.name,
    required this.waterLevel,
    required this.isFlooding,
    required this.lat,
    required this.lng,
  });

  factory SensorNode.fromJson(Map<String, dynamic> json) {
    return SensorNode(
      id: json['id'],
      name: json['name'],
      waterLevel: json['waterLevel'].toDouble(),
      isFlooding: json['isFlooding'] ?? false,
      lat: json['lat'].toDouble(),
      lng: json['lng'].toDouble(),
    );
  }
}
