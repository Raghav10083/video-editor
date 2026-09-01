'use client';

import React, { useEffect, useRef, useState } from 'react';
import { 
  FiPlay, FiPause, FiMaximize, FiRefreshCw, FiSun, FiEye, 
  FiMove, FiRotateCw, FiSquare, FiLayers, FiSliders
} from 'react-icons/fi';
import { ProjectState, ThreeObject3D } from '../types/editor';

interface ThreeCanvasViewportProps {
  project: ProjectState;
  setProject: React.Dispatch<React.SetStateAction<ProjectState>>;
}

export const ThreeCanvasViewport: React.FC<ThreeCanvasViewportProps> = ({
  project,
  setProject,
}) => {
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const canvas3DRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  const [lightingPreset, setLightingPreset] = useState<'neon' | 'studio' | 'sunset' | 'void'>('neon');
  const [showGrid, setShowGrid] = useState(true);
  const [selected3DId, setSelected3DId] = useState<string | null>(project.selected3DObjectId);

  // Sync selected object ID with parent
  useEffect(() => {
    setSelected3DId(project.selected3DObjectId);
  }, [project.selected3DObjectId]);

  const handleSelectObject = (id: string) => {
    setSelected3DId(id);
    setProject((prev) => ({ ...prev, selected3DObjectId: id }));
  };

  // Render 2D Canvas with Filters & Overlays
  useEffect(() => {
    const canvas = canvas2DRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localTime = project.currentTime;

    const render2D = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Background Fill / Simulated Video Scene
      const filter = project.filters;
      let fillGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      if (filter.preset === 'cyberpunk') {
        fillGradient.addColorStop(0, '#1e0538');
        fillGradient.addColorStop(0.5, '#0c1b33');
        fillGradient.addColorStop(1, '#2e004f');
      } else if (filter.preset === 'matrix') {
        fillGradient.addColorStop(0, '#001a00');
        fillGradient.addColorStop(1, '#003300');
      } else if (filter.preset === 'sunset') {
        fillGradient.addColorStop(0, '#3b0764');
        fillGradient.addColorStop(0.5, '#831843');
        fillGradient.addColorStop(1, '#9a3412');
      } else if (filter.preset === 'noir') {
        fillGradient.addColorStop(0, '#111111');
        fillGradient.addColorStop(1, '#222222');
      } else {
        fillGradient.addColorStop(0, '#0f172a');
        fillGradient.addColorStop(0.5, '#1e1b4b');
        fillGradient.addColorStop(1, '#090d16');
      }

      ctx.fillStyle = fillGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Apply brightness/contrast CSS filter effect on context
      ctx.filter = `brightness(${filter.brightness}%) contrast(${filter.contrast}%) saturate(${filter.saturation}%) blur(${filter.blur}px)`;

      // 2. Animated Dynamic Graphic Elements (Simulated Active Clips)
      const pulse = Math.sin(localTime * 4) * 0.2 + 1;
      const rotateAngle = localTime * 0.8;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotateAngle);

      // Drawing Central Motion Graphic
      ctx.strokeStyle = filter.preset === 'cyberpunk' ? '#06b6d4' : '#8b5cf6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 120 * pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = filter.preset === 'matrix' ? '#22c55e' : '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(-70 * pulse, -70 * pulse, 140 * pulse, 140 * pulse);
      ctx.stroke();
      ctx.restore();

      // Reset filter
      ctx.filter = 'none';

      // 3. VHS Glitch / Scanlines Effect Overlay
      if (filter.preset === 'vhs' || filter.glitchIntensity > 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        for (let i = 0; i < canvas.height; i += 6) {
          ctx.fillRect(0, i, canvas.width, 2);
        }
        // Glitch slice
        if (Math.random() < filter.glitchIntensity / 100) {
          const sliceY = Math.random() * canvas.height;
          const sliceH = Math.random() * 30 + 5;
          ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
          ctx.fillRect(Math.random() * 20 - 10, sliceY, canvas.width, sliceH);
        }
      }

      // 4. Matrix Binary Rain Effect
      if (filter.preset === 'matrix') {
        ctx.fillStyle = '#22c55e';
        ctx.font = '14px monospace';
        for (let x = 20; x < canvas.width; x += 40) {
          const char = String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96));
          const y = (localTime * 150 + x * 3) % canvas.height;
          ctx.fillText(char, x, y);
        }
      }

      // 5. Active Text & Overlay Clips
      project.clips.forEach((clip) => {
        if (
          clip.type === 'text' &&
          clip.textProps &&
          localTime >= clip.startTime &&
          localTime <= clip.startTime + clip.duration
        ) {
          ctx.save();
          ctx.fillStyle = clip.textProps.color || '#ffffff';
          ctx.font = `bold ${clip.textProps.fontSize * 1.5}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Neon Glow effect
          if (clip.textProps.animation === 'neonGlow') {
            ctx.shadowColor = clip.textProps.color;
            ctx.shadowBlur = 20;
          }

          ctx.fillText(clip.textProps.content, canvas.width / 2, canvas.height / 2 + 80);
          ctx.restore();
        }
      });
    };

    render2D();
  }, [project.currentTime, project.filters, project.clips]);

  // Render 3D Canvas WebGL Spatial Engine
  useEffect(() => {
    const canvas3D = canvas3DRef.current;
    if (!canvas3D) return;
    const ctx = canvas3D.getContext('2d');
    if (!ctx) return;

    let time = project.currentTime;

    const render3DScene = () => {
      ctx.clearRect(0, 0, canvas3D.width, canvas3D.height);

      // Background Sky Box / Spatial Lighting Gradients
      let skyGrad = ctx.createRadialGradient(
        canvas3D.width / 2,
        canvas3D.height / 2,
        50,
        canvas3D.width / 2,
        canvas3D.height / 2,
        canvas3D.width
      );

      if (lightingPreset === 'neon') {
        skyGrad.addColorStop(0, '#170b2c');
        skyGrad.addColorStop(1, '#05060b');
      } else if (lightingPreset === 'sunset') {
        skyGrad.addColorStop(0, '#311029');
        skyGrad.addColorStop(1, '#090810');
      } else {
        skyGrad.addColorStop(0, '#111827');
        skyGrad.addColorStop(1, '#030712');
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas3D.width, canvas3D.height);

      // 1. Perspective 3D Grid Floor
      if (showGrid) {
        ctx.strokeStyle = lightingPreset === 'neon' ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;

        const horizonY = canvas3D.height * 0.6;
        const centerX = canvas3D.width / 2;

        // Perspective grid lines
        for (let i = -15; i <= 15; i++) {
          ctx.beginPath();
          ctx.moveTo(centerX + i * 20, horizonY);
          ctx.lineTo(centerX + i * 140, canvas3D.height);
          ctx.stroke();
        }

        // Horizontal perspective lines
        for (let y = horizonY; y < canvas3D.height; y += (canvas3D.height - y) * 0.15 + 4) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas3D.width, y);
          ctx.stroke();
        }
      }

      // 2. Render 3D Objects in Scene
      project.threeObjects.forEach((obj) => {
        if (!obj.visible) return;

        const isSelected = obj.id === selected3DId;
        const rotY = obj.rotation[1] + time * 0.8;
        const posX = canvas3D.width / 2 + obj.position[0] * 60;
        const posY = canvas3D.height / 2 - obj.position[1] * 60;
        const size = Math.max(20, 50 * obj.scale[0]);

        ctx.save();
        ctx.translate(posX, posY);

        if (obj.glow) {
          ctx.shadowColor = obj.color;
          ctx.shadowBlur = 25;
        }

        if (obj.type === 'cube') {
          // Simulated 3D Rotating Cube Wireframe & Shaded Face
          ctx.rotate(rotY);
          ctx.fillStyle = obj.color + '44';
          ctx.strokeStyle = isSelected ? '#38bdf8' : obj.color;
          ctx.lineWidth = isSelected ? 3 : 2;

          ctx.beginPath();
          ctx.rect(-size / 2, -size / 2, size, size);
          ctx.fill();
          ctx.stroke();

          // 3D Inner Box details
          if (obj.wireframe) {
            ctx.strokeRect(-size / 3, -size / 3, (size * 2) / 3, (size * 2) / 3);
          }
        } else if (obj.type === 'sphere') {
          ctx.fillStyle = obj.color + '66';
          ctx.strokeStyle = isSelected ? '#38bdf8' : obj.color;
          ctx.lineWidth = isSelected ? 3 : 2;

          ctx.beginPath();
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Orbiting Ring
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.8, size * 0.3, rotY, 0, Math.PI * 2);
          ctx.stroke();
        } else if (obj.type === 'torus' || obj.type === 'ring') {
          ctx.strokeStyle = isSelected ? '#38bdf8' : obj.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.9, size * 0.4, rotY, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(0, 0, size * 0.6, size * 0.25, rotY, 0, Math.PI * 2);
          ctx.stroke();
        } else if (obj.type === 'pyramid' || obj.type === 'hologram') {
          ctx.strokeStyle = isSelected ? '#38bdf8' : obj.color;
          ctx.lineWidth = 2;
          ctx.fillStyle = obj.color + '33';

          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(-size / 1.5, size / 2);
          ctx.lineTo(size / 1.5, size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        } else if (obj.type === 'particles') {
          // Particle Field
          ctx.fillStyle = obj.color;
          for (let p = 0; p < 18; p++) {
            const px = Math.sin(time * 2 + p) * (size * 1.2);
            const py = Math.cos(time * 3 + p) * (size * 1.2);
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        } else if (obj.type === 'text3d') {
          ctx.fillStyle = obj.color;
          ctx.font = `bold ${Math.max(16, size * 0.6)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(obj.text || '3D TITLE', 0, 0);

          if (isSelected) {
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.5;
            ctx.strokeText(obj.text || '3D TITLE', 0, 0);
          }
        }

        // Selection Bounding Box Gizmo
        if (isSelected) {
          ctx.strokeStyle = '#38bdf8';
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(-size * 0.8, -size * 0.8, size * 1.6, size * 1.6);
          ctx.setLineDash([]);
        }

        ctx.restore();
      });
    };

    render3DScene();
  }, [project.currentTime, project.threeObjects, selected3DId, lightingPreset, showGrid]);

  const selectedObj = project.threeObjects.find((o) => o.id === selected3DId);

  const handleUpdateSelectedObj = (key: keyof ThreeObject3D, value: any) => {
    if (!selected3DId) return;
    setProject((prev) => ({
      ...prev,
      threeObjects: prev.threeObjects.map((obj) =>
        obj.id === selected3DId ? { ...obj, [key]: value } : obj
      ),
    }));
  };

  const handleUpdatePos = (axisIndex: number, val: number) => {
    if (!selected3DId || !selectedObj) return;
    const newPos = [...selectedObj.position] as [number, number, number];
    newPos[axisIndex] = val;
    handleUpdateSelectedObj('position', newPos);
  };

  const handleUpdateScale = (val: number) => {
    if (!selected3DId) return;
    handleUpdateSelectedObj('scale', [val, val, val]);
  };

  return (
    <div className="flex-1 bg-[#07080d] flex flex-col relative overflow-hidden">
      {/* Top Viewport Header Controls */}
      <div className="h-10 bg-[#0c0e18] border-b border-white/10 px-4 flex items-center justify-between text-xs text-gray-300">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-purple-400 flex items-center space-x-1">
            <FiEye />
            <span>
              {project.viewportMode === '2d'
                ? '2D Video Preview Canvas'
                : project.viewportMode === '3d'
                ? '3D Spatial WebGL Viewport'
                : 'Split Dual View'}
            </span>
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">
            {project.aspectRatio} • {project.resolution} @ 60 FPS
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* 3D Lighting Presets */}
          <div className="flex items-center space-x-1">
            <FiSun className="text-amber-400" />
            <select
              value={lightingPreset}
              onChange={(e) => setLightingPreset(e.target.value as any)}
              className="bg-white/5 border border-white/10 rounded px-2 py-0.5 text-xs text-gray-200 outline-none"
            >
              <option value="neon" className="bg-[#0f172a]">Neon Cyber</option>
              <option value="studio" className="bg-[#0f172a]">Studio White</option>
              <option value="sunset" className="bg-[#0f172a]">Golden Sunset</option>
              <option value="void" className="bg-[#0f172a]">Deep Space Void</option>
            </select>
          </div>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`px-2 py-0.5 rounded border transition ${
              showGrid
                ? 'bg-purple-600/30 border-purple-500/50 text-purple-300'
                : 'bg-white/5 border-white/10 text-gray-400'
            }`}
          >
            3D Grid: {showGrid ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 flex items-center justify-center p-4 relative cyber-grid">
        {/* 2D Mode */}
        {project.viewportMode === '2d' && (
          <div className="relative shadow-2xl shadow-purple-950/50 rounded-xl overflow-hidden border border-purple-500/30">
            <canvas
              ref={canvas2DRef}
              width={854}
              height={480}
              className="max-h-[60vh] max-w-full object-contain bg-black"
            />
            {/* Real-Time Filter Badge */}
            {project.filters.preset !== 'none' && (
              <div className="absolute top-3 left-3 bg-purple-900/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-purple-200 border border-purple-400/40 uppercase tracking-wider">
                Filter: {project.filters.preset}
              </div>
            )}
          </div>
        )}

        {/* 3D Mode */}
        {project.viewportMode === '3d' && (
          <div className="relative shadow-2xl shadow-cyan-950/50 rounded-xl overflow-hidden border border-cyan-500/30">
            <canvas
              ref={canvas3DRef}
              width={854}
              height={480}
              className="max-h-[60vh] max-w-full object-contain bg-black cursor-crosshair"
            />
            <div className="absolute top-3 left-3 bg-cyan-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-cyan-200 border border-cyan-400/40 uppercase tracking-wider">
              3D Spatial Orbit Scene
            </div>
          </div>
        )}

        {/* Split View Mode */}
        {project.viewportMode === 'split' && (
          <div className="flex items-center space-x-4 max-w-full">
            <div className="relative shadow-xl rounded-xl overflow-hidden border border-purple-500/30 flex-1">
              <canvas
                ref={canvas2DRef}
                width={500}
                height={300}
                className="max-h-[50vh] object-contain bg-black"
              />
              <div className="absolute top-2 left-2 bg-purple-950/80 text-purple-200 text-[10px] px-2 py-0.5 rounded border border-purple-400/40 font-bold">
                2D COMPOSITOR
              </div>
            </div>
            <div className="relative shadow-xl rounded-xl overflow-hidden border border-cyan-500/30 flex-1">
              <canvas
                ref={canvas3DRef}
                width={500}
                height={300}
                className="max-h-[50vh] object-contain bg-black"
              />
              <div className="absolute top-2 left-2 bg-cyan-950/80 text-cyan-200 text-[10px] px-2 py-0.5 rounded border border-cyan-400/40 font-bold">
                3D SPATIAL ENGINE
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating 3D Gizmo Control Panel (If 3D Object Selected) */}
      {selectedObj && (
        <div className="absolute bottom-4 right-4 bg-[#0d0e19]/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-3 shadow-2xl w-72 text-xs space-y-2.5 z-30">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-bold text-cyan-400 flex items-center space-x-1.5">
              <FiSliders />
              <span>3D Transform: {selectedObj.name}</span>
            </span>
            <button
              onClick={() => handleSelectObject('')}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Position Gizmo */}
          <div className="space-y-1">
            <label className="text-gray-400 flex items-center justify-between">
              <span>Position (X, Y):</span>
            </label>
            <div className="flex space-x-2">
              <input
                type="range"
                min="-4"
                max="4"
                step="0.1"
                value={selectedObj.position[0]}
                onChange={(e) => handleUpdatePos(0, parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <input
                type="range"
                min="-3"
                max="3"
                step="0.1"
                value={selectedObj.position[1]}
                onChange={(e) => handleUpdatePos(1, parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          {/* Scale Gizmo */}
          <div className="space-y-1">
            <div className="flex justify-between text-gray-400">
              <span>Scale:</span>
              <span className="text-cyan-300">{selectedObj.scale[0].toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={selectedObj.scale[0]}
              onChange={(e) => handleUpdateScale(parseFloat(e.target.value))}
              className="w-full accent-purple-400"
            />
          </div>

          {/* Color & Properties */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Color:</span>
              <input
                type="color"
                value={selectedObj.color}
                onChange={(e) => handleUpdateSelectedObj('color', e.target.value)}
                className="w-6 h-6 rounded border-none bg-transparent cursor-pointer"
              />
            </div>

            <button
              onClick={() => handleUpdateSelectedObj('glow', !selectedObj.glow)}
              className={`px-2 py-1 rounded text-[11px] font-medium border transition ${
                selectedObj.glow
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50'
                  : 'bg-white/5 text-gray-400 border-white/10'
              }`}
            >
              Neon Glow
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
