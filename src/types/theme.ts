export type ThemeMode = 
  | 'cyberpunk' 
  | 'hollywood_gold' 
  | 'retro_vhs' 
  | 'minimal_cinema' 
  | 'action_blockbuster';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  subtitle: string;
  icon: string;
  bgDark: string;
  bgPanel: string;
  bgCard: string;
  accentPrimary: string;
  accentSecondary: string;
  accentGlow: string;
  textHighlight: string;
  borderTheme: string;
  particleColor: string;
  particleSpeed: number;
  hasScanlines?: boolean;
}
