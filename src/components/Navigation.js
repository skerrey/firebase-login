// Description: Navigation component

import React, { useState} from 'react';
import { 
  Container, Nav, Navbar, NavDropdown
} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { IoMdSettings } from "react-icons/io";

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
      <Navbar bg="light" fixed="top" expand={expand}>
        <Container>
          <Navbar.Brand href="/">Firebase Login</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="ms-auto" align="end">
              <Nav.Link href="/">Home</Nav.Link>

              {!currentUser ? 
                <Nav.Link href="/login">Login</Nav.Link> :               
                <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings <IoMdSettings /> </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              }

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
