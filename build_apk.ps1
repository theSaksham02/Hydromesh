# HydroMesh — Windows PowerShell APK Build Script
# Usage: .\build_apk.ps1

Write-Host "🌊 HydroMesh APK Build" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan

# Check Flutter
try {
    $flutterVersion = flutter --version
} catch {
    Write-Host "❌ Flutter not found. Install Flutter SDK first." -ForegroundColor Red
    exit 1
}

# Navigate to mobile app
Set-Location mobile

Write-Host "📦 Getting dependencies..." -ForegroundColor Green
flutter pub get

Write-Host "🔍 Analyzing code..." -ForegroundColor Green
flutter analyze

Write-Host "🏗️  Building release APK..." -ForegroundColor Green
flutter build apk --release

# Find the APK
$apkPath = Get-ChildItem -Path "build/app/outputs/flutter-apk" -Filter "app-release.apk" -Recurse | Select-Object -First 1 -ExpandProperty FullName

if (-not $apkPath) {
    Write-Host "❌ APK build failed. Check errors above." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host "📱 APK location: $apkPath" -ForegroundColor Yellow
Write-Host ""
Write-Host "To share with team:" -ForegroundColor Cyan
Write-Host "  Copy $apkPath to Google Drive / send via WhatsApp"
