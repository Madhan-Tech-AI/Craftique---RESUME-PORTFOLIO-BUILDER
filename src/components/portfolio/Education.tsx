import React from 'react';
import { Education as EducationType } from '../../types';

interface EducationProps {
  education: EducationType[];
  darkMode?: boolean;
}

const Education: React.FC<EducationProps> = ({ education, darkMode = false }) => {
  if (education.length === 0) return null;

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Education</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-slate-500 to-sky-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-sky-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">🎓</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-gray-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium mt-2 md:mt-0">
                      {edu.duration}
                    </span>
                  </div>
                  
                  <p className="text-sky-500 font-medium mb-3">
                    {edu.institution}
                  </p>
                  
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;