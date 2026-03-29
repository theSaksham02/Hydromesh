# HydroMesh: FloodNet Twin 🌊
### Community-Driven Digital Twin for Urban Flood Resilience
**Group Name:** Output Outlaws | **Sustainable Development Goal:** 11 (Sustainable Cities and Communities)

---

## 📌 Project Vision
HydroMesh is a smartphone-powered digital twin designed to enhance urban flood resilience. In climate-vulnerable cities, traditional IoT sensor infrastructure is often prohibitively expensive ($15k–$50k per km). HydroMesh leverages the billions of smartphones already in circulation to create a self-healing, peer-to-peer mesh network that delivers street-level flood predictions and emergency coordination even when cellular infrastructure fails.

### The Problem
*   **Blind Spots:** Municipalities lack street-level drainage visibility during critical 2–6 hour windows.
*   **Infrastructure Failure:** 25-40% of cell towers often fail during major storms (e.g., Katrina, Sandy).
*   **Cost Barrier:** 83% of Global South municipalities cannot afford traditional industrial IoT sensors.

### Our Solution
A hybrid flood-monitoring platform combining a physics-based digital city model with offline mobile networking. It provides real-time street-level maps, predicts flooding 2–4 hours ahead using edge-AI, and maintains communication via Bluetooth/WiFi Mesh during total infrastructure collapse.

---

## 🚀 Core Features (Prototype Scope)

### F-07: Real-Time Flood Map (Dynamic Risk Zones)
*   **Technical Implementation:** Utilizes PostGIS spatial queries (`ST_DWithin`, `ST_MakePoint`) to cluster crowd-sourced reports.
*   **Visuals:** Heatmaps and polygon-based danger zones generated via `flutter_map` and Leaflet.
*   **Real-time:** Integrated with WebSockets (Socket.io) for instant marker updates without polling.

### F-11: Predictive Safe Routes (Evacuation)
*   **Technical Implementation:** Integrates with the OSRM (Open Source Routing Machine) API to calculate walking routes.
*   **Safety Logic:** Routes are filtered through current flood report data to steer users away from active hazard zones.

### F-15: Emergency SOS & Help Requests
*   **Technical Implementation:** A one-tap SOS system that broadcasts location data to nearby responders via WebSockets.
*   **Responder UI:** Interactive pulsing markers on the map with a "Accept/Resolve" workflow.

### F-17: Human-Centric Flood Reporting
*   **Technical Implementation:** Icon-based UI (F-13) for low-literacy accessibility and voice-input capability. 
*   **Data:** Captures water level (Ankle, Knee, Waist, etc.) and auto-attaches GPS coordinates.

### F-25: Weather Intelligence
*   **Technical Implementation:** Real-time data fetching from Open-Meteo API to provide hyper-local rainfall and flood risk scoring.

---

## ♿ Inclusive Design & Accessibility
HydroMesh is designed for everyone, including those with visual impairments or literacy barriers.
*   **Vision Modes:** Support for Dark Mode, Light Mode, and a specialized **High Contrast** mode (Bold yellow/black).
*   **Colorblind Safety:** A dedicated palette designed for Deuteranopia (Blue/Amber) avoiding Red/Green confusion.
*   **TTS & Haptics:** Audio alerts for flood proximity and haptic feedback for critical interactions.

---

## 🛠 Tech Stack
*   **Frontend (Web/Mobile):** Flutter 3.x (Dart) with `flutter_animate` for high-end micro-interactions.
*   **Backend:** Node.js 20+ (Express.js) with JWT Authentication and Socket.io.
*   **Database:** PostgreSQL 16 + PostGIS for spatial analytics.
*   **Deployment:** Azure App Service (Backend) & Supabase (Database).

---

## 📥 Installation & Setup

### 1. Prerequisites
*   Node.js v20+
*   Flutter SDK 3.24+
*   PostgreSQL 16 w/ PostGIS

### 2. Database Configuration
```bash
# Create database and enable spatial extensions
psql -U postgres -c "CREATE DATABASE hydromesh;"
psql -U postgres -d hydromesh -c "CREATE EXTENSION postgis;"

# Import schema and sample data
psql -U postgres -d hydromesh -f database/schema.sql
psql -U postgres -d hydromesh -f database/seed.sql
```

### 3. Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file (refer to `.env.example`):
   ```env
   DATABASE_URL=postgresql://user:pass@localhost:5432/hydromesh
   JWT_SECRET=your_secret_key
   PORT=8080
   ```
4. `npm run dev`

### 4. Mobile/Web App Setup
1. `cd mobile` (or `cd frontend` for web prototype)
2. `flutter pub get`
3. `flutter run -d chrome` (for web) or `flutter run` (for mobile emulator)

---

## 🧪 Testing
We maintain high code quality through rigorous testing. Evidence of test execution is located in the `/test_results` directory.
*   **Backend Unit Tests:** `cd backend && npm test`
*   **Flutter Widget Tests:** `cd mobile && flutter test`
*   **Integration Tests:** Verified end-to-end flows (Auth -> Report -> Map).

---

## 👥 The Team (Output Outlaws)
| Member | Primary Role | Feature Ownership |
| :--- | :--- | :--- |
| **Saksham Mishra** | Project Lead | Backend API, WebSocket, Map UI |
| **Adham Khashan** | Documentation | README, Ethics, GDPR Compliance |
| **Shaazia Raziq** | DB Architect | PostgreSQL/PostGIS, Azure Deployment |
| **Moustafa Ameen** | UI/UX Developer | Flood Report UI (Icon/Voice) |
| **Fartun Araye** | Accessibility | Audio Alerts, High-Contrast Mode |
| **Dhwanit Soni** | Safety Systems | Help Request UI (SOS), Location Logic |
| **Yaman Gulcan** | Integration | Weather API, Risk Scoring, Safe Routes |

---

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
\n\n
