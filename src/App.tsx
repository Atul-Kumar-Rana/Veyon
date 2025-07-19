import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (from localStorage or session)
    const authStatus = localStorage.getItem('veyon_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Routes>
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/dashboard" replace /> : 
                  <LandingPage onAuth={setIsAuthenticated} />
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? 
                  <Dashboard onLogout={() => setIsAuthenticated(false)} /> : 
                  <Navigate to="/" replace />
                } 
              />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;