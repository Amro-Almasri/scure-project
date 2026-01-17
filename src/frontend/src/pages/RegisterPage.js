import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState(null);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLocalError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Client-side validation
    if (!formData.username.trim()) {
      setLocalError('Username is required');
      return;
    }
    if (!formData.email.trim()) {
      setLocalError('Email is required');
      return;
    }
    if (!formData.password) {
      setLocalError('Password is required');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setLocalError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(
      formData.username,
      formData.email,
      formData.password,
      formData.confirmPassword
    );

    if (result.success) {
      navigate('/dashboard');
    } else {
      setLocalError(result.error);
    }

    setLoading(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card className="w-100" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>

          {(error || localError) && <Alert variant="danger">{error || localError}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                3-30 characters, letters, numbers, underscore, hyphen only
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Text className="text-muted">
                Min 8 chars: uppercase, lowercase, number, special char (!@#$%)
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form>

          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegisterPage;
