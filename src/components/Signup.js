// Description: Signup component

import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, updateInfo } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();



  async function handleSubmit(e) { // signup user on submit
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) { // check if passwords match
      return setError('Passwords do not match')
    }

    const name = firstNameRef.current.value + " " + lastNameRef.current.value;

    // Capitalize first letter of first and last name upon signup
    const capitalize = (name) => {
      return name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };

    try { // try to signup user
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await updateInfo(capitalize(name));
      navigate('/');
    } catch (e) {
      setError('Failed to create an account');
      console.log(e);
    }
    setLoading(false);
  }


  return (
    <>
      <div className="parent-container">
        <div className="child-container">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="first-name">
                  <Form.Label data-testid="first-name-label">First Name</Form.Label>
                  <Form.Control data-testid="first-name-input" type="text" ref={firstNameRef} required />
                </Form.Group>
                <Form.Group id="last-name">
                  <Form.Label data-testid="last-name-label">Last Name</Form.Label>
                  <Form.Control data-testid="last-name-input" type="text" ref={lastNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label data-testid="email-label">Email</Form.Label>
                  <Form.Control data-testid="email-input" type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="my-2">
                  <Form.Label data-testid="password-label">Password</Form.Label>
                  <Form.Control data-testid="password-input" type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label data-testid="password-confirm-label">Password Confirmation</Form.Label>
                  <Form.Control data-testid="password-confirm-input" type="password" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-3" type="submit">
                  Sign Up
                </Button>
                <div className="w-100 text-center mt-3">
                  Already have an account? <Link to="/login">Log In</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div> 
      </div>
    </>
  )
}
