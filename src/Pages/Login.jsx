import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate(); 

  const handleRoleChange = (role) => {
    setIsAdmin(role === 'admin');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        const accessToken = result.data.accessToken;        
        localStorage.setItem('accessToken', accessToken);
        console.log('Login successful!', result);

        // Redirect user based on role (optional)
        if (isAdmin) {
          navigate('/admin-dashboard'); //make admin dashboard page / profile page for admin
        } else {
          navigate('/Venues'); 
        }
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please try again.');
    }
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
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
