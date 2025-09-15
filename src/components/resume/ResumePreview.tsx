import React, { useRef, useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import ResumeTemplate from './ResumeTemplate';
import { Download, Loader, Palette, Type, Sliders } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ResumePreviewProps {
  darkMode?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ darkMode = false }) => {
  const { resumeData } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customization, setCustomization] = useState({
    primaryColor: '#64748b',
    secondaryColor: '#0ea5e9',
    fontSize: '14px',
    fontFamily: 'Inter'
  });
  const resumeRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    
    try {
      const element = resumeRef.current;
      const opt = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true,
          letterRendering: true,
          logging: false
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait',
          compress: true
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const colorPresets = [
    { name: 'Professional Blue', primary: '#1e40af', secondary: '#3b82f6' },
    { name: 'Classic Gray', primary: '#64748b', secondary: '#0ea5e9' },
    { name: 'Modern Green', primary: '#059669', secondary: '#10b981' },
    { name: 'Corporate Purple', primary: '#7c3aed', secondary: '#8b5cf6' },
    { name: 'Elegant Black', primary: '#1f2937', secondary: '#374151' },
    { name: 'Warm Orange', primary: '#ea580c', secondary: '#f97316' }
  ];

  const fontOptions = [
    'Inter',
    'Arial',
    'Times New Roman',
    'Helvetica',
    'Georgia',
    'Calibri'
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header with Controls */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <Palette className="h-4 w-4" />
            <span>Customize</span>
          </button>
          <button
            onClick={exportToPDF}
            disabled={isExporting}
            className="flex items-center space-x-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Customization Panel */}
      {showCustomization && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Color Presets */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => setCustomization(prev => ({
                      ...prev,
                      primaryColor: preset.primary,
                      secondaryColor: preset.secondary
                    }))}
                    className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex space-x-1">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.primary }}
                      ></div>
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: preset.secondary }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Family
              </label>
              <select
                value={customization.fontFamily}
                onChange={(e) => setCustomization(prev => ({ ...prev, fontFamily: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                {fontOptions.map((font) => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Size
              </label>
              <select
                value={customization.fontSize}
                onChange={(e) => setCustomization(prev => ({ ...prev, fontSize: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white"
              >
                <option value="12px">Small (12px)</option>
                <option value="14px">Medium (14px)</option>
                <option value="16px">Large (16px)</option>
              </select>
            </div>
          </div>

          {/* Custom Colors */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={customization.primaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={customization.primaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={customization.secondaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600"
                />
                <input
                  type="text"
                  value={customization.secondaryColor}
                  onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview */}
      <div className="flex-1 overflow-auto p-4 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={resumeRef}
            className="transform scale-90 origin-top"
            style={{ width: '111.11%' }}
          >
            <ResumeTemplate 
              data={resumeData} 
              darkMode={false} 
              customization={customization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
