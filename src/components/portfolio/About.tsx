import React from 'react';
import { PersonalInfo } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface AboutProps {
  personalInfo: PersonalInfo;
  darkMode?: boolean;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

const About: React.FC<AboutProps> = ({ 
  personalInfo, 
  darkMode = false,
  theme = {
    primaryColor: '#64748b',
    secondaryColor: '#0ea5e9',
    accentColor: '#10b981'
  }
}) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div 
            className="w-20 h-1 mx-auto"
            style={{
              background: `linear-gradient(to right, var(--portfolio-primary, ${theme.primaryColor}), var(--portfolio-secondary, ${theme.secondaryColor}))`
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="lg:order-first">
            <div className="relative">
              <div 
                className="w-80 h-80 mx-auto rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, var(--portfolio-primary, ${theme.primaryColor}), var(--portfolio-secondary, ${theme.secondaryColor}))`
                }}
              >
                {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'U'}
              </div>
              <div 
                className="absolute inset-0 w-80 h-80 mx-auto rounded-full animate-pulse"
                style={{
                  background: `linear-gradient(135deg, var(--portfolio-primary, ${theme.primaryColor})20, var(--portfolio-secondary, ${theme.secondaryColor})20)`
                }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {personalInfo.fullName || 'Your Name'}
              </h3>
              <p className="text-xl font-medium mb-4" style={{ color: `var(--portfolio-secondary, ${theme.secondaryColor})` }}>Full Stack Developer</p>
            </div>

            {personalInfo.objective && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {personalInfo.objective}
              </p>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {personalInfo.email && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `var(--portfolio-primary, ${theme.primaryColor})` }}>
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{personalInfo.email}</p>
                  </div>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `var(--portfolio-secondary, ${theme.secondaryColor})` }}>
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{personalInfo.phone}</p>
                  </div>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: `var(--portfolio-accent, ${theme.accentColor})` }}>
                    <MapPin className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-gray-900 dark:text-white">{personalInfo.location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-6">
              {personalInfo.linkedIn && (
                <a
                  href={personalInfo.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `var(--portfolio-primary, ${theme.primaryColor})` }}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `var(--portfolio-secondary, ${theme.secondaryColor})` }}
                >
                  <Github className="h-5 w-5" />
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 text-white rounded-full flex items-center justify-center transition-colors"
                  style={{ backgroundColor: `var(--portfolio-accent, ${theme.accentColor})` }}
                >
                  <Globe className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
