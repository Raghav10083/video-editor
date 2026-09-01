export type ProjectCategory = 
  | 'all' 
  | 'longform'
  | 'cinematic'
  | 'talking_head'
  | 'ugc';

export interface PortfolioProject {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  videoUrl: string;
  drivePreviewUrl?: string;
  youtubeUrl?: string;
  aspect?: '16:9' | '9:16';
  duration: string;
  releaseYear: string;
  software: string[];
  metrics: {
    views?: string;
    retentionRate?: string;
    impressions?: string;
  };
  description: string;
  keyHighlights: string[];
}

export interface QuoteCalculationInput {
  projectType: string;
  videoLengthMinutes: number;
  turnaroundDays: number;
  hasRawFootage: boolean;
  addOns: Record<string, boolean>;
}

export interface WorkflowStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  softwareUsed: string[];
  deliverable: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  projectTitle: string;
}
