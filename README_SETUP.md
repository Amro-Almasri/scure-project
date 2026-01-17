# Project Setup Instructions

## Project Structure
```
/
├── src/
│   ├── backend/           # Express.js API server
│   └── frontend/          # React.js application
├── docs/                  # Security documentation
│   ├── STRIDE_Threat_Model.md
│   └── DREAD_Risk_Assessment.md
├── scans/                 # Security scanning reports
├── .env.example           # Environment variable template
└── .gitignore             # Git ignore file
```

## Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn
- PostgreSQL (for database)
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "scure project"
```

### 2. Setup Backend
```bash
cd src/backend
npm install
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
```

### 4. Environment Configuration
```bash
# In root directory
cp .env.example .env
# Edit .env with your configuration
```

### 5. Run the Application

**Backend (Terminal 1):**
```bash
cd src/backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd src/frontend
npm start
```

## Security Features Implemented
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ JWT authentication ready
- ✅ bcryptjs for password hashing
- ✅ Input validation with validator.js
- ✅ DOMPurify for XSS prevention
- ✅ Rate limiting configured
- ✅ Environment variable management

## Next Steps
1. Implement database models and migrations
2. Create authentication routes
3. Add RBAC (Role-Based Access Control)
4. Implement input validation middleware
5. Set up security testing and scanning
