import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
