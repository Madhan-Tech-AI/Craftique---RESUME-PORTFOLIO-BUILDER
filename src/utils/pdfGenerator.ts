import html2pdf from 'html2pdf.js';
import { ResumeData } from '../types';

export const generateResumePDF = async (resumeElement: HTMLElement, resumeData: ResumeData): Promise<void> => {
  try {
    const opt = {
      margin: 0.5,
      filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
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
      }
    };

    await html2pdf().set(opt).from(resumeElement).save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

export const generatePortfolioPDF = async (portfolioElement: HTMLElement, personalInfo: any): Promise<void> => {
  try {
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `${personalInfo.fullName || 'portfolio'}-portfolio.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 0.95 
      },
      html2canvas: { 
        scale: 1.5,
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        width: portfolioElement.scrollWidth,
        height: portfolioElement.scrollHeight
      },
      jsPDF: { 
        unit: 'in', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    await html2pdf().set(opt).from(portfolioElement).save();
  } catch (error) {
    console.error('Error generating portfolio PDF:', error);
    throw new Error('Failed to generate portfolio PDF. Please try again.');
  }
};