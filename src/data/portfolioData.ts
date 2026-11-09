import { PortfolioProject } from '../types/portfolio';

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@TXnbStudios";
export const HERO_SHOWREEL_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";

export const USER_SKILLS = [
  {
    title: 'Content Strategist',
    icon: '💡',
    description: 'Analyzing audience retention dynamics, structuring viral narrative hooks, mapping chapter breakdowns, and optimizing long-form and short-form video performance on YouTube (@TXnbStudios).'
  },
  {
    title: 'Content Writer',
    icon: '✍️',
    description: 'Crafting deep long-form documentary scripts, video essay concepts, storytelling outlines, and compelling video hooks that keep viewers engaged through 15+ minute edits.'
  },
  {
    title: 'Video Editor',
    icon: '🎬',
    description: 'Executing frame-accurate rhythmic cuts, match-cuts, speed ramping, sound design, visual pacing, and full post-production in Adobe Premiere Pro for long-form YouTube projects and vertical 9:16 reels.'
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // 1. AI Videos
  {
    id: 'proj_ai_1',
    title: 'AI Video Edit #1',
    client: 'AI Content Project',
    category: 'ai',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1Vk1GyhRIV3BuWKZVCdcqGOYcuOz8uC6J',
    drivePreviewUrl: 'https://drive.google.com/file/d/1Vk1GyhRIV3BuWKZVCdcqGOYcuOz8uC6J/preview',
    duration: '00:45',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '45K+',
      retentionRate: '94%'
    },
    description: 'Creative AI concept video in 9:16 vertical format.',
    keyHighlights: []
  },

  // 2. Motion Graphics
  {
    id: 'proj_motion_graphics_1',
    title: 'Motion Graphics Edit #1',
    client: 'Motion Graphics Project',
    category: 'motion_graphics',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=10mCclWkbaelgexWSfQSLK79T_ixhkfUx',
    drivePreviewUrl: 'https://drive.google.com/file/d/10mCclWkbaelgexWSfQSLK79T_ixhkfUx/preview',
    duration: '00:40',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '60K+',
      retentionRate: '95%'
    },
    description: 'Dynamic motion graphics showcase in 9:16 vertical format.',
    keyHighlights: []
  },

  // 3. Long-Form 16:9 Edits
  {
    id: 'proj_longform_1',
    title: 'Long-Form Script & Landscape Edit #1',
    client: 'TXnbStudios YouTube',
    category: 'longform',
    aspect: '16:9',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1xrwzGJ_X67zOGSo4jLjeI-x3a0Uhh_sI',
    drivePreviewUrl: 'https://drive.google.com/file/d/1xrwzGJ_X67zOGSo4jLjeI-x3a0Uhh_sI/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '18:45',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '150K+',
      retentionRate: '68% (Long-Form)'
    },
    description: '16:9 landscape documentary episode produced for TXnbStudios YouTube.',
    keyHighlights: []
  },

  // 4. Cinematic Edits
  {
    id: 'proj_cinematic_1',
    title: 'Cinematic Edit #1',
    client: 'Cinematic Project',
    category: 'cinematic',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1z1h4bcZlMpO43qcPHSZHcRQ-GdRWrCHN',
    drivePreviewUrl: 'https://drive.google.com/file/d/1z1h4bcZlMpO43qcPHSZHcRQ-GdRWrCHN/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:45',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '28.4M',
      retentionRate: '96%'
    },
    description: 'Cinematic visual project in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_cinematic_2',
    title: 'Cinematic Edit #2',
    client: 'Cinematic Project',
    category: 'cinematic',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1NvCSK7cHyHbjh06wY9tE9B-wCo1peafk',
    drivePreviewUrl: 'https://drive.google.com/file/d/1NvCSK7cHyHbjh06wY9tE9B-wCo1peafk/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:52',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '16.8M',
      retentionRate: '93%'
    },
    description: 'Atmospheric cinematic video project in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_cinematic_3',
    title: 'Cinematic Edit #3',
    client: 'Cinematic Project',
    category: 'cinematic',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1xMYGJUOhtjJWw4JQfAj83MFB9jqDdtLI',
    drivePreviewUrl: 'https://drive.google.com/file/d/1xMYGJUOhtjJWw4JQfAj83MFB9jqDdtLI/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:38',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '21.2M',
      retentionRate: '95%'
    },
    description: 'High-energy portrait visual reel in 9:16 vertical format.',
    keyHighlights: []
  },

  // 5. Casual Talking Head
  {
    id: 'proj_talking_head_1',
    title: 'Casual Talking Head #1',
    client: 'Creator Podcast',
    category: 'talking_head',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1JIG4yvbIaBg-jKklFLenrGjcnnh6_Mcb',
    drivePreviewUrl: 'https://drive.google.com/file/d/1JIG4yvbIaBg-jKklFLenrGjcnnh6_Mcb/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:50',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '11.5M',
      retentionRate: '92%'
    },
    description: 'Conversational podcast talking head episode in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_talking_head_2',
    title: 'Casual Talking Head #2',
    client: 'Founder Q&A',
    category: 'talking_head',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1cwe-XnxLuO3vlXwKqon3sS3BaxkYHh7R',
    drivePreviewUrl: 'https://drive.google.com/file/d/1cwe-XnxLuO3vlXwKqon3sS3BaxkYHh7R/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:42',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '9.3M',
      retentionRate: '90%'
    },
    description: 'Founder Q&A discussion video in 9:16 vertical format.',
    keyHighlights: []
  },

  // 6. UGC & Creator Edits
  {
    id: 'proj_ugc_1',
    title: 'UGC Creator Reel #1',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1cCWFB6iXlUWGoXbxhn0-VK1AMMwzMkzV',
    drivePreviewUrl: 'https://drive.google.com/file/d/1cCWFB6iXlUWGoXbxhn0-VK1AMMwzMkzV/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:45',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '18.5M',
      retentionRate: '94%'
    },
    description: 'Creator UGC video reel in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_ugc_2',
    title: 'UGC Creator Reel #2',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1V-ejIrARvSdhNTPZDu6NV0iZe7k9zlT0',
    drivePreviewUrl: 'https://drive.google.com/file/d/1V-ejIrARvSdhNTPZDu6NV0iZe7k9zlT0/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:58',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '12.1M',
      retentionRate: '91%'
    },
    description: 'Problem and solution creator video in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_ugc_3',
    title: 'UGC Creator Reel #3',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=17R-ZO-bAuDkIVSVtdhQ9pcDGiLU4J0gn',
    drivePreviewUrl: 'https://drive.google.com/file/d/17R-ZO-bAuDkIVSVtdhQ9pcDGiLU4J0gn/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:35',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '9.8M',
      retentionRate: '89%'
    },
    description: 'Brand promotional creator reel in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_ugc_4',
    title: 'UGC Creator Reel #4',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=14wcx2WVrS_54jcWplhHlysnDeWSDfdzv',
    drivePreviewUrl: 'https://drive.google.com/file/d/14wcx2WVrS_54jcWplhHlysnDeWSDfdzv/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:40',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '14.3M',
      retentionRate: '93%'
    },
    description: 'Short-form social media ad reel in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_ugc_5',
    title: 'UGC Creator Reel #5',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1v0z40tc42tyg5s-QrV-EzPrLH6wTFono',
    drivePreviewUrl: 'https://drive.google.com/file/d/1v0z40tc42tyg5s-QrV-EzPrLH6wTFono/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:50',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '80K+',
      retentionRate: '93%'
    },
    description: 'Brand partner collaboration creator reel in 9:16 vertical format.',
    keyHighlights: []
  },
  {
    id: 'proj_ugc_6',
    title: 'UGC Creator Reel #6',
    client: 'Brand Partner',
    category: 'ugc',
    aspect: '9:16',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1YDx1605w0UGyB4OJLPCkZUpABPsPCbG5',
    drivePreviewUrl: 'https://drive.google.com/file/d/1YDx1605w0UGyB4OJLPCkZUpABPsPCbG5/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '00:45',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '55K+',
      retentionRate: '92%'
    },
    description: 'Vertical creator video for social brand campaign in 9:16 format.',
    keyHighlights: []
  }
];

export const TESTIMONIALS: any[] = [];
export const WORKFLOW_STEPS: any[] = [];
export const CLIENT_BRAND_LOGOS: { name: string; icon: string }[] = [];
