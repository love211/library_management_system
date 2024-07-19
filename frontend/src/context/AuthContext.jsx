// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login } from '../services/apis';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = async (email, password) => {
    const res = await login(email, password);
    const userData = {
      role: res.data.user_role,
      token: res.meta.token,
      name: res.data.name,
      email: res.data.email,
      phone: res.data.phone_number,
      address: res.data.address,
      id: res.data.id,
    }

    localStorage.setItem( "token", JSON.stringify(userData) );
    localStorage.setItem( "userData", JSON.stringify(userData) );
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
