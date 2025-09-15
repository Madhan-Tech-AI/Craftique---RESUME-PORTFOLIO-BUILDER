import React, { useRef, useState } from 'react';
import { useResume } from '../../contexts/ResumeContext';
import ResumeTemplate from './ResumeTemplate';
import { Download, Loader } from 'lucide-react';
import html2pdf from 'html2pdf.js';

interface ResumePreviewProps {
  darkMode?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ darkMode = false }) => {
  const { resumeData } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const exportToPDF = async () => {
    if (!resumeRef.current) return;

    setIsExporting(true);
    
    try {
      const element = resumeRef.current;
      const opt = {
        margin: 0.5,
        filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: true 
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with Export Button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
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

      {/* Resume Preview */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={resumeRef}
            className="transform scale-75 origin-top-left"
            style={{ width: '133.33%' }} // Compensate for scale
          >
            <ResumeTemplate data={resumeData} darkMode={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;