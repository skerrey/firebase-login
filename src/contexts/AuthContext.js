import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) { // Signup
    return auth.createUserWithEmailAndPassword(email, password);
  };

  function login(email, password) { // Login
    return auth.signInWithEmailAndPassword(email, password); // Change this function to log into server (firebase alternative)
  };

  function logout() { // Logout
    return auth.signOut();
  }

  function resetPassword(email) { // Reset password
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) { // Update email
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) { // Update password
    return currentUser.updatePassword(password);
  }

  useEffect(() => { // set user on mount
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
