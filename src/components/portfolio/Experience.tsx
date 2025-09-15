import React from 'react';
import { Experience as ExperienceType } from '../../types';

interface ExperienceProps {
  experience: ExperienceType[];
  darkMode?: boolean;
}

const Experience: React.FC<ExperienceProps> = ({ experience, darkMode = false }) => {
  if (experience.length === 0) return null;

  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Professional Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-slate-500 to-sky-500 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-slate-500 to-sky-500"></div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-slate-500 to-sky-500 rounded-full border-4 border-white dark:border-gray-900"></div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-sky-500 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium mt-2 md:mt-0">
                      {exp.duration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {exp.responsibilities.map((responsibility, respIndex) => (
                      <div key={respIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {responsibility}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;