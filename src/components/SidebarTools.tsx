'use client';

import React, { useState } from 'react';
import { 
  FiVideo, FiBox, FiType, FiSliders, FiMusic, FiUploadCloud, 
  FiPlus, FiCheck, FiZap, FiSparkles, FiEye, FiVolume2, FiDisc
} from 'react-icons/fi';
import { ProjectState, ThreeObject3D, TimelineClip } from '../types/editor';

interface SidebarToolsProps {
  project: ProjectState;
  setProject: React.Dispatch<React.SetStateAction<ProjectState>>;
}

type TabType = 'media' | '3d' | 'text' | 'fx' | 'transitions' | 'audio';

export const SidebarTools: React.FC<SidebarToolsProps> = ({
  project,
  setProject,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('3d');

  // Sample HD Videos
  const sampleVideos = [
    { id: 'v1', name: 'Cyberpunk Metropolis', duration: 15, thumbnail: '🏙️' },
    { id: 'v2', name: 'Deep Space Nebula', duration: 20, thumbnail: '🌌' },
    { id: 'v3', name: 'Futuristic Grid Loop', duration: 12, thumbnail: '📐' },
    { id: 'v4', name: 'Abstract Particle Tunnel', duration: 10, thumbnail: '✨' },
  ];

  // 3D Object Presets
  const threePresets: Omit<ThreeObject3D, 'id'>[] = [
    {
      name: 'Cyber Cube',
      type: 'cube',
      position: [0, 0.5, 0],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: '#8b5cf6',
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
      glow: true,
      visible: true,
    },
    {
      name: 'Holographic Sphere',
      type: 'sphere',
      position: [-1.5, 0.8, 0],
      rotation: [0, 0, 0],
      scale: [1.2, 1.2, 1.2],
      color: '#06b6d4',
      metalness: 0.9,
      roughness: 0.1,
      wireframe: false,
      glow: true,
      visible: true,
    },
    {
      name: 'Torus Ring',
      type: 'torus',
      position: [1.5, 0.5, 0],
      rotation: [0.5, 0, 0],
      scale: [1, 1, 1],
      color: '#ec4899',
      metalness: 0.7,
      roughness: 0.3,
      wireframe: true,
      glow: true,
      visible: true,
    },
    {
      name: 'Cyber Pyramid',
      type: 'pyramid',
      position: [0, -0.5, 0],
      rotation: [0, 0.8, 0],
      scale: [1.1, 1.1, 1.1],
      color: '#f59e0b',
      metalness: 0.8,
      roughness: 0.2,
      wireframe: false,
      glow: true,
      visible: true,
    },
    {
      name: 'Particle Swarm',
      type: 'particles',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5],
      color: '#10b981',
      metalness: 0.5,
      roughness: 0.5,
      wireframe: false,
      glow: true,
      visible: true,
    },
  ];

  // Text Presets
  const textPresets = [
    { name: 'Neon 3D Title', content: 'CYBERFLUX', color: '#06b6d4', is3D: true, animation: 'neonGlow' },
    { name: 'Futuristic Subtitle', content: 'CHAPTER 01: THE AWAKENING', color: '#f3f4f6', is3D: false, animation: 'fade' },
    { name: 'Glitch Typography', content: 'SYSTEM OVERRIDE', color: '#ec4899', is3D: true, animation: 'bounce' },
    { name: 'Minimal Lower-Third', content: 'DIRECTOR: RAGHAV', color: '#8b5cf6', is3D: false, animation: 'slide' },
  ];

  // Handle Video Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newClip: TimelineClip = {
        id: 'clip_' + Date.now(),
        trackId: 'track_video_1',
        name: file.name,
        type: 'video',
        startTime: project.currentTime,
        duration: 10,
        src: url,
        color: '#8b5cf6',
      };
      setProject((prev) => ({
        ...prev,
        clips: [...prev.clips, newClip],
      }));
    }
  };

  // Add 3D Object to Scene & Timeline
  const handleAdd3DObject = (preset: Omit<ThreeObject3D, 'id'>) => {
    const id = '3d_' + Date.now();
    const newObj: ThreeObject3D = { ...preset, id };

    const newClip: TimelineClip = {
      id: 'clip_' + id,
      trackId: 'track_3d_1',
      name: preset.name,
      type: '3d',
      startTime: project.currentTime,
      duration: 12,
      threeObjectId: id,
      color: preset.color,
    };

    setProject((prev) => ({
      ...prev,
      threeObjects: [...prev.threeObjects, newObj],
      clips: [...prev.clips, newClip],
      selected3DObjectId: id,
    }));
  };

  // Add Text Clip
  const handleAddTextClip = (preset: typeof textPresets[0]) => {
    const id = 'text_' + Date.now();
    const newClip: TimelineClip = {
      id: 'clip_' + id,
      trackId: 'track_text_1',
      name: preset.name,
      type: 'text',
      startTime: project.currentTime,
      duration: 8,
      color: preset.color,
      textProps: {
        content: preset.content,
        fontSize: 32,
        color: preset.color,
        fontFamily: 'sans-serif',
        is3D: preset.is3D,
        animation: preset.animation as any,
      },
    };

    setProject((prev) => ({
      ...prev,
      clips: [...prev.clips, newClip],
    }));
  };

  // Handle Video Filter Switch
  const handleFilterPresetChange = (presetName: any) => {
    setProject((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        preset: presetName,
      },
    }));
  };

  return (
    <aside className="w-80 bg-[#0a0b13] border-r border-white/10 flex h-full">
      {/* Sidebar Vertical Tabs */}
      <div className="w-16 bg-[#07080f] border-r border-white/10 flex flex-col items-center py-4 space-y-5">
        {[
          { id: '3d', icon: FiBox, label: '3D Studio' },
          { id: 'media', icon: FiVideo, label: 'Media' },
          { id: 'text', icon: FiType, label: 'Text/3D' },
          { id: 'fx', icon: FiSliders, label: 'Filters' },
          { id: 'audio', icon: FiMusic, label: 'Audio' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex flex-col items-center space-y-1 p-2 rounded-xl text-xs transition ${
                isActive
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50 shadow-lg shadow-purple-600/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
              title={tab.label}
            >
              <Icon className="text-xl" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sidebar Content Panel */}
      <div className="flex-1 p-4 overflow-y-auto space-y-5 text-xs text-gray-300">
        {/* TAB 1: 3D OBJECTS */}
        {activeTab === '3d' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-cyan-400 flex items-center space-x-1.5 mb-1">
                <FiSparkles />
                <span>3D Spatial Elements</span>
              </h3>
              <p className="text-gray-400 text-[11px]">
                Click any 3D element to insert into spatial WebGL view & timeline.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {threePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAdd3DObject(preset)}
                  className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-xl p-3 text-left transition flex flex-col justify-between h-24 hover:scale-[1.02]"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-gray-200 group-hover:text-cyan-300 text-xs">
                      {preset.name}
                    </span>
                    <span
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: preset.color }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gray-400">
                    <span className="uppercase font-mono">{preset.type}</span>
                    <FiPlus className="text-cyan-400 text-sm group-hover:rotate-90 transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Active 3D Elements List */}
            <div className="pt-2 border-t border-white/10">
              <h4 className="font-semibold text-gray-300 mb-2">Scene 3D Layer List</h4>
              {project.threeObjects.length === 0 ? (
                <div className="text-gray-500 text-center py-4 border border-dashed border-white/10 rounded-lg">
                  No 3D objects added yet
                </div>
              ) : (
                <div className="space-y-1.5">
                  {project.threeObjects.map((obj) => (
                    <div
                      key={obj.id}
                      onClick={() =>
                        setProject((prev) => ({ ...prev, selected3DObjectId: obj.id }))
                      }
                      className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition ${
                        project.selected3DObjectId === obj.id
                          ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: obj.color }}
                        />
                        <span className="font-medium">{obj.name}</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setProject((prev) => ({
                            ...prev,
                            threeObjects: prev.threeObjects.filter((o) => o.id !== obj.id),
                            clips: prev.clips.filter((c) => c.threeObjectId !== obj.id),
                            selected3DObjectId:
                              prev.selected3DObjectId === obj.id ? null : prev.selected3DObjectId,
                          }));
                        }}
                        className="text-gray-500 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MEDIA LIBRARY */}
        {activeTab === 'media' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-purple-400 flex items-center space-x-1.5 mb-1">
                <FiVideo />
                <span>Media Assets</span>
              </h3>
              <p className="text-gray-400 text-[11px]">Upload custom MP4/MOV or choose sample clips.</p>
            </div>

            {/* Custom File Upload Box */}
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500/40 hover:border-purple-400 rounded-xl p-4 cursor-pointer bg-purple-950/20 hover:bg-purple-950/40 transition">
              <FiUploadCloud className="text-2xl text-purple-400 mb-1" />
              <span className="font-semibold text-gray-200">Upload Media File</span>
              <span className="text-[10px] text-gray-400 mt-0.5">MP4, WebM, MOV, PNG, JPG</span>
              <input type="file" accept="video/*,image/*" onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Stock Sample Media */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-300">Stock Sample Videos</h4>
              <div className="space-y-2">
                {sampleVideos.map((vid) => (
                  <div
                    key={vid.id}
                    onClick={() => {
                      const newClip: TimelineClip = {
                        id: 'clip_' + Date.now(),
                        trackId: 'track_video_1',
                        name: vid.name,
                        type: 'video',
                        startTime: project.currentTime,
                        duration: vid.duration,
                        color: '#8b5cf6',
                      };
                      setProject((prev) => ({ ...prev, clips: [...prev.clips, newClip] }));
                    }}
                    className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 rounded-xl cursor-pointer transition"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{vid.thumbnail}</span>
                      <div>
                        <div className="font-semibold text-gray-200">{vid.name}</div>
                        <div className="text-[10px] text-gray-400">{vid.duration}s • HD 1080p</div>
                      </div>
                    </div>
                    <FiPlus className="text-purple-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEXT & TITLES */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-pink-400 flex items-center space-x-1.5 mb-1">
                <FiType />
                <span>3D & 2D Typography</span>
              </h3>
              <p className="text-gray-400 text-[11px]">Insert animated 3D titles and lower thirds.</p>
            </div>

            <div className="space-y-2">
              {textPresets.map((txt, i) => (
                <button
                  key={i}
                  onClick={() => handleAddTextClip(txt)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500/40 rounded-xl p-3 text-left transition flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-gray-200" style={{ color: txt.color }}>
                      {txt.content}
                    </div>
                    <div className="text-[10px] text-gray-400">
                      {txt.name} {txt.is3D && '• 3D Extruded'}
                    </div>
                  </div>
                  <FiPlus className="text-pink-400" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: FILTERS & FX */}
        {activeTab === 'fx' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-emerald-400 flex items-center space-x-1.5 mb-1">
                <FiSliders />
                <span>Video Filters & LUTs</span>
              </h3>
              <p className="text-gray-400 text-[11px]">Real-time shader filter presets & adjustments.</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'none', label: 'Normal' },
                { id: 'cyberpunk', label: 'Cyberpunk Neon' },
                { id: 'vhs', label: 'Retro VHS Scan' },
                { id: 'matrix', label: 'Matrix Code' },
                { id: 'sunset', label: 'Golden Sunset' },
                { id: 'noir', label: 'Noir Cinema' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleFilterPresetChange(f.id)}
                  className={`p-2.5 rounded-xl border text-center font-semibold transition ${
                    project.filters.preset === f.id
                      ? 'bg-emerald-600/30 border-emerald-500/60 text-emerald-300'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Manual Sliders */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span>Brightness:</span>
                  <span>{project.filters.brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={project.filters.brightness}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, brightness: parseInt(e.target.value) },
                    }))
                  }
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span>Contrast:</span>
                  <span>{project.filters.contrast}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="180"
                  value={project.filters.contrast}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, contrast: parseInt(e.target.value) },
                    }))
                  }
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span>Glitch Distortion:</span>
                  <span>{project.filters.glitchIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.filters.glitchIntensity}
                  onChange={(e) =>
                    setProject((prev) => ({
                      ...prev,
                      filters: { ...prev.filters, glitchIntensity: parseInt(e.target.value) },
                    }))
                  }
                  className="w-full accent-pink-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIO */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-sm text-amber-400 flex items-center space-x-1.5 mb-1">
                <FiMusic />
                <span>Audio Tracks & FX</span>
              </h3>
              <p className="text-gray-400 text-[11px]">Background music and audio visualizer presets.</p>
            </div>

            <div className="space-y-2">
              {[
                { name: 'Synthwave Odyssey', duration: '2:45', genre: 'Cyberpunk Synth' },
                { name: 'Deep Space Bass', duration: '3:10', genre: 'Cinematic Ambient' },
                { name: 'Neon City Pulse', duration: '1:55', genre: 'Electronic Beats' },
              ].map((track, i) => (
                <div
                  key={i}
                  onClick={() => {
                    const newClip: TimelineClip = {
                      id: 'audio_' + Date.now(),
                      trackId: 'track_audio_1',
                      name: track.name,
                      type: 'audio',
                      startTime: project.currentTime,
                      duration: 30,
                      color: '#f59e0b',
                    };
                    setProject((prev) => ({ ...prev, clips: [...prev.clips, newClip] }));
                  }}
                  className="flex items-center justify-between p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 rounded-xl cursor-pointer transition"
                >
                  <div className="flex items-center space-x-2.5">
                    <FiDisc className="text-amber-400 text-lg animate-spin" />
                    <div>
                      <div className="font-semibold text-gray-200">{track.name}</div>
                      <div className="text-[10px] text-gray-400">{track.genre} • {track.duration}</div>
                    </div>
                  </div>
                  <FiPlus className="text-amber-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
