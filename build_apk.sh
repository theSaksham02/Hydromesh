#!/bin/bash
# HydroMesh — Android APK Build Script
# Usage: from repo root → bash build_apk.sh
# Needs: Flutter SDK, Android SDK

set -euo pipefail

echo "🌊 HydroMesh APK Build"
echo "====================="

# Check Flutter
if ! command -v flutter &> /dev/null; then
    echo "❌ Flutter not found. Install Flutter SDK first."
    exit 1
fi

# Navigate to mobile app
cd mobile

echo "📦 Getting dependencies..."
flutter pub get

echo "🔍 Analyzing code..."
flutter analyze || echo "⚠️  Analysis warnings found (continuing)"

echo "🏗️  Building release APK..."
flutter build apk --release

# Find the APK
APK_PATH=$(find build/app/outputs/flutter-apk -name "app-release.apk" | head -1)

if [ -z "$APK_PATH" ]; then
    echo "❌ APK build failed. Check errors above."
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo "📱 APK location: $APK_PATH"
echo ""
echo "To install on device:"
echo "  adb install $APK_PATH"
echo ""
echo "To share with team:"
echo "  Copy $APK_PATH to Google Drive / send via WhatsApp"
