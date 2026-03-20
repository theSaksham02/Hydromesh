# HydroMesh: Technical Architecture Overview 🏗️

This document outlines the high-level system design, data flow, and architectural decisions that power the HydroMesh FloodNet Twin.

---

## 1. System Architecture (4-Layer Pattern)
HydroMesh follows a clean, decoupled architecture for maximum scalability and maintainability.

1.  **External Layer:** Interacts with Open-Meteo API (Weather) and OSRM (Routing).
2.  **Application Layer (Backend):** Node.js/Express server managing business logic, JWT authentication, and WebSocket orchestration.
3.  **Client Application (Flutter):** Provides a high-end, responsive, and accessible UI across Mobile and Web.
4.  **Data Layer (PostgreSQL/PostGIS):** A persistent, geospatial-capable database for storing reports, emergencies, and user locations.

---

## 2. Geospatial Engine (PostGIS)
The core "intelligence" of the map relies on PostGIS, a spatial database extender for PostgreSQL.

*   **Spatial Queries:** We use `ST_DWithin` to find flood reports and responders within a 5km radius of an SOS request.
*   **Dynamic Risk Zones:** Instead of a static map, the backend uses spatial clustering algorithms to group reports and return danger polygons (heatmaps) in real-time.
*   **Coordinate Robustness:** The system implements "Type-Resilient Parsing" to handle both String and Float coordinate inputs, preventing crashes from varied API responses.

---

## 3. Real-Time Event Loop (WebSockets)
To ensure the map feels "alive," we utilize **Socket.io** for bi-directional communication.

*   **The Flow:** When a user submits a flood report (`POST /api/reports`), the server saves it to the DB and immediately broadcasts a `new_report` event to all connected clients.
*   **Emergency Broadcasting:** SOS requests use a specialized namespace (`/emergency`). Only users identified as "Responders" receive these broadcasts, reducing noise for general citizens.

---

## 4. Frontend State Management (Provider)
The Flutter app uses the **Provider** pattern for reactive state management.

*   **ThemeProvider:** Centralizes logic for Dark, Light, High-Contrast, and Colorblind modes. It rebuilds the entire `MaterialApp` theme when an accessibility mode is toggled.
*   **ApiProvider/AuthProvider:** Manages JWT persistence and REST API calls, injecting dependencies into UI widgets.
*   **Animation Orchestration:** We use `flutter_animate` to stagger widget loading, creating a premium feel without sacrificing performance.

---

## 5. Inclusive Design Implementation
HydroMesh treats accessibility as a first-class feature, not an afterthought.

*   **High-Contrast Mode:** Optimized for users with visual impairments, utilizing a strict #000000 / #FFD600 (Black/Yellow) palette.
*   **Deuteranopia Safety:** The "Colorblind" mode replaces red/green indicators with blue/amber to ensure safety warnings are interpreted correctly by all users.
*   **Haptic Feedback Loop:** Critical actions (like the SOS button) trigger physical haptic patterns (`HapticFeedback.heavyImpact`) for tactile confirmation.

---
*Document Version: 1.1*
