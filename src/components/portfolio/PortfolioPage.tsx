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
import { Menu, X, Moon, Sun } from 'lucide-react';

interface PortfolioPageProps {
  darkMode?: boolean;
  setDarkMode?: (dark: boolean) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ darkMode = false, setDarkMode }) => {
  const { resumeData } = useResume();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

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

  return (
    <div className={`portfolio-page ${darkMode ? 'dark' : ''}`}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-sky-500 rounded-lg flex items-center justify-center">
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
                      ? 'bg-slate-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
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
                        ? 'bg-slate-500 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-slate-500 to-sky-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl mb-6">
              {resumeData.personalInfo.fullName?.charAt(0) || 'U'}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              {resumeData.personalInfo.fullName || 'Your Name'}
            </h1>
            <p className="text-xl md:text-2xl text-sky-500 font-medium mb-6">
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
              className="bg-gradient-to-r from-slate-500 to-sky-500 text-white px-8 py-3 rounded-lg font-medium hover:from-slate-600 hover:to-sky-600 transition-all duration-200 transform hover:-translate-y-1"
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
      <About personalInfo={resumeData.personalInfo} darkMode={darkMode} />
      <Skills skills={resumeData.skills} darkMode={darkMode} />
      <Experience experience={resumeData.experience} darkMode={darkMode} />
      <Education education={resumeData.education} darkMode={darkMode} />
      <Projects projects={resumeData.projects} darkMode={darkMode} />
      <Certifications certifications={resumeData.certifications} darkMode={darkMode} />
      <Achievements achievements={resumeData.achievements} darkMode={darkMode} />
      <Contact personalInfo={resumeData.personalInfo} darkMode={darkMode} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-slate-500 to-sky-500 rounded-lg flex items-center justify-center">
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