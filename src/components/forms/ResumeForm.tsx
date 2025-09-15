import React, { useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import { PersonalInfo, Education, Experience, Project, Skill, Certification, Achievement } from '../../types';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import { Plus, Trash2, User, Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

const ResumeForm: React.FC = () => {
  const { resumeData, updateResumeData } = useResume();
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { key: 'personal', label: 'Personal Info', icon: User },
    { key: 'experience', label: 'Experience', icon: User },
    { key: 'education', label: 'Education', icon: User },
    { key: 'skills', label: 'Skills', icon: User },
    { key: 'projects', label: 'Projects', icon: User },
    { key: 'certifications', label: 'Certifications', icon: User },
    { key: 'achievements', label: 'Achievements', icon: User }
  ];

  // Personal Info handlers
  const updatePersonalInfo = (field: keyof PersonalInfo, value: string) => {
    updateResumeData({
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      duration: '',
      description: ''
    };
    updateResumeData({
      education: [...resumeData.education, newEducation]
    });
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    updateResumeData({
      education: resumeData.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    updateResumeData({
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      responsibilities: ['']
    };
    updateResumeData({
      experience: [...resumeData.experience, newExperience]
    });
  };

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    updateResumeData({
      experience: resumeData.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    updateResumeData({
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const addResponsibility = (experienceId: string) => {
    const experience = resumeData.experience.find(exp => exp.id === experienceId);
    if (experience) {
      updateExperience(experienceId, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const updateResponsibility = (experienceId: string, index: number, value: string) => {
    const experience = resumeData.experience.find(exp => exp.id === experienceId);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(experienceId, 'responsibilities', newResponsibilities);
    }
  };

  const removeResponsibility = (experienceId: string, index: number) => {
    const experience = resumeData.experience.find(exp => exp.id === experienceId);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(experienceId, 'responsibilities', newResponsibilities);
    }
  };

  // Skills handlers
  const addSkillCategory = () => {
    const newSkill: Skill = {
      category: '',
      items: ['']
    };
    updateResumeData({
      skills: [...resumeData.skills, newSkill]
    });
  };

  const updateSkillCategory = (index: number, field: 'category' | 'items', value: string | string[]) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    updateResumeData({ skills: newSkills });
  };

  const removeSkillCategory = (index: number) => {
    updateResumeData({
      skills: resumeData.skills.filter((_, i) => i !== index)
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: '',
      description: '',
      technologies: '',
      link: ''
    };
    updateResumeData({
      projects: [...resumeData.projects, newProject]
    });
  };

  const updateProject = (id: string, field: keyof Project, value: string) => {
    updateResumeData({
      projects: resumeData.projects.map(project => 
        project.id === id ? { ...project, [field]: value } : project
      )
    });
  };

  const removeProject = (id: string) => {
    updateResumeData({
      projects: resumeData.projects.filter(project => project.id !== id)
    });
  };

  // Certifications handlers
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    updateResumeData({
      certifications: [...resumeData.certifications, newCertification]
    });
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    updateResumeData({
      certifications: resumeData.certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const removeCertification = (id: string) => {
    updateResumeData({
      certifications: resumeData.certifications.filter(cert => cert.id !== id)
    });
  };

  // Achievements handlers
  const addAchievement = () => {
    const newAchievement: Achievement = {
      id: Date.now().toString(),
      title: '',
      description: ''
    };
    updateResumeData({
      achievements: [...resumeData.achievements, newAchievement]
    });
  };

  const updateAchievement = (id: string, field: keyof Achievement, value: string) => {
    updateResumeData({
      achievements: resumeData.achievements.map(achievement => 
        achievement.id === id ? { ...achievement, [field]: value } : achievement
      )
    });
  };

  const removeAchievement = (id: string) => {
    updateResumeData({
      achievements: resumeData.achievements.filter(achievement => achievement.id !== id)
    });
  };

  const renderPersonalInfo = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Full Name"
          value={resumeData.personalInfo.fullName}
          onChange={(value) => updatePersonalInfo('fullName', value)}
          placeholder="John Doe"
          required
          icon={<User className="h-5 w-5 text-gray-400" />}
        />
        
        <InputField
          label="Email"
          type="email"
          value={resumeData.personalInfo.email}
          onChange={(value) => updatePersonalInfo('email', value)}
          placeholder="john@example.com"
          required
          icon={<Mail className="h-5 w-5 text-gray-400" />}
        />
        
        <InputField
          label="Phone"
          type="tel"
          value={resumeData.personalInfo.phone}
          onChange={(value) => updatePersonalInfo('phone', value)}
          placeholder="+1 (555) 123-4567"
          icon={<Phone className="h-5 w-5 text-gray-400" />}
        />
        
        <InputField
          label="Location"
          value={resumeData.personalInfo.location}
          onChange={(value) => updatePersonalInfo('location', value)}
          placeholder="New York, NY"
          icon={<MapPin className="h-5 w-5 text-gray-400" />}
        />
        
        <InputField
          label="LinkedIn"
          type="url"
          value={resumeData.personalInfo.linkedIn}
          onChange={(value) => updatePersonalInfo('linkedIn', value)}
          placeholder="https://linkedin.com/in/johndoe"
          icon={<Linkedin className="h-5 w-5 text-gray-400" />}
        />
        
        <InputField
          label="GitHub"
          type="url"
          value={resumeData.personalInfo.github}
          onChange={(value) => updatePersonalInfo('github', value)}
          placeholder="https://github.com/johndoe"
          icon={<Github className="h-5 w-5 text-gray-400" />}
        />
        
        <div className="md:col-span-2">
          <InputField
            label="Portfolio"
            type="url"
            value={resumeData.personalInfo.portfolio}
            onChange={(value) => updatePersonalInfo('portfolio', value)}
            placeholder="https://johndoe.com"
            icon={<Globe className="h-5 w-5 text-gray-400" />}
          />
        </div>
      </div>
      
      <TextAreaField
        label="Objective"
        value={resumeData.personalInfo.objective}
        onChange={(value) => updatePersonalInfo('objective', value)}
        placeholder="Brief professional summary..."
        rows={3}
      />
    </div>
  );

  const renderExperience = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Professional Experience</h3>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Experience</span>
        </button>
      </div>
      
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Experience Entry</h4>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Job Title"
              value={exp.title}
              onChange={(value) => updateExperience(exp.id, 'title', value)}
              placeholder="Software Engineer"
              required
            />
            <InputField
              label="Company"
              value={exp.company}
              onChange={(value) => updateExperience(exp.id, 'company', value)}
              placeholder="Tech Company"
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Duration"
                value={exp.duration}
                onChange={(value) => updateExperience(exp.id, 'duration', value)}
                placeholder="Jan 2020 - Present"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Responsibilities
            </label>
            <div className="space-y-2">
              {exp.responsibilities.map((responsibility, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={responsibility}
                    onChange={(e) => updateResponsibility(exp.id, index, e.target.value)}
                    placeholder="Describe your responsibility..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                  <button
                    onClick={() => addResponsibility(exp.id)}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  {exp.responsibilities.length > 1 && (
                    <button
                      onClick={() => removeResponsibility(exp.id, index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {resumeData.experience.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No experience entries yet. Click "Add Experience" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Education</h3>
        <button
          onClick={addEducation}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Education</span>
        </button>
      </div>
      
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Education Entry</h4>
            <button
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Degree"
              value={edu.degree}
              onChange={(value) => updateEducation(edu.id, 'degree', value)}
              placeholder="Bachelor of Science"
              required
            />
            <InputField
              label="Institution"
              value={edu.institution}
              onChange={(value) => updateEducation(edu.id, 'institution', value)}
              placeholder="University Name"
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Duration"
                value={edu.duration}
                onChange={(value) => updateEducation(edu.id, 'duration', value)}
                placeholder="2018 - 2022"
                required
              />
            </div>
          </div>
          
          <TextAreaField
            label="Description (Optional)"
            value={edu.description || ''}
            onChange={(value) => updateEducation(edu.id, 'description', value)}
            placeholder="Additional details about your education..."
            rows={2}
          />
        </div>
      ))}
      
      {resumeData.education.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No education entries yet. Click "Add Education" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderSkills = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
        <button
          onClick={addSkillCategory}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Skill Category</span>
        </button>
      </div>
      
      {resumeData.skills.map((skill, index) => (
        <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Skill Category</h4>
            <button
              onClick={() => removeSkillCategory(index)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <InputField
            label="Category"
            value={skill.category}
            onChange={(value) => updateSkillCategory(index, 'category', value)}
            placeholder="Programming Languages"
            required
          />
          
          <TextAreaField
            label="Skills (comma-separated)"
            value={skill.items.join(', ')}
            onChange={(value) => updateSkillCategory(index, 'items', value.split(',').map(item => item.trim()).filter(item => item))}
            placeholder="JavaScript, Python, React, Node.js"
            rows={2}
          />
        </div>
      ))}
      
      {resumeData.skills.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No skill categories yet. Click "Add Skill Category" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h3>
        <button
          onClick={addProject}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </button>
      </div>
      
      {resumeData.projects.map((project) => (
        <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Project Entry</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Project Title"
              value={project.title}
              onChange={(value) => updateProject(project.id, 'title', value)}
              placeholder="My Awesome Project"
              required
            />
            <InputField
              label="Technologies"
              value={project.technologies}
              onChange={(value) => updateProject(project.id, 'technologies', value)}
              placeholder="React, Node.js, MongoDB"
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Project Link (Optional)"
                type="url"
                value={project.link || ''}
                onChange={(value) => updateProject(project.id, 'link', value)}
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>
          
          <TextAreaField
            label="Description"
            value={project.description}
            onChange={(value) => updateProject(project.id, 'description', value)}
            placeholder="Describe your project, its features, and your role..."
            rows={3}
            required
          />
        </div>
      ))}
      
      {resumeData.projects.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No projects yet. Click "Add Project" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderCertifications = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h3>
        <button
          onClick={addCertification}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Certification</span>
        </button>
      </div>
      
      {resumeData.certifications.map((cert) => (
        <div key={cert.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Certification Entry</h4>
            <button
              onClick={() => removeCertification(cert.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Certification Name"
              value={cert.name}
              onChange={(value) => updateCertification(cert.id, 'name', value)}
              placeholder="AWS Solutions Architect"
              required
            />
            <InputField
              label="Issuer"
              value={cert.issuer}
              onChange={(value) => updateCertification(cert.id, 'issuer', value)}
              placeholder="Amazon Web Services"
              required
            />
            <div className="md:col-span-2">
              <InputField
                label="Date"
                value={cert.date}
                onChange={(value) => updateCertification(cert.id, 'date', value)}
                placeholder="March 2023"
                required
              />
            </div>
          </div>
        </div>
      ))}
      
      {resumeData.certifications.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No certifications yet. Click "Add Certification" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements</h3>
        <button
          onClick={addAchievement}
          className="flex items-center space-x-2 px-3 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Achievement</span>
        </button>
      </div>
      
      {resumeData.achievements.map((achievement) => (
        <div key={achievement.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900 dark:text-white">Achievement Entry</h4>
            <button
              onClick={() => removeAchievement(achievement.id)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          
          <InputField
            label="Title"
            value={achievement.title}
            onChange={(value) => updateAchievement(achievement.id, 'title', value)}
            placeholder="1st place in Hackathon"
            required
          />
          
          <TextAreaField
            label="Description"
            value={achievement.description}
            onChange={(value) => updateAchievement(achievement.id, 'description', value)}
            placeholder="Describe your achievement..."
            rows={3}
            required
          />
        </div>
      ))}
      
      {resumeData.achievements.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No achievements yet. Click "Add Achievement" to get started.</p>
        </div>
      )}
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'personal': return renderPersonalInfo();
      case 'experience': return renderExperience();
      case 'education': return renderEducation();
      case 'skills': return renderSkills();
      case 'projects': return renderProjects();
      case 'certifications': return renderCertifications();
      case 'achievements': return renderAchievements();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Section Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.key
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default ResumeForm;