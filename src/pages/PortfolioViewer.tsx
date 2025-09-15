import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import PortfolioPage from '../components/portfolio/PortfolioPage';
import { Navigate } from 'react-router-dom';

interface PortfolioViewerProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const PortfolioViewer: React.FC<PortfolioViewerProps> = ({ darkMode, setDarkMode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <PortfolioPage darkMode={darkMode} setDarkMode={setDarkMode} />;
};

export default PortfolioViewer;