'use client';

import React from 'react';
import { FiCommand, FiX, FiCheck } from 'react-icons/fi';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', desc: 'Toggle Play / Pause Video Playback' },
    { key: 'S', desc: 'Split Selected Clip at Playhead' },
    { key: 'Delete / Backspace', desc: 'Delete Selected Clip or 3D Element' },
    { key: 'Ctrl + Z / ⌘Z', desc: 'Undo Last Editing Action' },
    { key: 'J / L', desc: 'Seek Backward / Forward 1 Second' },
    { key: 'M', desc: 'Mute Active Audio Track' },
    { key: 'F', desc: 'Toggle 3D Spatial Viewport Mode' },
    { key: 'Ctrl + S', desc: 'Save Project Config to Local Storage' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4">
      <div className="bg-[#0c0d18] border border-cyan-500/30 rounded-2xl w-full max-w-md shadow-2xl p-6 space-y-5 text-gray-200">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2">
            <FiCommand className="text-cyan-400 text-xl" />
            <h2 className="font-extrabold text-lg text-white">Keyboard Shortcuts</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <FiX />
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs"
            >
              <span className="text-gray-300 font-medium">{s.desc}</span>
              <kbd className="px-2 py-1 bg-cyan-950/80 border border-cyan-400/40 rounded text-cyan-200 font-mono text-[11px] font-bold">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
