import React from 'react';
import { PersonalInfo } from '../../types';

interface AboutProps {
  personalInfo: PersonalInfo;
  darkMode?: boolean;
}

const About: React.FC<AboutProps> = ({ personalInfo, darkMode = false }) => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-slate-500 to-sky-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image Placeholder */}
          <div className="lg:order-first">
            <div className="relative">
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-slate-500 to-sky-500 rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'U'}
              </div>
              <div className="absolute inset-0 w-80 h-80 mx-auto rounded-full bg-gradient-to-br from-slate-500/20 to-sky-500/20 animate-pulse"></div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {personalInfo.fullName || 'Your Name'}
              </h3>
              <p className="text-xl text-sky-500 font-medium mb-4">Full Stack Developer</p>
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
                  <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">@</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-gray-900 dark:text-white">{personalInfo.email}</p>
                  </div>
                </div>
              )}

              {personalInfo.phone && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-gray-900 dark:text-white">{personalInfo.phone}</p>
                  </div>
                </div>
              )}

              {personalInfo.location && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">📍</span>
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
                  className="w-12 h-12 bg-slate-500 text-white rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors"
                >
                  <span className="text-lg">in</span>
                </a>
              )}
              {personalInfo.github && (
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-gray-900 transition-colors"
                >
                  <span className="text-lg">gh</span>
                </a>
              )}
              {personalInfo.portfolio && (
                <a
                  href={personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                >
                  <span className="text-lg">🌐</span>
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