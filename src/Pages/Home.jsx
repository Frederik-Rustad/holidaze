import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center text-center">
        <Col lg={8} md={10}>
          <h1 className="display-4">Welcome to Holidaze!</h1>
          <p className="lead mt-4">
            Your one-stop solution for finding the best holiday destinations around the world.
            Discover beautiful places, plan your trip, and book your stay with us!
          </p>
          <Button variant="dark" size="lg" className="btn btn-outline-warning">
  <Link to="/Venues" style={{ textDecoration: 'none', color: 'inherit' }}>
    Explore Destinations
  </Link>
</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={4} className="text-center">
          <h3>Handpicked Locations</h3>
          <p>Explore our curated list of top holiday destinations.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>Best Prices</h3>
          <p>Get the best deals on hotels, flights, and packages.</p>
        </Col>
        <Col md={4} className="text-center">
          <h3>24/7 Support</h3>
          <p>We're here to help you anytime, anywhere.</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
