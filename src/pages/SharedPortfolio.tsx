import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSharedPortfolio, PortfolioShareData } from '../utils/portfolioSharing';
import PortfolioPage from '../components/portfolio/PortfolioPage';
import { ResumeProvider } from '../contexts/ResumeContext';

const SharedPortfolio: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [portfolioData, setPortfolioData] = useState<PortfolioShareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (slug) {
      const data = getSharedPortfolio(slug);
      setPortfolioData(data);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Portfolio Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The portfolio you're looking for doesn't exist or has been removed.
          </p>
          <a
            href="/"
            className="bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  // Create a mock resume context with the shared portfolio data
  const mockResumeContext = {
    resumeData: portfolioData.resumeData,
    updateResumeData: () => {},
    resetResumeData: () => {}
  };

  return (
    <ResumeProvider value={mockResumeContext}>
      <PortfolioPage darkMode={darkMode} setDarkMode={setDarkMode} />
    </ResumeProvider>
  );
};

export default SharedPortfolio;
