import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, User, Settings, BarChart3, Download, Globe, Plus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Create New Resume',
      description: 'Start building a professional resume from scratch',
      icon: Plus,
      link: '/resume-builder',
      color: 'from-slate-500 to-slate-600'
    },
    {
      title: 'View Portfolio',
      description: 'Check your generated portfolio website',
      icon: Globe,
      link: '/portfolio',
      color: 'from-sky-500 to-sky-600'
    },
    {
      title: 'Download Resume',
      description: 'Export your resume as a PDF',
      icon: Download,
      link: '/resume-builder',
      color: 'from-green-500 to-green-600'
    }
  ];

  const stats = [
    {
      title: 'Resumes Created',
      value: '3',
      icon: FileText,
      color: 'text-slate-500'
    },
    {
      title: 'Portfolio Views',
      value: '127',
      icon: BarChart3,
      color: 'text-sky-500'
    },
    {
      title: 'Templates Used',
      value: '2',
      icon: Settings,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.fullName || 'User'}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your resumes and portfolios from your dashboard.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <IconComponent className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Created new resume template</span>
                <span className="text-gray-500 dark:text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Updated portfolio information</span>
                <span className="text-gray-500 dark:text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Exported resume as PDF</span>
                <span className="text-gray-500 dark:text-gray-500">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <div className="mt-8 bg-gradient-to-r from-slate-500 to-sky-500 rounded-xl shadow-lg text-white p-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">Getting Started with Craftique</h2>
            <p className="text-slate-100 mb-6">
              Create professional resumes and stunning portfolio websites with our easy-to-use tools. 
              Start by building your resume, then generate a portfolio website automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/resume-builder"
                className="bg-white text-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Build Resume
              </Link>
              <Link
                to="/portfolio"
                className="bg-slate-600/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600/30 transition-colors text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;