# Secure Web Application - Security Testing Guide

## Quick Start (For Security Testing)

This guide helps doctors and security professionals run the application locally for security testing and vulnerability assessment.

---

## Prerequisites

Before you start, make sure you have:
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org)
- **MongoDB** (local installation) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com)

---

## Installation Steps

### Step 1: Clone the Repository

```bash
git clone https://github.com/Amro-Almasri/scure-project.git
cd "scure project"
```

### Step 2: Install Backend Dependencies

```bash
cd src/backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Configure Environment

The backend already has a `.env` file configured. If needed, edit:
- `src/backend/.env` - Backend configuration (MongoDB URI, JWT secret, etc.)

---

## Running the Application

### Start MongoDB (First)

Make sure MongoDB is running on your system:

**Windows (if installed as service):**
```bash
# MongoDB should auto-start
# Verify it's running on port 27017
```

**Or start MongoDB manually:**
```bash
mongod
```

### Terminal 1: Start Backend Server

```bash
cd src/backend
npm start
```

Expected output:
```
✅ Secure API Server running on port 3000
📍 Environment: development
🔐 CORS enabled for: http://localhost:3001
✅ MongoDB Connected: localhost
```

### Terminal 2: Start Frontend Application

Open a **new terminal** and run:

```bash
cd src/frontend
npm start
```

The application will automatically open in your browser at:
```
http://localhost:3001
```

---

## Login Credentials (Default Admin Account)

**Email:** `admin@example.com`
**Password:** `Admin@12345`

---

## Application URLs

| Service | URL |
|---------|-----|
| Frontend (React App) | http://localhost:3001 |
| Backend API | http://localhost:3000 |
| MongoDB | localhost:27017 |
| Health Check | http://localhost:3000/api/health |

---

## Features for Security Testing

### ✅ Implemented Security Features:

1. **Authentication & Authorization**
   - JWT token-based authentication
   - Role-based access control (Admin/User)
   - Password hashing with bcryptjs

2. **Network Security**
   - CORS configuration
   - Helmet.js security headers
   - Rate limiting (5 login attempts per 15 minutes)

3. **Input Security**
   - Input validation and sanitization
   - DOMPurify for XSS prevention
   - Request body size limits (10KB)

4. **Data Protection**
   - Environment variable management
   - Secure database connection
   - Error handling middleware

---

## Database

The application uses **MongoDB** with a `secure_app_db` database.

**Collections:**
- `users` - User accounts with roles (admin/user)

**User Schema:**
- username (unique, 3-30 chars, alphanumeric)
- email (unique, valid email)
- password (hashed with bcryptjs, min 8 chars)
- role (admin or user)
- isActive (boolean)
- loginAttempts (for brute force protection)
- lockUntil (account lock timestamp)

---

## Project Structure

```
scure project/
├── src/
│   ├── backend/              # Express.js API server
│   │   ├── server.js         # Main server file
│   │   ├── config/           # Database configuration
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Auth, validation, error handling
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API routes
│   │   └── utils/            # JWT, validation utilities
│   │
│   └── frontend/             # React.js application
│       ├── src/
│       │   ├── components/   # Reusable UI components
│       │   ├── pages/        # Page components
│       │   ├── services/     # API integration
│       │   └── context/      # Auth state management
│       └── public/           # Static files
│
├── docs/                     # Security documentation
│   ├── STRIDE_Threat_Model.md
│   └── DREAD_Risk_Assessment.md
│
└── scans/                    # Security scanning reports
```

---

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/users` | Get all users (Admin only) |
| DELETE | `/api/auth/users/:id` | Delete user (Admin only) |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

---

## Security Testing Checklist

- [ ] Test authentication with invalid credentials
- [ ] Test JWT token validation
- [ ] Test CORS restrictions
- [ ] Test rate limiting on login endpoint
- [ ] Test input validation (SQL injection, XSS)
- [ ] Test role-based access control
- [ ] Test password requirements
- [ ] Check security headers (Helmet.js)
- [ ] Test account lockout mechanism
- [ ] Review error messages for information disclosure

---

## Troubleshooting

### MongoDB Connection Error
```
Error: The `uri` parameter to `openUri()` must be a string
```
**Solution:** Make sure MongoDB is running. Check `src/backend/.env` has correct `MONGODB_URI`.

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Kill the process using the port or change the port in `.env`.

### React App Not Starting
```
Error: Cannot find module 'react'
```
**Solution:** Run `npm install` in the `src/frontend` directory.

---

## Security Documentation

For detailed security analysis, see:
- [STRIDE Threat Model](docs/STRIDE_Threat_Model.md)
- [DREAD Risk Assessment](docs/DREAD_Risk_Assessment.md)

---

## Support

For issues or questions, refer to the security documentation in the `docs/` folder.

---

**Last Updated:** January 17, 2026
