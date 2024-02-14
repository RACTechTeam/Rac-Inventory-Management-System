// PrivateRoute.jsx
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');

  return isAuthenticated ? (
    <Route {...rest} element={<Dashboard />} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
