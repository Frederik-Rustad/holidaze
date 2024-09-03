import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    const query = e.target.search.value;
    if (query) {
      navigate(`/venues?search=${query}`);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/" >
        <h2 className="text-warning">Holidaze</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/venues">
            Venues
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register">
            Register
          </Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSearch}>
          <FormControl
            type="search"
            placeholder="Search venues"
            className="me-2"
            aria-label="Search"
            name="search"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
