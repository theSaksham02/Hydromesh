# HydroMesh FloodNet Twin - Frontend

This is the Flutter frontend for the HydroMesh application.

## Getting Started

1. Make sure you have Flutter installed. If not, follow the guide at [https://docs.flutter.dev/get-started/install](https://docs.flutter.dev/get-started/install).

2. Navigate into the frontend directory:
   ```bash
   cd frontend
   ```

3. To generate the necessary platform folders (iOS, Android, Web) while preserving the `lib` folder and `pubspec.yaml`, run:
   ```bash
   flutter create .
   ```

4. Get all the dependencies:
   ```bash
   flutter pub get
   ```

5. Run the application:
   ```bash
   flutter run
   ```

## Dummy Data Mode
By default, the `ApiService` in `lib/services/api_service.dart` is set up with some dummy data and a fake login (`test@example.com` / `test123`). You can uncomment the HTTP backend calls inside `api_service.dart` when your backend is up and running on `http://localhost:3000/api`.