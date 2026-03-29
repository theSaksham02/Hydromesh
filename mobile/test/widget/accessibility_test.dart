import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:hydromesh/providers/theme_provider.dart';
import 'package:hydromesh/screens/accessibility_screen.dart';

void main() {
  group('AccessibilityScreen Widget Tests', () {
    testWidgets('should render all accessibility options', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => ThemeProvider(),
          child: const MaterialApp(
            home: AccessibilityScreen(),
          ),
        ),
      );

      expect(find.text('Accessibility'), findsOneWidget);
      expect(find.text('Dark'), findsOneWidget);
      expect(find.text('Light'), findsOneWidget);
      expect(find.text('High Contrast'), findsOneWidget);
      expect(find.text('Colorblind-Friendly'), findsOneWidget);
    });

    testWidgets('should select a theme mode when tapped', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => ThemeProvider(),
          child: const MaterialApp(
            home: AccessibilityScreen(),
          ),
        ),
      );

      // Tap on Light mode
      await tester.tap(find.text('Light'));
      await tester.pumpAndSettle();

      // Check if continue button is enabled
      expect(find.text('CONTINUE'), findsOneWidget);
    });
  });
}
