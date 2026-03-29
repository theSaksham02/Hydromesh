import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:hydromesh/providers/emergency_provider.dart';
import 'package:hydromesh/screens/emergency_screen.dart';

void main() {
  group('Emergency SOS Widget Tests', () {
    testWidgets('initial state shows the SOS trigger button', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => EmergencyProvider(),
          child: const MaterialApp(home: EmergencyScreen()),
        ),
      );

      expect(find.textContaining('TAP TO REQUEST'), findsOneWidget);
      expect(find.byIcon(Icons.sos_rounded), findsOneWidget);
    });

    testWidgets('displays the info cards for emergency procedures', (tester) async {
      await tester.pumpWidget(
        ChangeNotifierProvider(
          create: (_) => EmergencyProvider(),
          child: const MaterialApp(home: EmergencyScreen()),
        ),
      );

      expect(find.text('What happens next?'), findsOneWidget);
    });
  });
}
