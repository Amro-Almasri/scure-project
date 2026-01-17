# STRIDE Threat Model

## Overview
This document outlines the STRIDE threat model analysis for the Secure Web Application.

### STRIDE Categories
- **S**poofing: Identity spoofing or authentication bypass
- **T**ampering: Unauthorized modification of data
- **R**epudiation: Denial of actions taken
- **I**nformation Disclosure: Unauthorized access to sensitive data
- **D**enial of Service: Service unavailability
- **E**levation of Privilege: Unauthorized access to higher privileges

## Threats Identified

### Spoofing (S)
1. **Authentication Bypass** - Attacker impersonates a legitimate user
   - **Impact**: Unauthorized access to user accounts
   - **Mitigation**: JWT tokens with secure signatures, bcryptjs password hashing

2. **Session Hijacking** - Attacker steals session tokens
   - **Impact**: Account takeover
   - **Mitigation**: HTTPS only, secure HTTP-only cookies, token expiration

### Tampering (T)
1. **Data Modification in Transit** - Man-in-the-middle attacks
   - **Impact**: Corrupted or malicious data injected
   - **Mitigation**: HTTPS/TLS encryption, CORS validation

2. **Database Manipulation** - SQL injection attacks
   - **Impact**: Unauthorized data access/modification
   - **Mitigation**: Parameterized queries, input validation with validator.js

### Repudiation (R)
1. **User Denies Actions** - No audit trail of user activities
   - **Impact**: Cannot trace malicious actions
   - **Mitigation**: Comprehensive logging of user actions and API calls

### Information Disclosure (I)
1. **Sensitive Data Exposure** - PII/credentials exposed
   - **Impact**: Privacy breach, identity theft
   - **Mitigation**: AES-256 encryption for sensitive data at rest

2. **XSS Attacks** - Malicious scripts injected into pages
   - **Impact**: Session theft, phishing
   - **Mitigation**: DOMPurify sanitization, Content Security Policy (Helmet.js)

3. **Error Message Leakage** - Stack traces reveal system details
   - **Impact**: Information gathering for attackers
   - **Mitigation**: Generic error responses, secure logging

### Denial of Service (D)
1. **Brute Force Attacks** - Multiple failed login attempts
   - **Impact**: Account lockout, resource exhaustion
   - **Mitigation**: Rate limiting (express-rate-limit), account lockout mechanisms

2. **Resource Exhaustion** - Large requests overwhelming server
   - **Impact**: Service unavailability
   - **Mitigation**: Request size limits (10kb), rate limiting

### Elevation of Privilege (E)
1. **RBAC Bypass** - User accesses resources above their role
   - **Impact**: Unauthorized access to admin functions
   - **Mitigation**: Role-based access control middleware, authorization checks

2. **Privilege Escalation** - User upgrades their own role
   - **Impact**: Admin access by unauthorized users
   - **Mitigation**: Server-side role validation, prevent client-side role modification

## Mitigation Strategies

| Threat | Layer | Control | Status |
|--------|-------|---------|--------|
| Authentication Bypass | Application | JWT + bcryptjs | ✅ Implemented |
| Session Hijacking | Transport | HTTPS, HTTP-only cookies | ⏳ In Progress |
| SQL Injection | Application | Parameterized queries, input validation | ⏳ In Progress |
| Audit Trail | Application | Logging middleware | ⏳ In Progress |
| Data Encryption | Data | AES-256 for PII | ⏳ In Progress |
| XSS Prevention | Application | DOMPurify, CSP headers | ✅ Implemented |
| Brute Force | Application | Rate limiting, account lockout | ✅ Implemented |
| RBAC Bypass | Application | Authorization middleware | ⏳ In Progress |
