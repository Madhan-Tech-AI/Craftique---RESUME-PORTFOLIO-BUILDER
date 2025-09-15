import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual Supabase credentials when connected
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Example functions for Supabase integration
export const saveResumeData = async (userId: string, resumeData: any) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .upsert([
        {
          user_id: userId,
          data: resumeData,
          updated_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving resume data:', error);
    throw error;
  }
};

export const getResumeData = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching resume data:', error);
    throw error;
  }
};

export const createPortfolioLink = async (userId: string, portfolioData: any) => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .upsert([
        {
          user_id: userId,
          data: portfolioData,
          slug: `portfolio-${userId}`,
          is_public: true,
          updated_at: new Date().toISOString(),
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating portfolio link:', error);
    throw error;
  }
};