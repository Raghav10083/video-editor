export type AspectRatio = '16:9' | '9:16' | '1:1' | '4:3';
export type Resolution = '720p' | '1080p' | '4K';
export type TrackType = 'video' | 'audio' | '3d' | 'text' | 'fx';

export interface FilterSettings {
  preset: 'none' | 'cyberpunk' | 'vhs' | 'matrix' | 'film' | 'sunset' | 'noir' | 'glitch';
  brightness: number; // 0 to 200
  contrast: number; // 0 to 200
  saturation: number; // 0 to 200
  blur: number; // 0 to 20
  glitchIntensity: number; // 0 to 100
  chromaKey: boolean; // green screen removal
  chromaColor: string;
}

export interface ThreeObject3D {
  id: string;
  name: string;
  type: 'cube' | 'sphere' | 'torus' | 'pyramid' | 'ring' | 'hologram' | 'text3d' | 'particles';
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  metalness: number;
  roughness: number;
  wireframe: boolean;
  glow: boolean;
  text?: string;
  visible: boolean;
}

export interface TimelineClip {
  id: string;
  trackId: string;
  name: string;
  type: TrackType;
  startTime: number; // in seconds
  duration: number; // in seconds
  src?: string; // URL for video/audio/image
  color?: string;
  thumbnail?: string;
  threeObjectId?: string;
  textProps?: {
    content: string;
    fontSize: number;
    color: string;
    fontFamily: string;
    is3D: boolean;
    animation: 'fade' | 'slide' | 'bounce' | 'neonGlow' | 'none';
  };
  audioProps?: {
    volume: number; // 0 to 1
    muted: boolean;
    speed: number;
  };
}

export interface TimelineTrack {
  id: string;
  name: string;
  type: TrackType;
  muted: boolean;
  hidden: boolean;
  locked: boolean;
  color: string;
}

export interface ProjectState {
  title: string;
  duration: number; // total sequence length in seconds
  currentTime: number;
  isPlaying: boolean;
  isLooping: boolean;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  zoomLevel: number; // timeline zoom 1..10
  selectedClipId: string | null;
  selected3DObjectId: string | null;
  viewportMode: '2d' | '3d' | 'split';
  filters: FilterSettings;
  tracks: TimelineTrack[];
  clips: TimelineClip[];
  threeObjects: ThreeObject3D[];
}

export interface ExportSettings {
  format: 'mp4' | 'webm' | 'gif';
  resolution: Resolution;
  fps: 30 | 60;
  quality: 'high' | 'medium' | 'low';
}
