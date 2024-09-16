import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {    
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); 
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("name");
    setIsLoggedIn(false); 
    navigate("/login"); 
  };

  return (
    <Navbar bg="dark" expand="lg" className="mb-4">
      <Navbar.Brand as={Link} to="/">
        <h2 className="text-warning">Holidaze</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/venues" className="text-white">
            Venues
          </Nav.Link>
          {isLoggedIn && (
            <Nav.Link as={Link} to="/profile" className="text-white">
              Profile
            </Nav.Link>
          )}
          {isLoggedIn ? (
            <Button variant="outline-warning" onClick={handleLogout} className="ms-2">
              Logout
            </Button>
          ) : (
            <Nav.Link as={Link} to="/login" className="text-white">
              Login
            </Nav.Link>
          )}
        </Nav>      
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
