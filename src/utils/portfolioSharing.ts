export interface PortfolioShareData {
  id: string;
  userId: string;
  personalInfo: any;
  resumeData: any;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  isPublic: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export const generatePortfolioSlug = (fullName: string): string => {
  return fullName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'portfolio';
};

export const createShareablePortfolioLink = (portfolioData: any): string => {
  const slug = generatePortfolioSlug(portfolioData.personalInfo.fullName || 'portfolio');
  const baseUrl = window.location.origin;
  return `${baseUrl}/portfolio/${slug}`;
};

export const savePortfolioToStorage = (portfolioData: any): string => {
  const portfolioId = Date.now().toString();
  const shareData: PortfolioShareData = {
    id: portfolioId,
    userId: 'current-user', // In real app, this would be the actual user ID
    personalInfo: portfolioData.personalInfo,
    resumeData: portfolioData,
    theme: {
      primaryColor: '#64748b',
      secondaryColor: '#0ea5e9',
      accentColor: '#10b981'
    },
    isPublic: true,
    slug: generatePortfolioSlug(portfolioData.personalInfo.fullName || 'portfolio'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // Save to localStorage (in real app, this would be saved to database)
  const existingPortfolios = JSON.parse(localStorage.getItem('shared-portfolios') || '[]');
  const updatedPortfolios = [...existingPortfolios, shareData];
  localStorage.setItem('shared-portfolios', JSON.stringify(updatedPortfolios));

  return createShareablePortfolioLink(portfolioData);
};

export const getSharedPortfolio = (slug: string): PortfolioShareData | null => {
  const portfolios = JSON.parse(localStorage.getItem('shared-portfolios') || '[]');
  return portfolios.find((p: PortfolioShareData) => p.slug === slug) || null;
};

export const updatePortfolioTheme = (portfolioId: string, theme: any): void => {
  const portfolios = JSON.parse(localStorage.getItem('shared-portfolios') || '[]');
  const updatedPortfolios = portfolios.map((p: PortfolioShareData) => 
    p.id === portfolioId 
      ? { ...p, theme, updatedAt: new Date().toISOString() }
      : p
  );
  localStorage.setItem('shared-portfolios', JSON.stringify(updatedPortfolios));
};
