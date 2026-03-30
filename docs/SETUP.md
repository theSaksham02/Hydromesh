# HydroMesh: Comprehensive Setup Guide 🛠️

This guide provides step-by-step instructions to set up the complete HydroMesh ecosystem on your local machine.

---

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
*   **Node.js** (v18.0.0 or higher)
*   **Flutter SDK** (v3.10.0 or higher)
*   **PostgreSQL** (v14 or higher) with **PostGIS** extension
*   **Git**

---

## 1. Repository Setup
Clone the repository and navigate into the project root:
```bash
git clone https://github.com/theSaksham02/Hydromesh.git
cd Hydromesh
```

---

## 2. Database Configuration (PostgreSQL + PostGIS)
HydroMesh uses PostgreSQL with PostGIS for geospatial data handling.

1.  **Create the Database:**
    ```bash
    psql -U postgres -c "CREATE DATABASE hydromesh;"
    ```
2.  **Enable PostGIS:**
    ```bash
    psql -U postgres -d hydromesh -c "CREATE EXTENSION IF NOT EXISTS postgis;"
    ```
3.  **Run Schema and Seed:**
    ```bash
    psql -U postgres -d hydromesh -f database/schema.sql
    psql -U postgres -d hydromesh -f database/seed.sql
    ```

---

## 3. Backend Setup (Node.js/Express)
1.  **Navigate to backend:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Environment Variables:**
    Create a `.env` file in the `backend` directory (refer to `.env.example`):
    ```env
    PORT=3000
    DATABASE_URL=postgresql://user:password@localhost:5432/hydromesh
    JWT_SECRET=your_secure_secret_here
    SUPABASE_URL=your_supabase_url
    SUPABASE_SERVICE_KEY=your_supabase_key
    ```
4.  **Start the server:**
    *   Development mode: `npm run dev`
    *   Production mode: `npm start`

---

## 4. Mobile App Setup (Flutter)
The mobile app is the primary interface for citizens and responders.

1.  **Navigate to mobile:**
    ```bash
    cd ../mobile
    ```
2.  **Install dependencies:**
    ```bash
    flutter pub get
    ```
3.  **Configuration:**
    Ensure `lib/config/app_config.dart` points to your local backend IP if running on a physical device.
4.  **Run the app:**
    ```bash
    flutter run
    ```

---

## 5. Web Frontend Setup (Flutter Web)
A lighter web-based dashboard for administration and monitoring.

1.  **Navigate to frontend:**
    ```bash
    cd ../frontend
    ```
2.  **Install dependencies:**
    ```bash
    flutter pub get
    ```
3.  **Run for web:**
    ```bash
    flutter run -d chrome
    ```

---

## 🧪 Running Tests
Verification is key to ensuring system stability.

*   **Backend:** `cd backend && npm test`
*   **Mobile:** `cd mobile && flutter test`

---

## 🛠 Troubleshooting
*   **Connection Refused:** Ensure the backend server is running on port 3000.
*   **Database Errors:** Verify that the PostGIS extension is enabled in your database.
*   **Flutter Issues:** Run `flutter doctor` to diagnose environment problems.
