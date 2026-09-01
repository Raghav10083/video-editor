'use client';

import React, { useRef, useState, useEffect } from 'react';
import { 
  FiPlay, FiPause, FiRepeat, FiScissors, FiTrash2, FiVolume2, 
  FiVolumeX, FiEye, FiEyeOff, FiLock, FiUnlock, FiPlus, 
  FiZoomIn, FiZoomOut, FiRewind, FiFastForward
} from 'react-icons/fi';
import { ProjectState, TimelineClip, TimelineTrack } from '../types/editor';

interface MultiTrackTimelineProps {
  project: ProjectState;
  setProject: React.Dispatch<React.SetStateAction<ProjectState>>;
}

export const MultiTrackTimeline: React.FC<MultiTrackTimelineProps> = ({
  project,
  setProject,
}) => {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [draggedClipId, setDraggedClipId] = useState<string | null>(null);

  // Time formatting utility: MM:SS:MS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  // Playhead Animation Loop
  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (project.isPlaying) {
        setProject((prev) => {
          let nextTime = prev.currentTime + delta;
          if (nextTime >= prev.duration) {
            if (prev.isLooping) {
              nextTime = 0;
            } else {
              return { ...prev, currentTime: prev.duration, isPlaying: false };
            }
          }
          return { ...prev, currentTime: nextTime };
        });
      }

      animationFrame = requestAnimationFrame(tick);
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [project.isPlaying, project.isLooping, setProject]);

  // Handle Play/Pause Toggle
  const togglePlay = () => {
    setProject((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  // Scrubbing on Timeline Click
  const handleTimelineScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pxPerSec = 30 * (project.zoomLevel || 1);
    const newTime = Math.max(0, Math.min(project.duration, clickX / pxPerSec));
    setProject((prev) => ({ ...prev, currentTime: newTime }));
  };

  // Split Clip Tool
  const handleSplitClip = () => {
    if (!project.selectedClipId) return;

    const clip = project.clips.find((c) => c.id === project.selectedClipId);
    if (!clip) return;

    const cutPoint = project.currentTime;
    if (cutPoint <= clip.startTime || cutPoint >= clip.startTime + clip.duration) return;

    const firstDuration = cutPoint - clip.startTime;
    const secondDuration = clip.duration - firstDuration;

    const updatedClip1: TimelineClip = { ...clip, duration: firstDuration };
    const updatedClip2: TimelineClip = {
      ...clip,
      id: clip.id + '_split_' + Date.now(),
      name: clip.name + ' (Part 2)',
      startTime: cutPoint,
      duration: secondDuration,
    };

    setProject((prev) => ({
      ...prev,
      clips: prev.clips.map((c) => (c.id === clip.id ? updatedClip1 : c)).concat(updatedClip2),
      selectedClipId: updatedClip2.id,
    }));
  };

  // Delete Clip Tool
  const handleDeleteClip = () => {
    if (!project.selectedClipId) return;

    setProject((prev) => ({
      ...prev,
      clips: prev.clips.filter((c) => c.id !== prev.selectedClipId),
      selectedClipId: null,
    }));
  };

  // Track Mute/Hide Toggles
  const toggleTrackMute = (trackId: string) => {
    setProject((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) => (t.id === trackId ? { ...t, muted: !t.muted } : t)),
    }));
  };

  const toggleTrackHide = (trackId: string) => {
    setProject((prev) => ({
      ...prev,
      tracks: prev.tracks.map((t) => (t.id === trackId ? { ...t, hidden: !t.hidden } : t)),
    }));
  };

  const pxPerSec = 30 * (project.zoomLevel || 1);
  const totalWidthPx = project.duration * pxPerSec;
  const playheadX = project.currentTime * pxPerSec;

  return (
    <div className="h-64 bg-[#0a0b12] border-t border-white/10 flex flex-col z-30 select-none">
      {/* Control Bar Header */}
      <div className="h-11 bg-[#0d0f1a] border-b border-white/10 px-4 flex items-center justify-between text-xs">
        {/* Left: Playback Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setProject((prev) => ({ ...prev, currentTime: 0 }))}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
            title="Rewind to Start"
          >
            <FiRewind />
          </button>

          <button
            onClick={togglePlay}
            className={`p-2 rounded-xl text-white font-bold transition flex items-center justify-center ${
              project.isPlaying
                ? 'bg-amber-600 shadow-md shadow-amber-600/30'
                : 'bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30'
            }`}
            title="Play / Pause (Space)"
          >
            {project.isPlaying ? <FiPause /> : <FiPlay className="ml-0.5" />}
          </button>

          <button
            onClick={() =>
              setProject((prev) => ({
                ...prev,
                currentTime: Math.min(prev.duration, prev.currentTime + 1),
              }))
            }
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition"
            title="Step Forward 1s"
          >
            <FiFastForward />
          </button>

          <button
            onClick={() => setProject((prev) => ({ ...prev, isLooping: !prev.isLooping }))}
            className={`p-1.5 rounded-lg border transition ${
              project.isLooping
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
            title="Toggle Loop"
          >
            <FiRepeat />
          </button>

          <div className="h-4 w-px bg-white/10 mx-1" />

          {/* Time Counter */}
          <div className="font-mono text-sm font-bold text-cyan-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">
            {formatTime(project.currentTime)} / {formatTime(project.duration)}
          </div>
        </div>

        {/* Middle: Editing Tools (Split, Delete) */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleSplitClip}
            disabled={!project.selectedClipId}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-40 text-purple-300 border border-purple-500/20 transition"
            title="Split Clip at Playhead (S)"
          >
            <FiScissors />
            <span>Split (S)</span>
          </button>

          <button
            onClick={handleDeleteClip}
            disabled={!project.selectedClipId}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-red-500/20 disabled:opacity-40 text-red-400 border border-red-500/20 transition"
            title="Delete Selected Clip (Del)"
          >
            <FiTrash2 />
            <span>Delete</span>
          </button>
        </div>

        {/* Right: Timeline Zoom Slider */}
        <div className="flex items-center space-x-2 text-gray-400">
          <FiZoomOut />
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.2"
            value={project.zoomLevel || 1}
            onChange={(e) =>
              setProject((prev) => ({ ...prev, zoomLevel: parseFloat(e.target.value) }))
            }
            className="w-24 accent-purple-400"
          />
          <FiZoomIn />
        </div>
      </div>

      {/* Main Track Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Track Headers Panel */}
        <div className="w-56 bg-[#070810] border-r border-white/10 flex flex-col divide-y divide-white/5">
          {/* Header spacer */}
          <div className="h-6 bg-[#0c0e18] border-b border-white/10 px-3 text-[10px] text-gray-400 flex items-center font-bold uppercase tracking-wider">
            TRACKS
          </div>

          {project.tracks.map((track) => (
            <div
              key={track.id}
              className="h-11 px-3 flex items-center justify-between text-xs hover:bg-white/5 transition"
            >
              <div className="flex items-center space-x-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
                <span className="font-semibold text-gray-300">{track.name}</span>
              </div>

              <div className="flex items-center space-x-1 text-gray-400">
                <button
                  onClick={() => toggleTrackMute(track.id)}
                  className={`p-1 rounded hover:text-white ${track.muted ? 'text-red-400' : ''}`}
                >
                  {track.muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
                <button
                  onClick={() => toggleTrackHide(track.id)}
                  className={`p-1 rounded hover:text-white ${track.hidden ? 'text-amber-400' : ''}`}
                >
                  {track.hidden ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Scrollable Timeline Canvas */}
        <div
          ref={timelineRef}
          onClick={handleTimelineScrub}
          className="flex-1 overflow-x-auto overflow-y-hidden relative bg-[#090a12] cursor-pointer"
        >
          <div style={{ width: `${Math.max(1200, totalWidthPx)}px` }} className="relative h-full">
            {/* Time Ruler Bar */}
            <div className="h-6 bg-[#0c0e18] border-b border-white/10 relative text-[10px] text-gray-400 font-mono flex items-center">
              {Array.from({ length: Math.ceil(project.duration / 2) + 1 }).map((_, i) => {
                const sec = i * 2;
                return (
                  <div
                    key={sec}
                    className="absolute top-0 bottom-0 border-l border-white/10 pl-1 pt-0.5"
                    style={{ left: `${sec * pxPerSec}px` }}
                  >
                    {formatTime(sec).substring(3, 8)}
                  </div>
                );
              })}
            </div>

            {/* Track Lanes */}
            <div className="divide-y divide-white/5 relative">
              {project.tracks.map((track) => {
                const trackClips = project.clips.filter((c) => c.trackId === track.id);
                return (
                  <div key={track.id} className="h-11 relative bg-white/[0.01] hover:bg-white/[0.02]">
                    {trackClips.map((clip) => {
                      const isSelected = clip.id === project.selectedClipId;
                      const clipLeft = clip.startTime * pxPerSec;
                      const clipWidth = clip.duration * pxPerSec;

                      return (
                        <div
                          key={clip.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setProject((prev) => ({ ...prev, selectedClipId: clip.id }));
                          }}
                          style={{
                            left: `${clipLeft}px`,
                            width: `${clipWidth}px`,
                            backgroundColor: (clip.color || track.color) + '44',
                            borderColor: isSelected ? '#38bdf8' : clip.color || track.color,
                          }}
                          className={`absolute top-1 bottom-1 rounded-lg border-2 px-2 flex items-center justify-between text-xs font-semibold cursor-move shadow-md transition-all ${
                            isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black z-10' : ''
                          }`}
                        >
                          <span className="truncate text-white text-[11px]">{clip.name}</span>
                          <span className="text-[9px] text-white/70 font-mono">
                            {clip.duration.toFixed(1)}s
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Playhead Red Scrubber Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none shadow-lg shadow-red-500/80"
                style={{ left: `${playheadX}px` }}
              >
                <div className="w-3 h-3 bg-red-500 rounded-b -ml-1.25 shadow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
