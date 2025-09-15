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
    '--font-family': customization.fontFamily || 'Inter',
    fontSize: customization.fontSize || '14px',
    fontFamily: customization.fontFamily || 'Inter'
  } as React.CSSProperties;

  return (
    <div 
      className="resume-template bg-white text-gray-900 p-8 shadow-lg w-[8.5in] mx-auto min-h-[11in] print:p-6 print:shadow-none"
      style={styles}
    >
      {/* Header */}
      <header className="text-center mb-6 pb-4 border-b-2 print:mb-4" style={{ borderColor: 'var(--primary-color)' }}>
        <h1 
          className="text-3xl font-bold mb-4 print:text-2xl print:mb-3"
          style={{ 
            color: 'var(--primary-color)',
            fontFamily: 'var(--font-family)',
            fontSize: customization.fontSize === '12px' ? '24px' : customization.fontSize === '16px' ? '32px' : '28px'
          }}
        >
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-gray-700 print:gap-3" style={{ fontSize: 'calc(var(--font-size) * 0.85)' }}>
          {personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 print:h-3 print:w-3" style={{ color: 'var(--secondary-color)' }} />
              <span style={{ fontFamily: 'var(--font-family)' }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 print:h-3 print:w-3" style={{ color: 'var(--secondary-color)' }} />
              <span style={{ fontFamily: 'var(--font-family)' }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 print:h-3 print:w-3" style={{ color: 'var(--secondary-color)' }} />
              <span style={{ fontFamily: 'var(--font-family)' }}>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mt-3 print:gap-3 print:mt-2" style={{ fontSize: 'calc(var(--font-size) * 0.85)' }}>
          {personalInfo.linkedIn && (
            <a 
              href={personalInfo.linkedIn} 
              className="flex items-center gap-2 hover:underline print:no-underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4 print:h-3 print:w-3" />
              <span style={{ fontFamily: 'var(--font-family)' }}>LinkedIn</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              className="flex items-center gap-2 hover:underline print:no-underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 print:h-3 print:w-3" />
              <span style={{ fontFamily: 'var(--font-family)' }}>GitHub</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a 
              href={personalInfo.portfolio} 
              className="flex items-center gap-2 hover:underline print:no-underline"
              style={{ color: 'var(--secondary-color)' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4 print:h-3 print:w-3" />
              <span style={{ fontFamily: 'var(--font-family)' }}>Portfolio</span>
            </a>
          )}
        </div>
      </header>

      {/* Objective */}
      {personalInfo.objective && (
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            OBJECTIVE
          </h2>
          <p className="leading-relaxed text-gray-800" style={{ 
            fontFamily: 'var(--font-family)',
            fontSize: 'var(--font-size)',
            lineHeight: '1.5'
          }}>
            {personalInfo.objective}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-2 print:space-y-1">
            {skills.map((skill, index) => (
              <div key={index} style={{ 
                fontFamily: 'var(--font-family)',
                fontSize: 'var(--font-size)'
              }}>
                <span className="font-medium text-gray-900">{skill.category}:</span>{' '}
                <span className="text-gray-800">{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4 print:space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900" style={{ 
                    fontFamily: 'var(--font-family)',
                    fontSize: 'calc(var(--font-size) * 1.05)'
                  }}>
                    {exp.title}
                  </h3>
                  <span className="text-gray-700 font-medium text-right whitespace-nowrap ml-4" style={{ 
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-size)'
                  }}>
                    {exp.duration}
                  </span>
                </div>
                <p className="font-medium mb-2" style={{ 
                  color: 'var(--secondary-color)', 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size)'
                }}>
                  {exp.company}
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 print:ml-2">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-800 leading-relaxed" style={{ 
                      fontFamily: 'var(--font-family)',
                      fontSize: 'var(--font-size)',
                      lineHeight: '1.4'
                    }}>
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
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            PROJECTS
          </h2>
          <div className="space-y-3 print:space-y-2">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900" style={{ 
                    fontFamily: 'var(--font-family)',
                    fontSize: 'calc(var(--font-size) * 1.05)'
                  }}>
                    {project.title}
                    {project.technologies && (
                      <span className="font-normal text-gray-700 ml-2">
                        ({project.technologies})
                      </span>
                    )}
                  </h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="hover:underline print:no-underline whitespace-nowrap ml-4"
                      style={{ 
                        color: 'var(--secondary-color)',
                        fontSize: 'calc(var(--font-size) * 0.9)'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed" style={{ 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size)',
                  lineHeight: '1.4'
                }}>
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            EDUCATION
          </h2>
          <div className="space-y-3 print:space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ 
                      fontFamily: 'var(--font-family)',
                      fontSize: 'calc(var(--font-size) * 1.05)'
                    }}>
                      {edu.degree}
                    </h3>
                    <p className="text-gray-800" style={{ 
                      fontFamily: 'var(--font-family)',
                      fontSize: 'var(--font-size)'
                    }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-gray-700 font-medium whitespace-nowrap ml-4" style={{ 
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-size)'
                  }}>
                    {edu.duration}
                  </span>
                </div>
                {edu.description && (
                  <p className="text-gray-800 mt-1" style={{ 
                    fontFamily: 'var(--font-family)',
                    fontSize: 'var(--font-size)'
                  }}>
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
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            CERTIFICATIONS
          </h2>
          <div className="space-y-2 print:space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-center">
                <div style={{ 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size)'
                }}>
                  <span className="font-medium text-gray-900">{cert.name}</span>
                  <span className="text-gray-700"> - {cert.issuer}</span>
                </div>
                <span className="text-gray-700 font-medium whitespace-nowrap ml-4" style={{ 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size)'
                }}>
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-5 print:mb-4">
          <h2 
            className="font-semibold mb-3 pb-1 border-b uppercase tracking-wide print:mb-2"
            style={{ 
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              fontFamily: 'var(--font-family)',
              fontSize: 'calc(var(--font-size) * 1.1)'
            }}
          >
            ADDITIONAL INFORMATION
          </h2>
          <div className="space-y-3 print:space-y-2">
            {achievements.map((achievement) => (
              <div key={achievement.id}>
                <h3 className="font-semibold mb-1 text-gray-900" style={{ 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'calc(var(--font-size) * 1.05)'
                }}>
                  {achievement.title}
                </h3>
                <p className="text-gray-800" style={{ 
                  fontFamily: 'var(--font-family)',
                  fontSize: 'var(--font-size)',
                  lineHeight: '1.4'
                }}>
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
