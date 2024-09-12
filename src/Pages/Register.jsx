import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatarUrl: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      avatar: {
        url: formData.avatarUrl,
        alt: formData.name + "'s avatar",
      },
      venueManager: true, // If you want to add the user as a venue manager
    };

    if (!formData.email.endsWith('@stud.noroff.no')) {
      alert('Email must be a valid stud.noroff.no email address');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.status === 201) {
        const result = await response.json();
        console.log('Registration successful:', result);
        alert('Registration successful!');
      } else {
        const error = await response.json();
        console.error('Error registering:', error);
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Request failed:', error);
      alert('Registration failed');
    }
  };

  return (
    <Container className="m-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card bg="dark" className="text-white">
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formAvatarUrl" className="mt-3">
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="avatarUrl"
                    placeholder="Enter the URL for your avatar"
                    value={formData.avatarUrl}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100 mt-4">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
