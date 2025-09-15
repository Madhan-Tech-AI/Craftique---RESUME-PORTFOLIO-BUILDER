import React, { useState, useEffect } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import About from './About';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Projects from './Projects';
import Certifications from './Certifications';
import Achievements from './Achievements';
import Contact from './Contact';
import { Menu, X, Moon, Sun, Share2, Download, Palette } from 'lucide-react';

interface PortfolioPageProps {
  darkMode?: boolean;
  setDarkMode?: (dark: boolean) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ darkMode = false, setDarkMode }) => {
  const { resumeData } = useResume();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [showCustomization, setShowCustomization] = useState(false);
  const [portfolioTheme, setPortfolioTheme] = useState({
    primaryColor: '#64748b',
    secondaryColor: '#0ea5e9',
    accentColor: '#10b981'
  });

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  // Handle scroll spy for navigation
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const sharePortfolio = async () => {
    const portfolioUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.fullName}'s Portfolio`,
          text: 'Check out my professional portfolio',
          url: portfolioUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(portfolioUrl);
        alert('Portfolio link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const exportPortfolio = async () => {
    try {
      const { generatePortfolioPDF } = await import('../../utils/pdfGenerator');
      const portfolioElement = document.getElementById('portfolio-content');
      if (portfolioElement) {
        await generatePortfolioPDF(portfolioElement, resumeData.personalInfo);
      }
    } catch (error) {
      console.error('Error exporting portfolio:', error);
      alert('Error exporting portfolio. Please try again.');
    }
  };

  const colorThemes = [
    { name: 'Professional', primary: '#64748b', secondary: '#0ea5e9', accent: '#10b981' },
    { name: 'Modern', primary: '#1e40af', secondary: '#3b82f6', accent: '#8b5cf6' },
    { name: 'Creative', primary: '#7c3aed', secondary: '#a855f7', accent: '#ec4899' },
    { name: 'Nature', primary: '#059669', secondary: '#10b981', accent: '#f59e0b' },
    { name: 'Sunset', primary: '#ea580c', secondary: '#f97316', accent: '#ef4444' },
    { name: 'Ocean', primary: '#0891b2', secondary: '#06b6d4', accent: '#3b82f6' }
  ];

  return (
    <div className={`portfolio-page ${darkMode ? 'dark' : ''}`} id="portfolio-content">
      <style jsx>{`
        :root {
          --portfolio-primary: ${portfolioTheme.primaryColor};
          --portfolio-secondary: ${portfolioTheme.secondaryColor};
          --portfolio-accent: ${portfolioTheme.accentColor};
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${portfolioTheme.primaryColor}, ${portfolioTheme.secondaryColor})` }}
              >
                <span className="text-white font-bold text-sm">
                  {resumeData.personalInfo.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {resumeData.personalInfo.fullName || 'Portfolio'}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  style={activeSection === item.id ? { backgroundColor: portfolioTheme.primaryColor } : {}}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Customize Theme"
              >
                <Palette className="h-5 w-5" />
              </button>
              
              <button
                onClick={sharePortfolio}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Share Portfolio"
              >
                <Share2 className="h-5 w-5" />
              </button>

              <button
                onClick={exportPortfolio}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Export as PDF"
              >
                <Download className="h-5 w-5" />
              </button>

              {setDarkMode && (
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              )}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-2">
              <div className="flex flex-col space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-2 text-left rounded-lg text-sm font-medium transition-colors ${
                      activeSection === item.id
                        ? 'text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    style={activeSection === item.id ? { backgroundColor: portfolioTheme.primaryColor } : {}}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Customization Panel */}
      {showCustomization && (
        <div className="fixed top-16 right-4 z-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 w-80">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Customize Portfolio</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorThemes.map((theme, index) => (
                  <button
                    key={index}
                    onClick={() => setPortfolioTheme({
                      primaryColor: theme.primary,
                      secondaryColor: theme.secondary,
                      accentColor: theme.accent
                    })}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: theme.primary }}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: theme.secondary }}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: theme.accent }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {theme.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Primary Color
                </label>
                <input
                  type="color"
                  value={portfolioTheme.primaryColor}
                  onChange={(e) => setPortfolioTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Secondary Color
                </label>
                <input
                  type="color"
                  value={portfolioTheme.secondaryColor}
                  onChange={(e) => setPortfolioTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Accent Color
                </label>
                <input
                  type="color"
                  value={portfolioTheme.accentColor}
                  onChange={(e) => setPortfolioTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                  className="w-full h-8 rounded border border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            background: `linear-gradient(135deg, ${portfolioTheme.primaryColor}, ${portfolioTheme.secondaryColor}, ${portfolioTheme.accentColor})`
          }}
        ></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div 
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl mb-6"
              style={{
                background: `linear-gradient(135deg, ${portfolioTheme.primaryColor}, ${portfolioTheme.secondaryColor})`
              }}
            >
              {resumeData.personalInfo.fullName?.charAt(0) || 'U'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <p 
              className="text-xl md:text-2xl font-medium mb-6"
              style={{ color: portfolioTheme.secondaryColor }}
            >
              Full Stack Developer & Designer
            </p>
            {resumeData.personalInfo.objective && (
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                {resumeData.personalInfo.objective}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-1"
              style={{
                background: `linear-gradient(135deg, ${portfolioTheme.primaryColor}, ${portfolioTheme.secondaryColor})`
              }}
            >
              Get In Touch
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              View Projects
            </button>
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <About personalInfo={resumeData.personalInfo} darkMode={darkMode} theme={portfolioTheme} />
      <Skills skills={resumeData.skills} darkMode={darkMode} theme={portfolioTheme} />
      <Experience experience={resumeData.experience} darkMode={darkMode} theme={portfolioTheme} />
      <Education education={resumeData.education} darkMode={darkMode} theme={portfolioTheme} />
      <Projects projects={resumeData.projects} darkMode={darkMode} theme={portfolioTheme} />
      <Certifications certifications={resumeData.certifications} darkMode={darkMode} theme={portfolioTheme} />
      <Achievements achievements={resumeData.achievements} darkMode={darkMode} theme={portfolioTheme} />
      <Contact personalInfo={resumeData.personalInfo} darkMode={darkMode} theme={portfolioTheme} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${portfolioTheme.primaryColor}, ${portfolioTheme.secondaryColor})`
                }}
              >
                <span className="text-white font-bold text-sm">
                  {resumeData.personalInfo.fullName?.charAt(0) || 'U'}
                </span>
              </div>
              <span className="text-xl font-bold">
                {resumeData.personalInfo.fullName || 'Portfolio'}
              </span>
            </div>
            <p className="text-gray-400 mb-6">
              Built with Craftique - Smart Resume & Portfolio Builder
            </p>
            <div className="flex justify-center space-x-4">
              {resumeData.personalInfo.linkedIn && (
                <a
                  href={resumeData.personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              )}
              {resumeData.personalInfo.github && (
                <a
                  href={resumeData.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              )}
              {resumeData.personalInfo.portfolio && (
                <a
                  href={resumeData.personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioPage;
