# API Security Documentation

**Complete API Reference & Security Guide**

---

## API Overview

**Base URL:** `http://localhost:3000/api`

**Authentication:** JWT Bearer Token (required for protected endpoints)

**Response Format:** JSON

---

## Authentication

### How to Get Token

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123456",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

### Using Token

Add token to request header:
```
Authorization: Bearer <token>
```

**Example with curl:**
```bash
curl -H "Authorization: Bearer eyJhbGc..." \
  http://localhost:3000/api/auth/users
```

---

## API Endpoints

### 1. Health Check

**Endpoint:** `GET /api/health`

**Authentication:** Not required

**Purpose:** Check if server is running

**Response:**
```json
{
  "message": "Server is running",
  "timestamp": "2025-01-17T14:30:00.000Z",
  "environment": "development"
}
```

**Security:** None (public endpoint)

---

### 2. User Registration

**Endpoint:** `POST /api/auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Validation Rules:**
- Username: 3-30 characters, alphanumeric with `-` and `_`
- Email: Valid email format, unique
- Password: Minimum 8 characters

**Response (Success):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Response (Error - Email exists):**
```json
{
  "error": "Username or email already exists"
}
```

**Security:**
- ✅ Passwords are bcrypt hashed (10 rounds)
- ✅ Input validation on all fields
- ✅ Email uniqueness enforced
- ✅ Password requirements enforced

---

### 3. User Login

**Endpoint:** `POST /api/auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```

**Response (Success):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Response (Error - Wrong credentials):**
```json
{
  "error": "Invalid credentials"
}
```

**Response (Error - Account locked):**
```json
{
  "error": "Account temporarily locked. Please try again later."
}
```

**Security:**
- ✅ Rate limited: 5 attempts per 15 minutes
- ✅ Account lockout after 5 failed attempts
- ✅ Generic error message (no info disclosure)
- ✅ Password compared with timing-attack resistance
- ✅ Login attempts tracked

---

### 4. Get All Users (Admin Only)

**Endpoint:** `GET /api/auth/users`

**Authentication:** Required (Admin role)

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
[
  {
    "_id": "user_id_1",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-01-17T10:00:00.000Z"
  },
  {
    "_id": "user_id_2",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-01-17T11:00:00.000Z"
  }
]
```

**Response (Error - Not authenticated):**
```json
{
  "error": "No token provided"
}
```

**Response (Error - Not admin):**
```json
{
  "error": "Admin access required"
}
```

**Security:**
- ✅ JWT token required
- ✅ Admin role required
- ✅ Passwords never returned
- ✅ Only admins can view user list

---

### 5. Delete User (Admin Only)

**Endpoint:** `DELETE /api/auth/users/:id`

**Authentication:** Required (Admin role)

**URL Parameters:**
- `id` - User ID to delete

**Headers:**
```
Authorization: Bearer <token>
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/auth/users/user_id \
  -H "Authorization: Bearer <token>"
```

**Response (Success):**
```json
{
  "message": "User deleted successfully"
}
```

**Response (Error - User not found):**
```json
{
  "error": "User not found"
}
```

**Response (Error - Not authorized):**
```json
{
  "error": "Admin access required"
}
```

**Security:**
- ✅ JWT token required
- ✅ Admin role required
- ✅ Cannot delete non-existent users
- ✅ Soft delete (can implement)

---

## Error Responses

### Standard Error Format

```json
{
  "error": "Description of what went wrong"
}
```

### Common HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful request |
| 201 | Created | User registered |
| 400 | Bad Request | Invalid input |
| 401 | Unauthorized | No/invalid token |
| 403 | Forbidden | No permission |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unexpected error |

---

## Request Rate Limits

### General Rate Limit
- **Max Requests:** 100 per 15 minutes
- **Per:** IP address
- **Error Response:** HTTP 429

### Login Rate Limit
- **Max Attempts:** 5 per 15 minutes
- **Per:** IP address
- **On Failure:** Account locked for 30 minutes
- **Error Message:** "Too many login attempts"

---

## JWT Token Details

### Token Structure
```
Header.Payload.Signature

Example:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiIsImlhdCI6MTUxNjIzOTAyMn0.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Token Claims
```json
{
  "id": "user_id",
  "role": "admin|user",
  "iat": 1516239022,
  "exp": 1516325422
}
```

### Token Expiration
- **Expires:** 7 days after generation
- **After Expiration:** Must login again
- **Error:** HTTP 401 with "Token expired"

### Token Security
- ✅ Signed with JWT_SECRET
- ✅ Cannot be forged
- ✅ Cannot be modified
- ✅ Expiration enforced
- ✅ Revocation on logout

---

## Request/Response Examples

### Example 1: Register New User

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "alice",
    "email": "alice@example.com",
    "password": "AlicePass123",
    "confirmPassword": "AlicePass123"
  }'
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "alice_id",
    "username": "alice",
    "email": "alice@example.com",
    "role": "user"
  }
}
```

---

### Example 2: Login User

**Request:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "AlicePass123"
  }'
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "alice_id",
    "username": "alice",
    "email": "alice@example.com",
    "role": "user"
  }
}
```

---

### Example 3: Get Users (Admin)

**Request:**
```bash
curl -X GET http://localhost:3000/api/auth/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
[
  {
    "_id": "admin_id",
    "username": "admin",
    "email": "admin@example.com",
    "role": "admin",
    "isActive": true
  },
  {
    "_id": "alice_id",
    "username": "alice",
    "email": "alice@example.com",
    "role": "user",
    "isActive": true
  }
]
```

---

## Security Headers

All responses include:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Content-Type-Options` | nosniff | Prevent MIME sniffing |
| `X-Frame-Options` | DENY | Prevent clickjacking |
| `X-XSS-Protection` | 1; mode=block | XSS protection |
| `Content-Security-Policy` | default-src 'self' | Control resource loading |
| `Strict-Transport-Security` | max-age=31536000 | Force HTTPS (prod) |

---

## CORS Policy

**Allowed Origin:** `http://localhost:3001` (configurable)

**Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS

**Allowed Headers:** Content-Type, Authorization

**Credentials:** Allowed (true)

---

## API Security Checklist

- [x] Authentication required (JWT tokens)
- [x] Authorization checks (roles)
- [x] Input validation on all endpoints
- [x] Rate limiting enabled
- [x] Error messages generic (no info disclosure)
- [x] Passwords never returned
- [x] CORS configured
- [x] Security headers sent
- [x] HTTPS ready
- [x] Token expiration
- [x] SQL injection prevention
- [x] XSS prevention

---

## Testing the API

### Using Postman
1. Create new request
2. Set method to POST
3. URL: `http://localhost:3000/api/auth/login`
4. Body (JSON):
```json
{
  "email": "admin@example.com",
  "password": "Admin@12345"
}
```
5. Send → Copy token
6. Set Authorization type to "Bearer Token"
7. Paste token
8. Test protected endpoints

### Using curl
```bash
# Get health
curl http://localhost:3000/api/health

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@12345"}'

# Get users (with token)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:3000/api/auth/users
```

---

## Support & Documentation

- **Quick Start:** See QUICK_START_GUIDE.md
- **Testing:** See TESTING_GUIDE.md
- **Security:** See SECURITY_BEST_PRACTICES.md
- **Threats:** See STRIDE_Threat_Model.md
- **Risks:** See DREAD_Risk_Assessment.md

---

**API Version:** 1.0
**Last Updated:** January 17, 2026
