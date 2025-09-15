import React from 'react';
import { Skill } from '../../types';

interface SkillsProps {
  skills: Skill[];
  darkMode?: boolean;
  theme?: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
}

const Skills: React.FC<SkillsProps> = ({ 
  skills, 
  darkMode = false,
  theme = {
    primaryColor: '#64748b',
    secondaryColor: '#0ea5e9',
    accentColor: '#10b981'
  }
}) => {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Skills & Technologies</h2>
          <div 
            className="w-20 h-1 mx-auto"
            style={{
              background: `linear-gradient(to right, var(--portfolio-primary, ${theme.primaryColor}), var(--portfolio-secondary, ${theme.secondaryColor}))`
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                  style={{ background: `linear-gradient(135deg, var(--portfolio-primary, ${theme.primaryColor}), var(--portfolio-secondary, ${theme.secondaryColor}))` }}
                >
                  <span className="text-white font-bold text-lg">
                    {skillCategory.category.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {skillCategory.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillCategory.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-colors hover:text-white"
                    style={{
                      '--hover-bg': `var(--portfolio-accent, ${theme.accentColor})`
                    } as React.CSSProperties}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `var(--portfolio-accent, ${theme.accentColor})`}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
