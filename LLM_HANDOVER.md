# Hydromesh: Project Handover & State Document

This document provides a comprehensive overview of the Hydromesh project, what has been implemented so far, the current architecture, deployment status, and next steps. It is designed to get any new LLM (like Claude Sonnet or Codex) instantly up to speed.

## 1. Project Overview
**Hydromesh** is a community-driven flood prediction and emergency response platform. It consists of a mobile app (Flutter) and a backend API (Node.js/Express) connected to a PostgreSQL database (Supabase) with PostGIS extensions for spatial queries.

### Core Features (Milestone 4 Rubric)
- **F-07:** Real-Time Flood Map (PostGIS spatial queries + flutter_map)
- **F-11:** Predictive Safe Routes (Simulated polylines routing out of hazard zones)
- **F-15:** Emergency/Help Requests (SOS broadcasting to nearby responders)
- **F-17:** Submit Flood Reports (Custom UI with water-level selection)
- **F-25:** Weather API Integration (Open-Meteo fetching based on GPS)
- **Global Simulation (God Mode):** A hidden dashboard to trigger massive, real-time simulated events (Flash Floods, Mass Evacuations) across 10 global cities using WebSockets (Socket.io).

---

## 2. Tech Stack & Design Language
- **Frontend:** Flutter (Dart) using a highly stylized, Rive-inspired "Glassmorphism" UI.
  - Deep dark theme (`#0A0A0A` background) with Neon accents (Electric Blue, Violet, Danger Red).
  - Extensive use of `flutter_animate` for micro-interactions (staggered fades, pulsing buttons, shimmers).
  - WebSockets (`socket_io_client`) for real-time map marker updates without refreshing.
- **Backend:** Node.js + Express.js.
  - RESTful architecture with JWT Authentication.
  - Socket.io server for real-time event broadcasting (`new_report`, `new_emergency`).
- **Database:** Supabase (PostgreSQL 16).
  - Uses PostGIS (`ST_MakePoint`, `ST_DWithin`) to calculate radiuses and find nearby reports/responders.

---

## 3. What Has Been Completed
1. **Database Schema:** Defined `users`, `flood_reports`, `emergency_requests`, and `user_locations` with geospatial indexing.
2. **Backend API:** All endpoints built (`/api/auth`, `/api/reports`, `/api/emergency`, `/api/weather`, `/api/simulation`).
3. **Frontend UI Rebuild:** Converted the entire mobile app to the Rive-inspired glassmorphism theme:
   - `login_screen.dart`: Radial gradients, animated logo, auth toggle.
   - `home_screen.dart`: CustomScrollView, pinned sliver app bar, horizontal scrolling glass tools.
   - `map_screen.dart`: Floating UI elements, dark matter CartoDB tiles, animated bottom sheet for report details.
   - `report_screen.dart`: Glass input cards, staggered animations.
   - `route_screen.dart`: Simulated route polyline drawing.
   - `emergency_screen.dart`: Pulsing neon SOS button with success states.
   - `simulation_screen.dart`: "God Mode" trigger panel to spawn hundreds of fake reports.
4. **Testing:** Jest unit tests for backend models; Flutter widget tests for UI elements (Both passing).

---

## 4. Current Deployment State & Recent Issues
- **Frontend (Web/Android):**
  - Attempted to build `.apk` via Codemagic. Met an issue with the `record` package interface mismatch. Upgraded `record` to `^6.2.0` which fixed the build error. 
  - Frontend points to the live backend via `mobile/lib/config/app_config.dart`.
- **Backend (Render.com vs Vercel):**
  - We initially deployed to Vercel. However, because Vercel is serverless, it crashed when trying to maintain persistent WebSocket (Socket.io) connections.
  - **Action Taken:** We reverted the backend `index.js` to a standard Express server and migrated deployment to **Render.com**.
  - **Database Connection Issue on Render:** Render's free tier does not support IPv6 outbound. Supabase defaults to IPv6. Render threw an `ENETUNREACH` error.
  - **The Fix:** The user was instructed to update the Render `DATABASE_URL` environment variable to use the Supabase IPv4 connection pooler.
    - *Old String:* `postgresql://postgres:Hydromesh@2025@db.zllbvvgufhhhktaxlpqp.supabase.co:5432/postgres`
    - *New String:* `postgresql://postgres.zllbvvgufhhhktaxlpqp:Hydromesh%402025@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true`

---

## 5. Next Steps for the AI Assistant
1. **Verify Backend Status:** Ensure the Render backend is live and successfully connected to Supabase using the IPv4 pooler string.
2. **Compile the Mobile App:** Since the Codemagic build should now pass, pull the final `.apk` to test the real-time Socket.io God Mode features on a physical Android device.
3. **Refine Frontend Animations:** Add any additional Rive `.riv` files or Mapbox 3D elements if the user desires further visual polish.
4. **Offline Caching (Shaazia's Feature):** Implement local SQLite / SharedPreferences caching for the map and reports so the app degrades gracefully without internet.