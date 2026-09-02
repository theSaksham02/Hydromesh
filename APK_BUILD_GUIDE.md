## 📦 Files Created

1. **`build_apk.sh`** — Main build script (macOS/Linux)
2. **`build_apk_debug.sh`** — Debug APK (faster, for testing)
3. **`build_apk.ps1`** — Windows PowerShell version

## 🚀 How to Use

**From your repo root:**

```bash
# Make executable (first time)
chmod +x build_apk.sh build_apk_debug.sh

# Build release APK
bash build_apk.sh

# Or debug APK (faster)
bash build_apk_debug.sh
```

**Windows:**
```powershell
.\build_apk.ps1
```

## 📱 APK Location
```
mobile/build/app/outputs/flutter-apk/app-release.apk
```

## ⚡ Next Steps

1. **Run the script** — it will build the APK
2. **Share the APK** — Google Drive / WhatsApp to your team
3. **Install on phone** — enable "Install unknown apps" in Android settings

The app will automatically connect to your Render backend (configured in `mobile/lib/config/app_config.dart`).
