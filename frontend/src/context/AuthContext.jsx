import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Create AuthContext
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load auth data from sessionStorage on mount
  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("user");

    console.log("Token from sessionStorage:", token);
    console.log("User from sessionStorage:", storedUser);
  
    if (token && storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Parsed User Object:", parsedUser); // Check the structure of the user
      setUser(parsedUser);
      setIsLoggedIn(true);
      }
  }, []);
  
  // Login function
  const login = (token, userData) => {
  
    console.log("User Data before saving to sessionStorage:", userData); // Log the userData
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("user", JSON.stringify(userData)); // Store user data as stringified
    setUser(userData);
    setIsLoggedIn(true);
  };
  
  // Logout function
  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
