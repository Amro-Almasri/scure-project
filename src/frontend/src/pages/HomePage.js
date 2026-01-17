import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Container className="py-5">
      <div className="text-center">
        <h1 className="display-4 mb-4">🔐 Secure Web Application</h1>
        
        <Alert variant="info" className="mb-4">
          <h4>Welcome!</h4>
          <p>
            This application demonstrates secure coding practices and SSDLC principles.
          </p>
          <p>
            <strong>Implemented Security Features:</strong>
          </p>
          <ul className="text-start d-inline-block">
            <li>STRIDE Threat Modeling</li>
            <li>DREAD Risk Assessment</li>
            <li>JWT Authentication</li>
            <li>Password Hashing (bcryptjs)</li>
            <li>Input Validation & Sanitization</li>
            <li>Rate Limiting</li>
            <li>Role-Based Access Control (RBAC)</li>
            <li>Secure HTTP Headers</li>
          </ul>
        </Alert>

        <div className="mt-5">
          <Link to="/register" className="btn btn-primary btn-lg mx-2">
            Get Started - Register
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg mx-2">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
