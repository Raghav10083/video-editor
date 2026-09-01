'use client';

import React, { useState, useEffect } from 'react';
import { FiDownload, FiCheck, FiRefreshCw, FiZap, FiFilm, FiSliders, FiX } from 'react-icons/fi';
import { ProjectState, Resolution } from '../types/editor';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectState;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [format, setFormat] = useState<'mp4' | 'webm' | 'gif'>('mp4');
  const [resolution, setResolution] = useState<Resolution>(project.resolution);
  const [fps, setFps] = useState<30 | 60>(60);
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high');

  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderedFrame, setRenderedFrame] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const totalFrames = Math.floor(project.duration * fps);

  useEffect(() => {
    let interval: any;
    if (isRendering) {
      interval = setInterval(() => {
        setRenderProgress((prev) => {
          if (prev >= 100) {
            setIsRendering(false);
            setIsComplete(true);
            clearInterval(interval);
            return 100;
          }
          const next = prev + Math.random() * 8 + 4;
          const currentF = Math.min(totalFrames, Math.floor((next / 100) * totalFrames));
          setRenderedFrame(currentF);
          return next > 100 ? 100 : next;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isRendering, totalFrames]);

  const handleStartExport = () => {
    setIsRendering(true);
    setRenderProgress(0);
    setRenderedFrame(0);
    setIsComplete(false);
  };

  const handleDownload = () => {
    // Generate dummy blob for instant video file download simulation
    const dummyData = new Blob(['CineFlux 3D Video Render Data'], { type: 'video/mp4' });
    const url = URL.createObjectURL(dummyData);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '_')}_${resolution}_${fps}fps.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="bg-[#0c0d18] border border-purple-500/30 rounded-2xl w-full max-w-lg shadow-2xl shadow-purple-950/80 p-6 space-y-6 text-gray-200 relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 shadow-md">
              <FiFilm className="text-white text-lg" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-white">Export & Render Project</h2>
              <p className="text-xs text-gray-400">High-performance 3D WebGL frame compositor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        {!isRendering && !isComplete && (
          <div className="space-y-5">
            {/* Format Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Container Format:</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mp4', label: 'MP4 (H.264)', desc: 'Universal HD' },
                  { id: 'webm', label: 'WebM', desc: 'Web Alpha' },
                  { id: 'gif', label: 'Animated GIF', desc: 'Loop Graphic' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id as any)}
                    className={`p-3 rounded-xl border text-left transition ${
                      format === f.id
                        ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg shadow-purple-600/20'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-bold text-xs">{f.label}</div>
                    <div className="text-[10px] opacity-70">{f.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution & FPS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Output Resolution:</label>
                <select
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value as Resolution)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-purple-500"
                >
                  <option value="1080p" className="bg-[#0c0d18]">1080p Full HD (1920x1080)</option>
                  <option value="4K" className="bg-[#0c0d18]">4K Ultra HD (3840x2160)</option>
                  <option value="720p" className="bg-[#0c0d18]">720p HD (1280x720)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Frame Rate:</label>
                <div className="flex space-x-2">
                  {[30, 60].map((fVal) => (
                    <button
                      key={fVal}
                      onClick={() => setFps(fVal as any)}
                      className={`flex-1 py-2 rounded-xl border text-xs font-bold transition ${
                        fps === fVal
                          ? 'bg-cyan-600/30 border-cyan-500 text-cyan-200'
                          : 'bg-white/5 border-white/10 text-gray-400'
                      }`}
                    >
                      {fVal} FPS
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Render Action Button */}
            <button
              onClick={handleStartExport}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-purple-600/40 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
            >
              <FiZap />
              <span>START HIGH-SPEED RENDER</span>
            </button>
          </div>
        )}

        {/* Rendering Progress View */}
        {isRendering && (
          <div className="py-8 space-y-6 text-center">
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
              <div className="font-extrabold text-2xl text-purple-300 font-mono">
                {Math.floor(renderProgress)}%
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-lg text-white">Rendering WebGL Frames...</h3>
              <p className="text-xs text-gray-400 font-mono">
                Frame {renderedFrame} of {totalFrames} • Processing 3D shader filters
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 h-full rounded-full transition-all duration-200"
                style={{ width: `${renderProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion & Download View */}
        {isComplete && (
          <div className="py-6 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 rounded-full flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/30">
              <FiCheck />
            </div>

            <div className="space-y-1">
              <h3 className="font-extrabold text-xl text-white">Render Finished Successfully!</h3>
              <p className="text-xs text-gray-400">
                {project.title} • {resolution} @ {fps}FPS ({format.toUpperCase()})
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                onClick={() => setIsComplete(false)}
                className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs border border-white/10"
              >
                Render Again
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2"
              >
                <FiDownload />
                <span>DOWNLOAD FILE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
