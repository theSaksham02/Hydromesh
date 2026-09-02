#!/bin/bash
# HydroMesh — Debug APK (faster build, for testing)
# Usage: bash build_apk_debug.sh

set -euo pipefail

cd mobile

echo "🔨 Building debug APK..."
flutter build apk --debug

APK_PATH=$(find build/app/outputs/flutter-apk -name "app-debug.apk" | head -1)

echo "✅ Debug APK: $APK_PATH"
