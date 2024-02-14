import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../Components/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import DashboardLayout from '../dashboard/DashboardLayout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* PrivateRoute inside the dashboard route */}
          <Route index element={<PrivateRoute component={Dashboard} />} />
        </Route>
        {/* Other routes */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
