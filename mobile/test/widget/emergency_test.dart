import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:hydromesh/providers/emergency_provider.dart';
import 'package:hydromesh/screens/emergency_screen.dart';

void main() {
  group('EmergencyScreen Widget Tests', () {
    testWidgets('should render the SOS button initial state', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => EmergencyProvider(),
          child: const MaterialApp(
            home: EmergencyScreen(),
          ),
        ),
      );

      expect(find.text('TAP TO REQUEST\nHELP'), findsOneWidget);
      expect(find.byIcon(Icons.sos_rounded), findsOneWidget);
    });

    testWidgets('should show what happens next section', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => EmergencyProvider(),
          child: const MaterialApp(
            home: EmergencyScreen(),
          ),
        ),
      );

      expect(find.text('What happens next?'), findsOneWidget);
      expect(find.text('Your GPS location is shared instantly'), findsOneWidget);
    });
  });
}
