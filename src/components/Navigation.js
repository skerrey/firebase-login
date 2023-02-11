// Description: Navigation component

import React, { useState} from 'react';
import { 
  Container, Dropdown, Nav, Navbar, NavDropdown, Offcanvas
} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const [error, setError] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() { // logout user on click
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
    }
  }

  // Change expand to "xs, sm, md, lg, xl" for screen size
  let expand = "sm";

  return (
    <>
      <Navbar bg="light" expand={expand}>
        <Container>
          <Navbar.Brand href="/">Firebase Login</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" alginRight>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>

              {!currentUser ? 
                <Nav.Link href="/login">Login</Nav.Link> :               
                <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Navbar  bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  )
}
