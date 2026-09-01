'use client';

import React, { useState } from 'react';
import { 
  FiFilm, FiDownload, FiShare2, FiSave, FiMonitor, 
  FiBox, FiGrid, FiHelpCircle, FiEdit3, FiCheck, FiFolder
} from 'react-icons/fi';
import { AspectRatio, Resolution, ProjectState } from '../types/editor';

interface NavbarProps {
  project: ProjectState;
  setProject: React.Dispatch<React.SetStateAction<ProjectState>>;
  onOpenExport: () => void;
  onOpenShortcuts: () => void;
  onSaveProject: () => void;
  onLoadSampleProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  project,
  setProject,
  onOpenExport,
  onOpenShortcuts,
  onSaveProject,
  onLoadSampleProject,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(project.title);

  const handleTitleSubmit = () => {
    if (tempTitle.trim()) {
      setProject((prev) => ({ ...prev, title: tempTitle.trim() }));
    }
    setIsEditingTitle(false);
  };

  const handleAspectRatioChange = (ratio: AspectRatio) => {
    setProject((prev) => ({ ...prev, aspectRatio: ratio }));
  };

  const handleViewportChange = (mode: '2d' | '3d' | 'split') => {
    setProject((prev) => ({ ...prev, viewportMode: mode }));
  };

  return (
    <header className="h-16 bg-[#0a0b12]/90 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between z-40 relative">
      {/* Left Section: Logo & Project Title */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-950/60 to-cyan-950/60 p-2 rounded-xl border border-purple-500/30">
          <div className="relative w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-cyan-400 rounded-lg shadow-lg shadow-purple-500/30 animate-pulse">
            <FiBox className="text-white text-xl" />
          </div>
          <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent">
            CINEFLUX <span className="text-xs px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">3D</span>
          </span>
        </div>

        <div className="h-6 w-px bg-white/10" />

        {/* Project Title Editor */}
        <div className="flex items-center space-x-2">
          {isEditingTitle ? (
            <div className="flex items-center space-x-1">
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
                autoFocus
                className="bg-white/10 text-white text-sm px-2.5 py-1 rounded border border-purple-500/50 outline-none focus:ring-1 focus:ring-purple-400"
              />
              <button
                onClick={handleTitleSubmit}
                className="p-1 hover:bg-emerald-500/20 text-emerald-400 rounded transition"
              >
                <FiCheck />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingTitle(true)}
              className="flex items-center space-x-2 text-sm font-medium text-gray-200 hover:text-white group px-2 py-1 rounded hover:bg-white/5 transition"
            >
              <span>{project.title}</span>
              <FiEdit3 className="opacity-0 group-hover:opacity-100 text-gray-400 text-xs transition" />
            </button>
          )}
        </div>
      </div>

      {/* Middle Section: Viewport Modes & Aspect Ratio */}
      <div className="flex items-center space-x-4">
        {/* Viewport Mode Switcher */}
        <div className="bg-white/5 p-1 rounded-lg border border-white/10 flex items-center space-x-1">
          <button
            onClick={() => handleViewportChange('2d')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition ${
              project.viewportMode === '2d'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="2D Standard Video View"
          >
            <FiMonitor className="text-sm" />
            <span>2D Canvas</span>
          </button>
          <button
            onClick={() => handleViewportChange('3d')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition ${
              project.viewportMode === '3d'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="3D Spatial WebGL Studio"
          >
            <FiBox className="text-sm" />
            <span>3D Studio</span>
          </button>
          <button
            onClick={() => handleViewportChange('split')}
            className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition ${
              project.viewportMode === 'split'
                ? 'bg-pink-600 text-white shadow-md shadow-pink-600/40'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title="Split Dual View"
          >
            <FiGrid className="text-sm" />
            <span>Split View</span>
          </button>
        </div>

        {/* Aspect Ratio Picker */}
        <div className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-lg border border-white/10">
          <span className="text-xs text-gray-400 mr-1">Aspect:</span>
          {(['16:9', '9:16', '1:1', '4:3'] as AspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              onClick={() => handleAspectRatioChange(ratio)}
              className={`px-2 py-0.5 rounded text-xs font-medium transition ${
                project.aspectRatio === ratio
                  ? 'bg-white/20 text-white font-bold border border-white/30'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {ratio}
            </button>
          ))}
        </div>
      </div>

      {/* Right Section: Tools, Presets & Export */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onLoadSampleProject}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-purple-300 border border-purple-500/20 hover:border-purple-500/40 transition"
          title="Load Demo Project Template"
        >
          <FiFolder className="text-purple-400" />
          <span>Demo Template</span>
        </button>

        <button
          onClick={onSaveProject}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 hover:text-white border border-white/10 transition"
          title="Save Project Setup"
        >
          <FiSave className="text-cyan-400" />
          <span>Save</span>
        </button>

        <button
          onClick={onOpenShortcuts}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition"
          title="Keyboard Shortcuts"
        >
          <FiHelpCircle />
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <FiDownload className="text-sm" />
          <span>EXPORT VIDEO</span>
        </button>
      </div>
    </header>
  );
};
