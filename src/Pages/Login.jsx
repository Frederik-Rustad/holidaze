import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRoleChange = (role) => {
    setIsAdmin(role === 'admin');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log(`Logging in as ${isAdmin ? 'Admin' : 'User'}`);
  };

  return (
    <Container className="m-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card bg="dark" className="text-white">
            <Card.Body>
              <h2 className="text-center mb-4">{isAdmin ? 'Admin Login' : 'User Login'}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" required />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100 mt-4">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-4">
                <Button
                  variant={isAdmin ? 'outline-secondary' : 'warning'}
                  className="me-2"
                  onClick={() => handleRoleChange('user')}
                >
                  User Login
                </Button>
                <Button
                  variant={isAdmin ? 'warning' : 'outline-secondary'}
                  onClick={() => handleRoleChange('admin')}
                >
                  Admin Login
                </Button>
              </div>
              <div className="text-center mt-4">
                <Link to="/register" className="text-warning">
                  Don't have an account? Register here.
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
