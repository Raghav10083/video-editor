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
    description: '16:9 landscape long-form documentary episode featuring full concept research, script writing, storytelling structure, and retention editing in Adobe Premiere Pro.',
    keyHighlights: [
      'Long-form script research & 16:9 story structure',
      'Chapter-based narrative concept planning',
      'Rhythmic long-form editing & sound design in Adobe Premiere Pro'
    ]
  },
  {
    id: 'proj_longform_2',
    title: 'Long-Form Script & Landscape Edit #2',
    client: 'TXnbStudios YouTube',
    category: 'longform',
    aspect: '16:9',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1cOXOUWrLpisuEyO427p7t1ucXdWnSd1n',
    drivePreviewUrl: 'https://drive.google.com/file/d/1cOXOUWrLpisuEyO427p7t1ucXdWnSd1n/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '14:20',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '95K+',
      retentionRate: '65% (Long-Form)'
    },
    description: '16:9 landscape video essay featuring custom concept storyboard, long-form scriptwriting, and multi-track audio mix in Adobe Premiere Pro.',
    keyHighlights: [
      'Landscape 16:9 layout & storyboard planning',
      'Long-form scriptwriting & voiceover pacing',
      'Dynamic visual B-roll editing in Adobe Premiere Pro'
    ]
  },
  {
    id: 'proj_longform_3',
    title: 'Blooper Explicit',
    client: 'TXnbStudios YouTube',
    category: 'longform',
    aspect: '16:9',
    videoUrl: 'https://drive.google.com/uc?export=download&id=1t69ye0Jb8gJR0kDUa1iN5F1aiP73Z0B7',
    drivePreviewUrl: 'https://drive.google.com/file/d/1t69ye0Jb8gJR0kDUa1iN5F1aiP73Z0B7/preview',
    youtubeUrl: 'https://www.youtube.com/@TXnbStudios',
    duration: '12:15',
    releaseYear: '2026',
    software: ['Adobe Premiere Pro'],
    metrics: {
      views: '110K+',
      retentionRate: '66% (Long-Form)'
    },
    description: '16:9 landscape Blooper Explicit cut featuring behind-the-scenes outtakes, unedited moments, and fast-paced comedic editing in Adobe Premiere Pro.',
    keyHighlights: [
      'Blooper & behind-the-scenes outtakes compilation',
      'Comedic timing & audio sound FX drops in Adobe Premiere Pro',
      'High retention 16:9 narrative cut'
    ]
  },
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
    description: 'High-impact 9:16 vertical cinematic edit structured with hook strategy and rhythmic pacing in Adobe Premiere Pro.',
    keyHighlights: [
      'Content strategy & opening visual hook alignment',
      'Frame-accurate rhythmic cutting to audio beats in Adobe Premiere Pro',
      'Multi-layer sound design and atmosphere building'
    ]
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
    description: 'Atmospheric vertical cinematic video edit with tailored script storytelling structure in Adobe Premiere Pro.',
    keyHighlights: [
      'Narrative arc script structure & flow',
      'Pacing optimization to prevent viewer drop-off in Adobe Premiere Pro',
      'Sound FX accent design'
    ]
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
    description: 'High-octane portrait edit engineered for high viral retention and visual flow in Adobe Premiere Pro.',
    keyHighlights: [
      'Strategic hook placement in the first 2 seconds',
      'Speed ramping on key movements in Adobe Premiere Pro',
      'High-impact video editing transitions'
    ]
  },
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
    description: 'Conversational talking head edit with script restructuring, pause removal, and subtle zooms in Adobe Premiere Pro.',
    keyHighlights: [
      'Content writing & script restructuring for clarity',
      'Jump-cut editing removing filler words & pauses in Adobe Premiere Pro',
      'B-roll insertion and audio leveling'
    ]
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
    description: 'Engaging talking head edit designed with strategic camera scale zooms for emphasis in Adobe Premiere Pro.',
    keyHighlights: [
      'Content strategy mapping for viewer interest',
      'Multi-angle scale zooms in Adobe Premiere Pro',
      'Background audio noise reduction'
    ]
  },
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
    description: 'High-converting UGC reel with opening hook copywriting and rapid match-cuts in Adobe Premiere Pro.',
    keyHighlights: [
      'Hook script writing & angle selection',
      'Fast-paced match-cut editing in Adobe Premiere Pro',
      'Custom Foley sound effects'
    ]
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
    description: 'Problem & solution UGC storytelling edit with split-screen structure in Adobe Premiere Pro.',
    keyHighlights: [
      'Problem/solution script structure',
      'Split-screen video editing in Adobe Premiere Pro',
      'Voiceover audio equalization'
    ]
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
    description: 'Clean aesthetic UGC promo with soft sound design and vertical 9:16 formatting in Adobe Premiere Pro.',
    keyHighlights: [
      'Visual content strategy for social feeds',
      'Whip transition editing in Adobe Premiere Pro',
      'Ambient sound design'
    ]
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
    description: 'Fast-paced social ad edit crafted for high click-through rates in Adobe Premiere Pro.',
    keyHighlights: [
      'Ad script hook copywriting',
      'Pattern interrupt video editing in Adobe Premiere Pro',
      'Riser sound effects'
    ]
  }
];

export const TESTIMONIALS: any[] = [];
export const WORKFLOW_STEPS: any[] = [];
export const CLIENT_BRAND_LOGOS: { name: string; icon: string }[] = [];
