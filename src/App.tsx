import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ResumeProvider } from './contexts/ResumeContext';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './pages/Dashboard';
import ResumeBuilder from './pages/ResumeBuilder';
import PortfolioViewer from './pages/PortfolioViewer';
import SharedPortfolio from './pages/SharedPortfolio';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('craftique-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('craftique-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
              <Routes>
                {/* Public routes */}
                <Route
                  path="/"
                  element={
                    <>
                      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                      <Home />
                    </>
                  }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected routes with navbar */}
                <Route
                  path="/dashboard"
                  element={
                    <>
                      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                      <Dashboard />
                    </>
                  }
                />
                <Route
                  path="/resume-builder"
                  element={
                    <>
                      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                      <ResumeBuilder />
                    </>
                  }
                />
                
                {/* Portfolio route without navbar for clean presentation */}
                <Route
                  path="/portfolio"
                  element={<PortfolioViewer darkMode={darkMode} setDarkMode={setDarkMode} />}
                />
                
                {/* Shared Portfolio route */}
                <Route
                  path="/portfolio/:slug"
                  element={<SharedPortfolio />}
                />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
