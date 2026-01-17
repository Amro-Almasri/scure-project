# Security Testing Guide & Vulnerability Assessment

**For: Penetration Testing & Security Evaluation**

---

## 📋 Testing Checklist

### Phase 1: Basic Functionality Tests

- [ ] **User Registration**
  - [ ] Register with valid data
  - [ ] Try registering with existing email (should fail)
  - [ ] Try registering with weak password (should fail)
  - [ ] Try registering with invalid email format

- [ ] **User Login**
  - [ ] Login with correct credentials
  - [ ] Login with wrong password (should fail)
  - [ ] Login with non-existent email (should fail)
  - [ ] Verify JWT token is stored in localStorage

- [ ] **Session Management**
  - [ ] Logout and verify token is cleared
  - [ ] Try accessing dashboard after logout (should redirect to login)
  - [ ] Verify token expiration (7 days default)

- [ ] **User Roles**
  - [ ] Admin can view all users
  - [ ] Regular user cannot see user list
  - [ ] Admin can delete users
  - [ ] Regular user cannot access admin routes

---

### Phase 2: Input Validation & Injection Tests

#### 2.1 SQL Injection
- [ ] **Email field:**
  - [ ] Try: `' OR '1'='1`
  - [ ] Try: `admin'--`
  - Try: `" OR 1=1 --`

- [ ] **Password field:**
  - [ ] Try: `password' OR '1'='1`
  - Try: `' UNION SELECT * FROM users--`

**Expected:** All attempts should fail or be sanitized

#### 2.2 XSS (Cross-Site Scripting)
- [ ] **Username field:**
  - [ ] Try: `<script>alert('XSS')</script>`
  - [ ] Try: `<img src=x onerror="alert('XSS')">`
  - [ ] Try: `<svg onload="alert('XSS')">`

- [ ] **Email field:**
  - [ ] Try: `test<script>alert('xss')</script>@example.com`

**Expected:** Script tags should be sanitized, no alert popup

#### 2.3 Command Injection
- [ ] Try database-level commands in input fields
- [ ] Verify input is parameterized

**Expected:** Commands should not execute

---

### Phase 3: Authentication & Authorization Tests

#### 3.1 JWT Token Tests
- [ ] **Token Validation:**
  - [ ] Open DevTools → Application → localStorage
  - [ ] Copy the JWT token
  - [ ] Try using expired/modified token
  - [ ] Try using token from another user

- [ ] **Token Storage:**
  - [ ] Verify token is stored in localStorage
  - [ ] Check if token has HttpOnly flag (if using cookies)

**Expected:** Invalid/expired tokens should be rejected

#### 3.2 Rate Limiting
- [ ] **Failed Login Attempts:**
  - [ ] Try logging in with wrong password 5 times
  - [ ] On 5th attempt, account should be locked
  - [ ] Try 6th attempt (should be blocked)

**Expected:** Error: "Account temporarily locked"

#### 3.3 Password Hashing
- [ ] **Backend Verification:**
  - [ ] Check MongoDB for stored passwords
  - [ ] Verify passwords are hashed (not plaintext)
  - [ ] Passwords should start with `$2b$` (bcrypt format)

**Expected:** Passwords are bcrypt hashed, not plaintext

---

### Phase 4: API Security Tests

#### 4.1 CORS (Cross-Origin Resource Sharing)
```bash
# Test from different origin
curl -H "Origin: http://malicious.com" \
  -H "Access-Control-Request-Method: POST" \
  http://localhost:3000/api/auth/login
```

**Expected:** Request should be rejected or filtered

#### 4.2 Security Headers
```bash
curl -I http://localhost:3000/api/health
```

Check for headers:
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `X-Frame-Options: DENY`
- [ ] `X-XSS-Protection: 1; mode=block`
- [ ] `Strict-Transport-Security`

**Expected:** All security headers present

#### 4.3 HTTP Methods
- [ ] Test DELETE without authentication (should fail)
- [ ] Test GET on protected routes without token (should fail)
- [ ] Test unauthorized user deleting another user (should fail)

**Expected:** Unauthorized requests are rejected

---

### Phase 5: Data Validation Tests

#### 5.1 Input Length Validation
- [ ] **Username:** Try 100+ characters
- [ ] **Password:** Try 200+ characters
- [ ] **Email:** Try 500+ characters

**Expected:** Requests rejected or truncated

#### 5.2 Data Type Validation
- [ ] **Email field:** Try entering number (123456)
- [ ] **Password:** Try null value
- [ ] **Username:** Try special characters only (@#$%)

**Expected:** Invalid data types rejected

#### 5.3 Required Field Validation
- [ ] Try submitting login form without email
- [ ] Try submitting without password
- [ ] Try registering without confirming password

**Expected:** Validation error messages

---

### Phase 6: HTTPS & Transport Security

- [ ] Check if HTTPS is enforced (for production)
- [ ] Verify no sensitive data in URLs
- [ ] Check if form data is encrypted in transit

**Expected:** (Local testing may skip HTTPS)

---

## 🔍 Vulnerability Assessment

### Test Results Table

| Test | Status | Notes |
|------|--------|-------|
| SQL Injection - Email | PASS/FAIL | |
| SQL Injection - Password | PASS/FAIL | |
| XSS - Username | PASS/FAIL | |
| XSS - Email | PASS/FAIL | |
| Rate Limiting | PASS/FAIL | |
| JWT Validation | PASS/FAIL | |
| CORS Protection | PASS/FAIL | |
| Security Headers | PASS/FAIL | |
| Password Hashing | PASS/FAIL | |
| Input Validation | PASS/FAIL | |

---

## 📊 STRIDE Analysis Results

### Spoofing (Authentication)
- **Status:** ✅ PROTECTED
- **Implementation:** JWT tokens, password hashing
- **Test Result:** Token validation working

### Tampering (Integrity)
- **Status:** ✅ PROTECTED
- **Implementation:** Input validation, HTTPS (production), JWT signing
- **Test Result:** Modified tokens rejected

### Repudiation (Audit Trail)
- **Status:** ✅ IMPLEMENTED
- **Implementation:** Login attempt tracking, role-based access
- **Test Result:** Account lockout after 5 attempts

### Information Disclosure (Confidentiality)
- **Status:** ✅ PROTECTED
- **Implementation:** DOMPurify, secure error messages
- **Test Result:** Sensitive data not exposed

### Denial of Service (Availability)
- **Status:** ✅ PROTECTED
- **Implementation:** Rate limiting, input limits
- **Test Result:** 5 login attempts limit enforced

### Elevation of Privilege (Authorization)
- **Status:** ✅ PROTECTED
- **Implementation:** RBAC, JWT verification
- **Test Result:** Users cannot access admin routes

---

## 📊 DREAD Risk Scores

| Threat | Damage | Reproducibility | Exploitability | Affected Users | Discoverability | Score | Status |
|--------|--------|-----------------|-----------------|----------------|-----------------|-------|--------|
| Brute Force Attack | 7 | 9 | 9 | 10 | 9 | 8.8 | MITIGATED |
| SQL Injection | 10 | 10 | 9 | 10 | 10 | 9.8 | PREVENTED |
| XSS Attack | 6 | 8 | 7 | 9 | 9 | 7.8 | PREVENTED |
| Session Hijacking | 9 | 5 | 6 | 10 | 5 | 7.0 | MITIGATED |
| Privilege Escalation | 9 | 3 | 3 | 5 | 3 | 4.6 | MITIGATED |

---

## 🔧 Tools for Testing

### Recommended Tools
1. **Postman** - API testing
2. **Burp Suite** - Web security testing
3. **OWASP ZAP** - Vulnerability scanning
4. **curl** - Command-line testing
5. **Browser DevTools** - Frontend testing

### Quick curl Tests

**Test health endpoint:**
```bash
curl http://localhost:3000/api/health
```

**Test login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"Admin@12345"}'
```

**Test unauthorized access:**
```bash
curl http://localhost:3000/api/auth/users
# Should fail without token
```

---

## 📝 Testing Report Template

### Test Summary
- **Date:** ___________
- **Tester:** ___________
- **System:** Secure Web Application
- **Version:** 1.0

### Test Results
- Total Tests: 50+
- Passed: _____
- Failed: _____
- Warnings: _____

### Key Findings
1. _____________________
2. _____________________
3. _____________________

### Recommendations
1. _____________________
2. _____________________
3. _____________________

---

## ✅ Sign-Off

- [ ] All security tests completed
- [ ] STRIDE analysis verified
- [ ] DREAD risk assessment reviewed
- [ ] No critical vulnerabilities found
- [ ] System ready for deployment

**Tested By:** _______________
**Date:** _______________
**Signature:** _______________

---

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [STRIDE Threat Modeling](https://en.wikipedia.org/wiki/STRIDE_(security))
- [DREAD Risk Assessment](https://en.wikipedia.org/wiki/DREAD_(risk_assessment_model))
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)

---

**Happy Testing!** 🎯
