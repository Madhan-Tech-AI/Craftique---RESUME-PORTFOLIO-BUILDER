import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ResumeTemplateProps {
  data: ResumeData;
  darkMode?: boolean;
  customization?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontSize?: string;
    fontFamily?: string;
  };
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ 
  data, 
  darkMode = false,
  customization = {
    primaryColor: '#64748b',
    secondaryColor: '#0ea5e9',
    fontSize: '14px',
    fontFamily: 'Inter'
  }
}) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  const styles = {
    '--primary-color': customization.primaryColor || '#64748b',
    '--secondary-color': customization.secondaryColor || '#0ea5e9',
    '--font-size': customization.fontSize || '14px',
    '--font-family': customization.fontFamily || 'Inter'
  } as React.CSSProperties;

  return (
    <div 
      className="resume-template bg-white text-gray-900 p-6 shadow-lg max-w-[8.5in] mx-auto min-h-[11in]"
      style={styles}
    >
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: 'var(--primary-color)' }}>
        <h1 
          className="text-2xl font-bold mb-3"
          style={{ 
            color: 'var(--primary-color)',
            fontFamily: 'var(--font-family)',
            fontSize: '28px'
          }}
        >
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-3 text-xs text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: 'var(--secondary-color)' }} />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: 'var(--secondary-color)' }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: 'var(--secondary-color)' }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-3 mt-2 text-xs">
          {personalInfo.linkedIn && (
            <a 
              href={personalInfo.linkedIn} 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3 w-3" />
              <span>GitHub</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a 
              href={personalInfo.portfolio} 
              className="flex items-center gap-1 hover:underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-3 w-3" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </header>

      {/* Objective */}
      {personalInfo.objective && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            OBJECTIVE
          </h2>
          <p className="text-xs leading-relaxed text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
            {personalInfo.objective}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-1">
            {skills.map((skill, index) => (
              <div key={index} className="text-xs" style={{ fontFamily: 'var(--font-family)' }}>
                <span className="font-medium text-gray-900">{skill.category}:</span>{' '}
                <span className="text-gray-800">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                    {exp.title}
                  </h3>
                  <span className="text-gray-700 font-medium text-right" style={{ fontFamily: 'var(--font-family)' }}>
                    {exp.duration}
                  </span>
                </div>
                <p className="font-medium mb-2" style={{ color: 'var(--secondary-color)', fontFamily: 'var(--font-family)' }}>
                  {exp.company}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-family)' }}>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            PROJECTS
          </h2>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="text-xs">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                    {project.title}
                    {project.technologies && (
                      <span className="font-normal text-gray-700 ml-1">
                        ({project.technologies})
                      </span>
                    )}
                  </h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-xs hover:underline"
                      style={{ color: 'var(--secondary-color)' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed" style={{ fontFamily: 'var(--font-family)' }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            EDUCATION
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                      {edu.degree}
                    </h3>
                    <p className="text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-gray-700 font-medium" style={{ fontFamily: 'var(--font-family)' }}>
                    {edu.duration}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-800 mt-1" style={{ fontFamily: 'var(--font-family)' }}>
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            CERTIFICATIONS
          </h2>
          <div className="space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-xs flex justify-between items-center">
                <div style={{ fontFamily: 'var(--font-family)' }}>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-gray-700"> - {cert.issuer}</span>
                </div>
                <span className="text-gray-700 font-medium" style={{ fontFamily: 'var(--font-family)' }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-4">
          <h2 
            className="text-sm font-semibold mb-2 pb-1 border-b uppercase tracking-wide"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)'
            }}
          >
            ADDITIONAL INFORMATION
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-xs">
                <h3 className="font-semibold mb-1 text-gray-900" style={{ fontFamily: 'var(--font-family)' }}>
                  {achievement.title}
                </h3>
                <p className="text-gray-800" style={{ fontFamily: 'var(--font-family)' }}>
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ResumeTemplate;
