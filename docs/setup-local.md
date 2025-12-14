# Privacy Falcon — Local Development Setup

This document explains how to set up **Privacy Falcon** locally on a **fresh Windows machine using WSL (Ubuntu)**.

By the end of this guide, you will have:
- **Backend running** (FastAPI)
- **Playwright working** (headless Chromium)
- **MongoDB and Redis running** locally via Docker

---

## 1. System Requirements

### OS
- Windows 10 / Windows 11

### Required Software
- **WSL 2** (Ubuntu 22.04+)
- **Docker Desktop for Windows**
- **VS Code**

### VS Code Extensions
- Remote – WSL
- Python

---

## 2. WSL Setup (One-Time)

Open **PowerShell as Administrator**:

```powershell
wsl --install
```

Restart your system if prompted.

Verify inside WSL:

```bash
lsb_release -a
```

## 3. Docker Desktop Setup

1. Install **Docker Desktop for Windows**
2. In Docker settings:
   - Enable **WSL 2 backend**
   - Enable integration with **Ubuntu**

Verify from WSL:

```bash
docker --version
docker compose version
```

## 4. Clone Repository

Inside WSL:

```bash
cd /mnt/d
git clone <REPO_URL> privacy-falcon
cd privacy-falcon
```

## 5. Open Project in VS Code (IMPORTANT)

From WSL terminal:

```bash
code .
```

Ensure VS Code shows “WSL: Ubuntu” in the bottom-left.

If not:
> **Ctrl + Shift + P** → `Remote-WSL: Reopen Folder in WSL`

## 6. Backend Setup (Python + FastAPI)

### Install Python tooling
```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip python3-full
```

### Create and activate virtual environment
```bash
cd apps/backend
python3 -m venv venv
source venv/bin/activate
```

Verify:

```bash
which python
```

Expected:
> `.../apps/backend/venv/bin/python`

### Install backend dependencies
```bash
python -m pip install --upgrade pip
python -m pip install \
  fastapi \
  uvicorn[standard] \
  pymongo \
  redis \
  rq \
  python-dotenv \
  playwright
```

### Run backend server
```bash
uvicorn src.main:app --port 8000
```

Test from another terminal:

```bash
curl http://127.0.0.1:8000/health
```

Expected output:
```json
{"status":"ok"}
```

## 7. Playwright Setup (Critical)

### Install OS dependencies (Ubuntu / WSL)
```bash
sudo apt install -y \
  libnss3 \
  libatk-bridge2.0-0t64 \
  libxkbcommon0 \
  libgbm1 \
  libasound2t64 \
  fonts-liberation
```

### Install Chromium browser
```bash
python -m playwright install chromium
```

### Verify Playwright
```bash
python src/playwright_test.py
```

Expected output:
> PAGE TITLE: Example Domain

If this works, headless browser automation is functional.

## 8. Local Infrastructure (MongoDB + Redis)

From repository root:

```bash
docker compose up -d
```

Verify containers:

```bash
docker ps
```

You should see:
- `pf-mongo`
- `pf-redis`

### Verify MongoDB
```bash
docker exec -it pf-mongo mongosh

use privacy_falcon
db.test.insertOne({ ok: true })
db.test.find()
```

Exit:
```bash
exit
```

### Verify Redis
```bash
docker exec -it pf-redis redis-cli

PING
```

Expected:
> PONG

Exit:
```bash
exit
```

## 9. Git Hygiene (Important)

Never commit:
- `venv/`
- `__pycache__/`
- `*.pyc`
- `.env`

Handled via .gitignore.

## 10. Common Issues & Fixes

### ❌ VS Code shows “Import fastapi could not be resolved”

**Fix:**
- Ensure VS Code is opened inside WSL
- Select interpreter: `venv/bin/python`

### ❌ Port 8000 already in use

**Fix:**
```bash
pkill -f uvicorn
```

Always stop servers with CTRL + C (not CTRL + Z).

### ❌ Playwright fails due to missing libraries

**Fix:**
Ensure `libasound2t64` is installed (not `libasound2`).

## 11. Cloud Usage Policy (MVP Phase)

- ❌ No cloud accounts
- ❌ No AWS / Fly / Supabase
- ✅ Local-only development

Cloud decisions deferred until MVP validation

## 12. Final Verification Checklist

- [ ] `/health` endpoint works
- [ ] Playwright test passes
- [ ] MongoDB running
- [ ] Redis running
- [ ] No secrets committed
- [ ] Setup reproducible on fresh machine

If all are checked, local setup is complete.