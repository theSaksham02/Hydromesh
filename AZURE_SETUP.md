# Hydromesh — Azure App Service Setup Guide

> **Context for Claude**: This is the Hydromesh project — a Flutter mobile app + Node.js/Express backend + Supabase PostgreSQL for flood prediction and emergency response. The backend currently runs on Render. This guide migrates it to Azure App Service (Azure for Students subscription).
>
> **Repo structure:**
> - `backend/` — Node.js/Express API (entry: `backend/src/index.js`, start: `npm start`)
> - `mobile/` — Flutter app (`mobile/lib/config/app_config.dart` controls which backend URL is used)
> - `.github/workflows/azure-deploy.yml` — GitHub Actions auto-deploy on push to `main` (backend changes)
> - `.github/workflows/build-apk.yml` — Builds Flutter APK on push to `main`

---

## Step 1 — Create Azure App Service

1. Go to [portal.azure.com](https://portal.azure.com) → **Create a resource** → **Web App**
2. Fill in the **Basics** tab:
   - **Subscription**: Azure for Students
   - **Resource Group**: Create new → `hydromesh-rg`
   - **Name**: `hydromesh-api` (URL becomes `hydromesh-api.azurewebsites.net`)
   - **Runtime stack**: Node 24 LTS
   - **Operating System**: Linux
   - **Region**: **East US** or **West Europe** ← ⚠️ Azure for Students blocks many regions (Central India fails). Use East US.
   - **Pricing plan**: Free F1

3. **Database tab** → **Skip entirely**. Hydromesh uses Supabase (external). Do not create any Azure database.

4. **Deployment tab** → **Skip entirely**. Azure blocks GitHub Actions setup during creation on Free F1 + Linux. Set it up after.

5. **Networking tab** → Keep all defaults:
   - Enable public access: **On**
   - Enable virtual network integration: **Off**
   - Everything else: **Off** / defaults

6. Click **Review + Create** → **Create** and wait ~2 minutes.

---

## Step 2 — Configure Environment Variables

Portal → your App Service → **Configuration** → **Application settings** → **+ New application setting** for each:

| Name | Value |
|------|-------|
| `PORT` | `8080` |
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Get from Supabase Dashboard → Settings → Database → **Connection string (URI)**. If your password contains `@`, replace it with `%40` in the URL. |
| `SUPABASE_URL` | Get from Supabase Dashboard → Settings → API → **Project URL** |
| `SUPABASE_SERVICE_KEY` | Get from Supabase Dashboard → Settings → API → **service_role** key (long JWT, keep secret) |
| `JWT_SECRET` | Any random 64-character string (e.g. generate with `openssl rand -hex 32`) |
| `CORS_ORIGINS` | `*` (note: plural, with **S** — must match exactly or CORS env var is silently ignored) |

Click **Save** after adding all variables.

---

## Step 3 — Configure General Settings

Still in **Configuration** → **General settings** tab:

- **Startup Command**: `cd backend && npm start`
  - ⚠️ Required because the zip artifact contains a `backend/` subdirectory
- **Web sockets**: **On**
  - ⚠️ **Critical** — Socket.io requires this. Azure disables WebSockets by default. Without it, all real-time features (live map markers, SOS alerts) silently fail.

Click **Save** → then **Restart** the App Service.

---

## Step 4 — Set Up GitHub Actions Auto-Deploy

### 4a. Get the Publish Profile

Portal → your App Service → **Deployment Center** → **Get Publish Profile** → download the `.PublishSettings` file. Open it in a text editor and copy the entire content.

### 4b. Add GitHub Secrets

Go to the GitHub repo → **Settings** → **Secrets and variables** → **Actions**:

1. Click **New repository secret**:
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: paste the entire `.PublishSettings` file content

2. Click **Variables** tab → **New repository variable**:
   - Name: `AZURE_WEBAPP_NAME`
   - Value: `hydromesh-api` (or whatever name you chose)

### 4c. Trigger First Deploy

The workflow only auto-triggers when `backend/**` files change. For the first deploy, trigger it manually:

GitHub repo → **Actions** → **Deploy Backend to Azure** → **Run workflow** → **Run workflow** (green button)

Watch the run — it should take ~2 minutes. If it fails, check the logs for the error.

---

## Step 5 — Unpause Supabase

Supabase Free tier auto-pauses after 7 days of inactivity.

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Find your project — if it shows a pause banner, click **Restore**
3. Wait ~1 minute for it to come back online

---

## Step 6 — Verify Deployment

```bash
# Health check — should return {"status":"ok","version":"1.4.0","dbMode":"supabase-rest"}
curl https://hydromesh-api.azurewebsites.net/api/health

# Test auth endpoint
curl -X POST https://hydromesh-api.azurewebsites.net/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"citizen@test.com","password":"password123"}'

# Test reports
curl https://hydromesh-api.azurewebsites.net/api/reports
```

---

## Step 7 — Switch Flutter App to Azure

Once the health check passes, in `mobile/lib/config/app_config.dart` line 5:

```dart
// Change this:
static const String _env = 'render';

// To this:
static const String _env = 'azure';
```

Commit and push to `main` → GitHub Actions will automatically rebuild the APK. Download from the **Actions** tab → latest **Build Android APK** run → **Artifacts**.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `RequestDisallowedByAzure` on creation | Region blocked by Azure for Students policy | Use **East US** or **West Europe** |
| 502 Bad Gateway | Wrong or missing startup command | Set startup command to `cd backend && npm start` |
| App not starting | Missing env vars or wrong port | Check **Log stream** in portal; ensure `PORT=8080` is set |
| DB connection fails | Supabase paused or wrong DATABASE_URL | Restore Supabase; ensure `@` is encoded as `%40` in URL |
| Real-time features broken (map, SOS) | WebSockets disabled | Configuration → General settings → Web sockets → **On** |
| CORS errors in app | Wrong env var name | Must be `CORS_ORIGINS` (with **S**), not `CORS_ORIGIN` |
| GitHub Actions deploy fails | Missing secret/variable | Ensure both `AZURE_WEBAPP_PUBLISH_PROFILE` secret and `AZURE_WEBAPP_NAME` variable are set |
| Deploy workflow never triggers | No `backend/**` files changed | Trigger manually: Actions → Deploy Backend to Azure → Run workflow |
| `npm ci` fails in Actions | Node version mismatch | The workflow uses Node 18 to build — this is fine, Azure runtime is Node 24 |

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `backend/src/index.js` | Express entry point; reads `PORT`, `CORS_ORIGINS`, `NODE_ENV` |
| `backend/src/config/database.js` | DB connection (Supabase REST or direct pg); handles `%40` password encoding |
| `backend/src/socket.js` | Socket.io setup; reads `SOCKET_CORS_ORIGIN` (separate from Express CORS, defaults to `*`) |
| `mobile/lib/config/app_config.dart` | Flutter URL switcher; `_env` controls which backend is used |
| `.github/workflows/azure-deploy.yml` | Auto-deploys backend on push to `main` (backend changes) |
| `.github/workflows/build-apk.yml` | Builds Flutter APK on push to `main` |

---

## Environment Summary

| Variable | Used By | Notes |
|----------|---------|-------|
| `PORT` | `index.js` | Azure injects 8080; set explicitly too |
| `NODE_ENV` | `index.js` | Set to `production` |
| `DATABASE_URL` | `database.js` | Direct pg connection; encode `@` as `%40` |
| `SUPABASE_URL` | `database.js` | REST API fallback |
| `SUPABASE_SERVICE_KEY` | `database.js` | Service role key (not anon key) |
| `JWT_SECRET` | auth routes | Any random secret string |
| `CORS_ORIGINS` | `index.js` | **Plural S** — comma-separated list or `*` |
| `SOCKET_CORS_ORIGIN` | `socket.js` | Optional; defaults to `*` |
