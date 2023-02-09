// Description: This is the main component of the application. It is the parent component of all other components. 

import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute  from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{
        minHeight: "100vh"
      }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
                <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>
    </>
  );
}

export default App;
