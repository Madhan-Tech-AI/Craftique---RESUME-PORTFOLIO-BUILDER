import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ResumeForm from '../components/forms/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import { Navigate } from 'react-router-dom';

const ResumeBuilder: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Resume Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your professional resume with live preview
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Form Panel */}
          <div className="overflow-auto">
            <ResumeForm />
          </div>

          {/* Preview Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;