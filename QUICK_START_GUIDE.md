# Quick Start Guide for Doctor - Security Assessment

**For: Security Testing & Vulnerability Assessment**

---

## 🚀 Get Started in 5 Minutes

### Step 1: Get the Code (2 minutes)

```bash
git clone https://github.com/Amro-Almasri/scure-project.git
cd scure-project
```

---

### Step 2: Install Dependencies (2 minutes)

**Terminal 1 - Backend:**
```bash
cd src/backend
npm install
```

**Terminal 2 - Frontend (in a new terminal):**
```bash
cd src/frontend
npm install
```

---

### Step 3: Start MongoDB

Make sure MongoDB is running:
```bash
mongod
```

> If MongoDB is installed as a service, it may already be running

---

### Step 4: Start Backend (Terminal 1)

```bash
cd src/backend
npm start
```

**Expected output:**
```
✅ Secure API Server running on port 3000
📍 Environment: development
🔐 CORS enabled for: http://localhost:3001
✅ MongoDB Connected: localhost
```

---

### Step 5: Start Frontend (Terminal 2)

```bash
cd src/frontend
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view secure-web-app-frontend in the browser.

  http://localhost:3001
```

Browser should automatically open. If not, manually go to: **http://localhost:3001**

---

## 🔐 Login to Test

**Admin Account:**
- **Email:** `admin@example.com`
- **Password:** `Admin@12345`

Click **Login** → You should see the **Dashboard**

---

## 📋 What to Test

### Basic Functionality
- [ ] Login with admin account
- [ ] View dashboard
- [ ] Logout
- [ ] View all users (admin feature)

### Security Features
- [ ] Try invalid login (check error message)
- [ ] Try SQL injection in login field
- [ ] Try XSS in form fields
- [ ] Test rate limiting (multiple failed logins)
- [ ] Check JWT token in browser storage

### API Endpoints
- [ ] GET `/api/health` - Should return server status
- [ ] POST `/api/auth/login` - Login endpoint
- [ ] POST `/api/auth/register` - Registration endpoint

---

## 🛠️ Troubleshooting

### Issue: "Unable to connect to localhost:3001"
**Solution:** Frontend not running. Check Terminal 2 and run `npm start`

### Issue: "MongoDB Connected Error"
**Solution:** Start MongoDB with `mongod` command first

### Issue: "Port 3000 already in use"
**Solution:** Kill the process or use different port:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "npm: command not found"
**Solution:** Install Node.js from https://nodejs.org

---

## 📁 File Locations

| Component | Path |
|-----------|------|
| Backend | `src/backend/` |
| Frontend | `src/frontend/` |
| Documents | Root folder (*.md files) |
| Environment Config | `src/backend/.env` |

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend App | http://localhost:3001 |
| Backend API | http://localhost:3000 |
| API Health Check | http://localhost:3000/api/health |
| MongoDB | localhost:27017 |

---

## 📖 Documentation to Read

**In order:**
1. **This file** - Quick start (you are here)
2. **TESTING_GUIDE.md** - What to test
3. **STRIDE_Threat_Model.md** - Threat analysis
4. **DREAD_Risk_Assessment.md** - Risk evaluation
5. **SECURITY_BEST_PRACTICES.md** - Security practices
6. **API_SECURITY.md** - API details

---

## ✅ Verification Checklist

- [ ] Git installed
- [ ] Node.js installed (v18+)
- [ ] MongoDB installed and running
- [ ] Backend starts without errors
- [ ] Frontend compiles successfully
- [ ] Can access http://localhost:3001
- [ ] Can login with admin@example.com / Admin@12345
- [ ] Dashboard loads after login

---

## 🆘 Need Help?

1. Check the **README.md** for detailed setup
2. Review **TESTING_GUIDE.md** for testing steps
3. See **API_SECURITY.md** for API documentation
4. Check GitHub Actions for automated security scans

---

**You're ready to start security assessment!** 🎯

**Next:** Read **TESTING_GUIDE.md** for testing checklist
