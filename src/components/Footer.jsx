import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HolidazeLogo from '../Assets/Images/Holidaze_logo.png';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <img src={HolidazeLogo} alt="Holidaze_logo" style={{ height: '30px', width: 'auto' }} />
            <p>Discover your next adventure with us.</p>
          </Col>         
          <Col md={4}>
            <h5 className="text-warning">Contact Us</h5>
            <p>Email: Holidaze@NotRealEmail.cøm</p>
            <p>Address: 123 Holidaze Street, Holidaze City</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Holidaze. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
