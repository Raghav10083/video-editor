'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { SidebarTools } from '../components/SidebarTools';
import { ThreeCanvasViewport } from '../components/ThreeCanvasViewport';
import { MultiTrackTimeline } from '../components/MultiTrackTimeline';
import { ExportModal } from '../components/ExportModal';
import { ShortcutsModal } from '../components/ShortcutsModal';
import { ProjectState, TimelineTrack, ThreeObject3D, TimelineClip } from '../types/editor';

const initialTracks: TimelineTrack[] = [
  { id: 'track_video_1', name: 'Video Layer 1', type: 'video', muted: false, hidden: false, locked: false, color: '#8b5cf6' },
  { id: 'track_3d_1', name: '3D Objects Layer', type: '3d', muted: false, hidden: false, locked: false, color: '#06b6d4' },
  { id: 'track_text_1', name: 'Text & Subtitles', type: 'text', muted: false, hidden: false, locked: false, color: '#ec4899' },
  { id: 'track_audio_1', name: 'Audio Layer 1', type: 'audio', muted: false, hidden: false, locked: false, color: '#f59e0b' },
];

const initial3DObjects: ThreeObject3D[] = [
  {
    id: '3d_cube_init',
    name: 'Cyber Cube',
    type: 'cube',
    position: [0, 0.5, 0],
    rotation: [0, 0, 0],
    scale: [1.2, 1.2, 1.2],
    color: '#8b5cf6',
    metalness: 0.8,
    roughness: 0.2,
    wireframe: true,
    glow: true,
    visible: true,
  },
  {
    id: '3d_sphere_init',
    name: 'Holographic Sphere',
    type: 'sphere',
    position: [-1.8, 0.8, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    color: '#06b6d4',
    metalness: 0.9,
    roughness: 0.1,
    wireframe: false,
    glow: true,
    visible: true,
  },
];

const initialClips: TimelineClip[] = [
  {
    id: 'clip_v1',
    trackId: 'track_video_1',
    name: 'Cyberpunk Metropolis',
    type: 'video',
    startTime: 0,
    duration: 15,
    color: '#8b5cf6',
  },
  {
    id: 'clip_3d_1',
    trackId: 'track_3d_1',
    name: 'Cyber Cube',
    type: '3d',
    startTime: 0,
    duration: 12,
    threeObjectId: '3d_cube_init',
    color: '#06b6d4',
  },
  {
    id: 'clip_text_1',
    trackId: 'track_text_1',
    name: 'Neon 3D Title',
    type: 'text',
    startTime: 2,
    duration: 8,
    color: '#ec4899',
    textProps: {
      content: 'CINEFLUX 3D STUDIO',
      fontSize: 36,
      color: '#06b6d4',
      fontFamily: 'sans-serif',
      is3D: true,
      animation: 'neonGlow',
    },
  },
  {
    id: 'clip_audio_1',
    trackId: 'track_audio_1',
    name: 'Synthwave Odyssey',
    type: 'audio',
    startTime: 0,
    duration: 25,
    color: '#f59e0b',
  },
];

export default function Home() {
  const [project, setProject] = useState<ProjectState>({
    title: 'Cyberpunk Cinematic Trailer',
    duration: 30,
    currentTime: 0,
    isPlaying: false,
    isLooping: true,
    aspectRatio: '16:9',
    resolution: '1080p',
    zoomLevel: 1,
    selectedClipId: null,
    selected3DObjectId: '3d_cube_init',
    viewportMode: '3d',
    filters: {
      preset: 'cyberpunk',
      brightness: 100,
      contrast: 120,
      saturation: 130,
      blur: 0,
      glitchIntensity: 15,
      chromaKey: false,
      chromaColor: '#00ff00',
    },
    tracks: initialTracks,
    clips: initialClips,
    threeObjects: initial3DObjects,
  });

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);
  const [showToast, setShowToast] = useState(true);

  // Global Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger when user is typing in input fields
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        setProject((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
      } else if (e.code === 'KeyS') {
        // Split action simulated
      } else if (e.code === 'Delete' || e.code === 'Backspace') {
        setProject((prev) => {
          if (prev.selectedClipId) {
            return {
              ...prev,
              clips: prev.clips.filter((c) => c.id !== prev.selectedClipId),
              selectedClipId: null,
            };
          }
          if (prev.selected3DObjectId) {
            return {
              ...prev,
              threeObjects: prev.threeObjects.filter((o) => o.id !== prev.selected3DObjectId),
              selected3DObjectId: null,
            };
          }
          return prev;
        });
      } else if (e.code === 'KeyF') {
        setProject((prev) => ({
          ...prev,
          viewportMode: prev.viewportMode === '3d' ? '2d' : '3d',
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveProject = () => {
    localStorage.setItem('cineflux_project', JSON.stringify(project));
    alert('Project saved to Local Storage!');
  };

  const handleLoadSampleProject = () => {
    setProject((prev) => ({
      ...prev,
      title: 'Neon Odyssey Demo',
      currentTime: 0,
      threeObjects: initial3DObjects,
      clips: initialClips,
      viewportMode: '3d',
      filters: { ...prev.filters, preset: 'cyberpunk' },
    }));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#07080d] text-gray-100 overflow-hidden font-sans">
      {/* Toast Notification Banner */}
      {showToast && (
        <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-cyan-900 text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-purple-500/30">
          <div className="flex items-center space-x-2">
            <span className="bg-purple-500 text-white text-[10px] px-1.5 py-0.5 rounded font-extrabold">
              NEW
            </span>
            <span>
              Connected to GitHub: <strong className="text-cyan-300">Raghav10083/video-editor</strong> • Real-time 3D WebGL Engine & Spatial Compositor ready!
            </span>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-gray-300 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        project={project}
        setProject={setProject}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        onSaveProject={handleSaveProject}
        onLoadSampleProject={handleLoadSampleProject}
      />

      {/* Main Workspace Body: Sidebar + Viewport */}
      <div className="flex-1 flex overflow-hidden relative">
        <SidebarTools project={project} setProject={setProject} />
        <ThreeCanvasViewport project={project} setProject={setProject} />
      </div>

      {/* Multi-Track Timeline Footer */}
      <MultiTrackTimeline project={project} setProject={setProject} />

      {/* Modals */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        project={project}
      />

      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />
    </div>
  );
}
