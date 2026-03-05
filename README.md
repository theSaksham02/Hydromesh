# HydroMesh FloodNet Twin

A community-driven flood prediction and emergency response mobile application.

## Features
- F-07: Real-Time Flood Map
- F-11: Predictive Safe Routes
- F-15: Receive Help Requests
- F-17: Submit Flood Reports (Icon/Voice)
- F-25: Weather API Integration

## Tech Stack
- **Frontend:** Flutter 3.16+
- **Backend:** Node.js 20+ with Express
- **Database:** PostgreSQL 16 with PostGIS
- **Real-time:** Socket.io
- **Maps:** OpenStreetMap + Leaflet

## Prerequisites
- Node.js v20 or higher
- Flutter SDK 3.16 or higher
- PostgreSQL 16 with PostGIS extension
- Android Studio / Xcode (for mobile emulators)

## Installation

### 1. Clone Repository
```bash
git clone https://gitlab.com/your-group/hydromesh.git
cd hydromesh
```

### 2. Database Setup
```bash
# Create database
psql -U postgres -c "CREATE DATABASE hydromesh;"
psql -U postgres -d hydromesh -c "CREATE EXTENSION postgis;"

# Run schema
psql -U postgres -d hydromesh -f database/schema.sql

# (Optional) Seed sample data
psql -U postgres -d hydromesh -f database/seed.sql
```

### 3. Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm install
npm run dev
```

### 4. Mobile App Setup
```bash
cd mobile
flutter pub get
flutter run
```

## Running Tests

### Backend Tests
```bash
cd backend
npm test
```

### Mobile Tests
```bash
cd mobile
flutter test
```

## Test Credentials
- **Citizen:** citizen@test.com / password123
- **Responder:** responder@test.com / password123

## Team Members
- Saksham Mishra - Map Visualisation
- Shaazia - Offline/Caching
- Yaman - Safe Routes
- Dhwanit - Alert System
- Fartun - Report Submission
- Moustafa - Dashboard
- Adham - Backend API