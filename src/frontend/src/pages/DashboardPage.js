import React from 'react';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h3>Welcome to Your Dashboard</h3>
            </Card.Header>
            <Card.Body>
              <Alert variant="success">
                ✅ You are successfully logged in!
              </Alert>

              <h5>Your Profile</h5>
              <table className="table">
                <tbody>
                  <tr>
                    <td><strong>Username:</strong></td>
                    <td>{user?.username}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{user?.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Role:</strong></td>
                    <td>
                      <span className={`badge bg-${user?.role === 'admin' ? 'danger' : 'info'}`}>
                        {user?.role}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>User ID:</strong></td>
                    <td><code>{user?.id}</code></td>
                  </tr>
                </tbody>
              </table>

              <hr />

              <h5>Security Features Implemented</h5>
              <ul>
                <li>✅ Password hashing with bcryptjs</li>
                <li>✅ JWT token authentication</li>
                <li>✅ Input validation & sanitization</li>
                <li>✅ Rate limiting (5 login attempts/15 min)</li>
                <li>✅ Role-based access control (RBAC)</li>
                <li>✅ Secure HTTP headers (Helmet.js)</li>
                <li>✅ CORS configuration</li>
                <li>✅ MongoDB encryption ready</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
