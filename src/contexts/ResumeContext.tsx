import React, { createContext, useContext, useState } from 'react';
import { ResumeData } from '../types';

interface ResumeContextType {
  resumeData: ResumeData;
  updateResumeData: (data: Partial<ResumeData>) => void;
  resetResumeData: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    objective: ''
  },
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: []
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider: React.FC<{ 
  children: React.ReactNode;
  value?: ResumeContextType;
}> = ({ children, value }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const updateResumeData = (data: Partial<ResumeData>) => {
    setResumeData(prev => ({ ...prev, ...data }));
  };

  const resetResumeData = () => {
    setResumeData(initialResumeData);
  };

  const contextValue = value || {
    resumeData,
    updateResumeData,
    resetResumeData
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};
