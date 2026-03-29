import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:hydromesh/providers/theme_provider.dart';
import 'package:hydromesh/screens/accessibility_screen.dart';

void main() {
  group('Accessibility Widget Tests', () {
    testWidgets('should display all theme mode options', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => ThemeProvider(),
          child: const MaterialApp(home: AccessibilityScreen()),
        ),
      );

      expect(find.text('Dark'), findsOneWidget);
      expect(find.text('Light'), findsOneWidget);
      expect(find.text('High Contrast'), findsOneWidget);
    });

    testWidgets('selection should enable the continue button', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => ThemeProvider(),
          child: const MaterialApp(home: AccessibilityScreen()),
        ),
      );

      await tester.tap(find.text('High Contrast'));
      await tester.pumpAndSettle();
      
      expect(find.text('CONTINUE'), findsOneWidget);
    });
  });
}
