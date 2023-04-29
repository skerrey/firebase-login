// Description: This is the main component of the application. It is the parent component of all other components. 

import Navigation from "./Navigation";
import Background from "./Background";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import components
import Dashboard from './Dashboard';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute  from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';

function App() {
  return (
    <>
      <Background />
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
            <Route path="/settings" element={<PrivateRoute><UpdateProfile /></PrivateRoute>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
