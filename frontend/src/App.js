import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import BookDetails from './components/BookDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GoToTopButton from './components/GoToTopButton';
import Home from './components/Home';
import NotFound from './components/NotFound';


const ProtectedRouteWrapper = ({ element, redirectTo }) => {
  const { authToken } = useAuth();
  return authToken ? <Navigate to={redirectTo} /> : element;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Conditionally render login and signup if the user is not logged in */}
          <Route
            path="/"
            element={<ProtectedRouteWrapper element={<Home />} redirectTo="/dashboard" />}
          />
            <Route
            path="/login"
            element={<ProtectedRouteWrapper element={<LoginForm />} redirectTo="/dashboard" />}
          />

          <Route
            path="/book/:id"
            element={
              <BookDetails />
            }
          />

          {/* Protected routes for the dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        <GoToTopButton />
      </Router>
       <Footer />
    </AuthProvider>
  );
};

export default App;
