import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Profile = () => {
  // State to hold user's booking data
  const [bookings, setBookings] = useState([]);

  // Mock data for bookings
  useEffect(() => {
    // Simulate an API call to fetch user bookings
    const mockBookings = [
      {
        id: 1,
        venue: 'Beachside Villa',
        dateFrom: '2024-09-10',
        dateTo: '2024-09-15',
        guests: '1',
      },
      {
        id: 2,
        venue: 'Mountain Cabin',
        dateFrom: '2024-10-05',
        dateTo: '2024-10-10',
        guests: '2',
      },
      {
        id: 3,
        venue: 'City Apartment',
        dateFrom: '2024-11-20',
        dateTo: '2024-11-25',
        guests: '1',
      },
    ];
    setBookings(mockBookings);
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My Bookings</h2>
      <Row className="justify-content-center">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <Col md={6} key={booking.id} className="mb-4">
              <Card bg="dark" text="white" className="h-100">
                <Card.Body>
                  <Card.Title>{booking.venue}</Card.Title>
                  <Card.Text>
                    <strong>Dates:</strong> {booking.dateFrom} to {booking.dateTo}
                  </Card.Text>
                  <Card.Text>
                    <strong>Guests:</strong> {booking.guests}
                  </Card.Text>
                  <Button variant="warning" size="sm" className="mt-2">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center text-white">You have no bookings yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default Profile;
