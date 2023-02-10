import React from 'react';
import AuthProvider from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute  from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';


export default function ProjectRoutes() {
  return (
    <Router>  
      <div className="container w-100 d-flex justify-content-center align-items-center" style={{
        minHeight: '100vh',
      }}>
        <div className="w-100" style={{
          maxWidth: '400px',
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
