import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:provider/provider.dart';
import 'package:hydromesh_frontend/screens/map_screen.dart';
import 'package:hydromesh_frontend/services/api_service.dart';

void main() {
  Widget createMapScreen() {
    return MaterialApp(
      home: ChangeNotifierProvider(
        create: (_) => ApiService(),
        child: const MapScreen(),
      ),
    );
  }

  group('F-07 Map Module Tests', () {
    testWidgets('UT-01: Load map tiles displays correctly', (WidgetTester tester) async {
      await tester.pumpWidget(createMapScreen());
      // Wait for future builder to complete
      await tester.pumpAndSettle();

      // Check if FlutterMap exists
      expect(find.byType(FlutterMap), findsOneWidget);
      // Check if TileLayer exists
      expect(find.byType(TileLayer), findsOneWidget);
    });

    testWidgets('UT-02: Display flood zones renders correct colors', (WidgetTester tester) async {
      await tester.pumpWidget(createMapScreen());
      await tester.pumpAndSettle();

      // Find the PolygonLayer
      expect(find.byType(PolygonLayer), findsOneWidget);
      
      // We can inspect the PolygonLayer to check if polygons exist
      final polygonLayer = tester.widget<PolygonLayer>(find.byType(PolygonLayer));
      expect(polygonLayer.polygons.length, greaterThanOrEqualTo(2));
      
      // Check if colors are correctly assigned (Red and Orange)
      expect(polygonLayer.polygons[0].borderColor, Colors.red);
      expect(polygonLayer.polygons[1].borderColor, Colors.orange);
    });

    testWidgets('UT-03: Zoom functionality properties exist', (WidgetTester tester) async {
      await tester.pumpWidget(createMapScreen());
      await tester.pumpAndSettle();

      final flutterMap = tester.widget<FlutterMap>(find.byType(FlutterMap));
      // Ensure the map has a defined initial zoom level to allow zooming
      expect(flutterMap.options.initialZoom, 13.0);
    });
  });
}
