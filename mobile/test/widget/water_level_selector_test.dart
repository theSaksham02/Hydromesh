import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:hydromesh/widgets/report/water_level_selector.dart';

void main() {
  group('WaterLevelSelector Widget Tests', () {
    testWidgets('should render 5 level options', (tester) async {
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: WaterLevelSelector(onSelected: (_) {}),
          ),
        ),
      );

      expect(find.text('Ankle'), findsOneWidget);
      expect(find.text('Knee'), findsOneWidget);
      expect(find.text('Waist'), findsOneWidget);
      expect(find.text('Chest'), findsOneWidget);
      expect(find.text('Above Head'), findsOneWidget);
    });

    testWidgets('tapping an option triggers the callback', (tester) async {
      String? selected;
      await tester.pumpWidget(
        MaterialApp(
          home: Scaffold(
            body: WaterLevelSelector(onSelected: (val) => selected = val),
          ),
        ),
      );

      await tester.tap(find.text('Chest'));
      await tester.pump();
      
      expect(selected, 'chest');
    });
  });
}
