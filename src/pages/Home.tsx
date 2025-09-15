import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Globe, Download, Users, Star, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FileText,
      title: 'Smart Resume Builder',
      description: 'Create professional resumes with our intuitive drag-and-drop interface and real-time preview.',
      color: 'from-slate-500 to-slate-600'
    },
    {
      icon: Globe,
      title: 'Portfolio Generator',
      description: 'Automatically generate stunning portfolio websites from your resume data.',
      color: 'from-sky-500 to-sky-600'
    },
    {
      icon: Download,
      title: 'PDF Export',
      description: 'Export high-quality PDFs of your resume optimized for ATS systems.',
      color: 'from-green-500 to-green-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      content: 'Craftique helped me create a stunning portfolio that landed me my dream job at a tech startup!',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'Designer',
      content: 'The resume builder is incredibly intuitive, and the portfolio generator saved me hours of work.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      content: 'I love how my resume and portfolio are always in sync. Professional and efficient!',
      avatar: 'ER'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Resumes Created' },
    { number: '5K+', label: 'Portfolio Websites' },
    { number: '98%', label: 'User Satisfaction' },
    { number: '20+', label: 'Templates Available' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Build Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-sky-500"> Perfect Resume</span>
              <br />& Portfolio
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Create professional resumes and stunning portfolio websites with our smart builder. 
              One platform, endless possibilities for your career success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-slate-500 to-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-slate-600 hover:to-sky-600 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-slate-500 to-sky-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-slate-600 hover:to-sky-600 transition-all duration-200 transform hover:-translate-y-1 shadow-lg"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resume Builder</h3>
                    <div className="space-y-3">
                      <div className="h-4 bg-slate-200 dark:bg-gray-600 rounded"></div>
                      <div className="h-4 bg-slate-200 dark:bg-gray-600 rounded w-3/4"></div>
                      <div className="h-4 bg-sky-200 dark:bg-sky-800 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Portfolio Website</h3>
                    <div className="space-y-3">
                      <div className="h-4 bg-sky-200 dark:bg-sky-800 rounded"></div>
                      <div className="h-4 bg-slate-200 dark:bg-gray-600 rounded w-2/3"></div>
                      <div className="h-4 bg-slate-200 dark:bg-gray-600 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform combines powerful tools with beautiful design to help you create 
              professional materials that get noticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-6`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Professionals Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-sky-500 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Users Say
            </h2>
            <div className="flex justify-center items-center space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
              <span className="text-gray-600 dark:text-gray-300 ml-2">4.9/5 from 1000+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-slate-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-500 to-sky-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Professional Brand?
          </h2>
          <p className="text-xl text-slate-100 mb-8">
            Join thousands of professionals who have transformed their careers with Craftique.
            Start building your resume and portfolio today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="bg-white text-slate-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            ) : (
              <Link
                to="/signup"
                className="bg-white text-slate-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;