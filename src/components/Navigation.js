// Description: Navigation component

import React, { useState} from 'react';
import { 
  Container, Nav, Navbar, NavDropdown
} from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const { currentUser } = useAuth();


  return (
    <>
      <Navbar fixed="top" bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home  </Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              {/* <NavDropdown title="title" id="basic-nav-dropdown"> */}
              <NavDropdown title={currentUser ? currentUser.email : "Login"} id="basic-nav-dropdown">
              {/* <NavDropdown title={JSON.stringify(auth.userEmail).slice(1, -1)} id="basic-nav-dropdown"> */}
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
