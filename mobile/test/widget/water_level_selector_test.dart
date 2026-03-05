import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hydromesh/widgets/report/water_level_selector.dart';

void main() {
  group('WaterLevelSelector', () {
    testWidgets('should display all water levels', (tester) async {
      String? selectedLevel;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: WaterLevelSelector(
              onSelected: (level) => selectedLevel = level,
            ),
          ),
        ),
      );

      expect(find.text('Ankle'), findsOneWidget);
      expect(find.text('Knee'), findsOneWidget);
      expect(find.text('Waist'), findsOneWidget);
      expect(find.text('Chest'), findsOneWidget);
      expect(find.text('Above Head'), findsOneWidget);
    });

    testWidgets('should call onSelected when level tapped', (tester) async {
      String? selectedLevel;

      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: WaterLevelSelector(
              onSelected: (level) => selectedLevel = level,
            ),
          ),
        ),
      );

      await tester.tap(find.text('Knee'));
      await tester.pump();

      expect(selectedLevel, 'knee');
    });
  });
}