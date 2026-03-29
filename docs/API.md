# HydroMesh API Documentation 📖

Detailed documentation for the HydroMesh FloodNet Twin backend services.

## Base URL
- **Local Development:** `http://localhost:3000/api`
- **Production (Azure/Render):** `https://hydromesh-api.azurewebsites.net/api`

---

## 1. Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
|:--- | :--- | :--- | :--- |
| POST | `/register` | Create a new Citizen or Responder account | No |
| POST | `/login` | Authenticate and receive a JWT token | No |

### Sample Register Body
```json
{
  "name": "Saksham Mishra",
  "email": "saksham@test.com",
  "password": "password123",
  "role": "citizen"
}
```

---

## 2. Flood Reports (`/reports`)
| Method | Endpoint | Description | Auth Required |
|:--- | :--- | :--- | :--- |
| GET | `/` | Fetch all active flood reports (last 24h) | No |
| POST | `/` | Submit a new crowdsourced flood report | Yes |

---

## 3. Emergency SOS (`/emergency`)
| Method | Endpoint | Description | Auth Required |
|:--- | :--- | :--- | :--- |
| POST | `/request` | Trigger a high-priority SOS signal | Yes |
| GET | `/pending` | List all active SOS requests for responders | Yes (Responder) |
| POST | `/:id/accept` | Responder accepts an SOS request | Yes (Responder) |

---

## 4. Weather (`/weather`)
| Method | Endpoint | Description | Auth Required |
|:--- | :--- | :--- | :--- |
| GET | `/current` | Real-time rain and wind data from Open-Meteo | No |
| GET | `/forecast` | 7-day hyper-local flood risk forecast | No |
