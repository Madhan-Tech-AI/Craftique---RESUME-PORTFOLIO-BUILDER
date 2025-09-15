import React from 'react';
import { ResumeData } from '../../types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ResumeTemplateProps {
  data: ResumeData;
  darkMode?: boolean;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({ data, darkMode = false }) => {
  const { personalInfo, education, experience, skills, projects, certifications, achievements } = data;

  return (
    <div className={`resume-template ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-8 shadow-lg`}>
      {/* Header */}
      <header className="text-center mb-8 border-b-2 border-slate-500 pb-6">
        <h1 className="text-3xl font-bold text-slate-600 dark:text-slate-300 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
          {personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2 text-sm">
          {personalInfo.linkedIn && (
            <a 
              href={personalInfo.linkedIn} 
              className="flex items-center gap-1 text-sky-500 hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github} 
              className="flex items-center gap-1 text-sky-500 hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          )}
          {personalInfo.portfolio && (
            <a 
              href={personalInfo.portfolio} 
              className="flex items-center gap-1 text-sky-500 hover:text-sky-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4" />
              <span>Portfolio</span>
            </a>
          )}
        </div>
      </header>

      {/* Objective */}
      {personalInfo.objective && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            OBJECTIVE
          </h2>
          <p className="text-sm leading-relaxed">
            {personalInfo.objective}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            TECHNICAL SKILLS
          </h2>
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="text-sm">
                <span className="font-medium">{skill.category}:</span>{' '}
                <span>{skill.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="text-sm">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-base">{exp.title}</h3>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{exp.duration}</span>
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">{exp.company}</p>
                <ul className="list-disc list-inside space-y-1">
                  {exp.responsibilities.map((resp, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
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
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            PROJECTS
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="text-sm">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">
                    {project.title}
                    {project.technologies && (
                      <span className="font-normal text-gray-600 dark:text-gray-300">
                        {' '}({project.technologies})
                      </span>
                    )}
                  </h3>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="text-sky-500 hover:text-sky-600 text-xs"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            EDUCATION
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="text-sm">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{edu.institution}</p>
                  </div>
                  <span className="text-gray-600 dark:text-gray-300 font-medium">{edu.duration}</span>
                </div>
                {edu.description && (
                  <p className="text-gray-700 dark:text-gray-300 mt-1">
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
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            CERTIFICATIONS
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="text-sm flex justify-between items-center">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-gray-600 dark:text-gray-300"> - {cert.issuer}</span>
                </div>
                <span className="text-gray-600 dark:text-gray-300 font-medium">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-3 border-b border-slate-300 dark:border-slate-600 pb-1">
            ACHIEVEMENTS
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="text-sm">
                <h3 className="font-semibold mb-1">{achievement.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">
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