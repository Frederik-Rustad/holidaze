import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Venues = () => {
  // This will later be replaced with data from an API
  const venueData = [
    { id: 1, name: 'Venue One', description: 'A beautiful place to stay.', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Venue Two', description: 'An amazing resort.', image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Venue Three', description: 'Luxury at its best.', image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Venue Four', description: 'A perfect getaway.', image: 'https://via.placeholder.com/150' },
  ];

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Venues</h1>
      <Row>
        {venueData.map((venue) => (
          <Col key={venue.id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={venue.image} alt={venue.name} />
              <Card.Body>
                <Card.Title>{venue.name}</Card.Title>
                <Card.Text>{venue.description}</Card.Text>
                <Button variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Venues;
