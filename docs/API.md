# HydroMesh API Documentation 📖

This document outlines the available REST API endpoints for the HydroMesh backend.

## Base URL
*   **Local:** `http://localhost:3000/api`
*   **Production:** `https://hydromesh-api.onrender.com/api`

---

## 1. Authentication
Endpoints for user registration and login.

### POST `/auth/register`
Creates a new user account.
*   **Body:** `{ "name": "...", "email": "...", "password": "...", "role": "citizen|responder" }`
*   **Response:** `{ "token": "...", "user": { ... } }`

### POST `/auth/login`
Authenticates an existing user.
*   **Body:** `{ "email": "...", "password": "..." }`
*   **Response:** `{ "token": "...", "user": { ... } }`

---

## 2. Flood Reports
Endpoints for crowdsourced flood monitoring.

### GET `/reports`
Returns all active flood reports within the last 24 hours.
*   **Response:** `[ { "id": "...", "latitude": 0.0, "longitude": 0.0, "waterLevel": "...", "createdAt": "..." }, ... ]`

### POST `/reports` (Auth Required)
Submits a new flood report.
*   **Body:** `{ "latitude": 0.0, "longitude": 0.0, "waterLevel": "ankle|knee|waist|chest|above_head", "description": "..." }`

---

## 3. Emergency SOS
Endpoints for critical assistance.

### GET `/emergency/pending` (Auth Required - Responder Only)
Returns all active SOS requests.

### POST `/emergency/request` (Auth Required)
Broadcasts an SOS signal to nearby responders.
*   **Body:** `{ "latitude": 0.0, "longitude": 0.0, "description": "..." }`

---

## 4. Weather & Intelligence
### GET `/weather/current`
Fetches real-time weather from Open-Meteo based on coordinates.
*   **Params:** `?latitude=...&longitude=...`
