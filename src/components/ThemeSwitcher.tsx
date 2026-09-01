'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { THEME_CONFIGS } from '../data/themeConfig';
import { ThemeMode } from '../types/theme';
import { FiEye, FiCheck, FiSliders } from 'react-icons/fi';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, config } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative z-50">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-950/80 border border-purple-500/30 hover:border-cyan-400 text-xs font-semibold text-gray-200 transition shadow-lg backdrop-blur-md"
        title="Change Portfolio Aesthetic Theme"
      >
        <span className="text-sm">{config.icon}</span>
        <span className="hidden sm:inline font-mono tracking-wide">{config.name}</span>
        <FiSliders className="text-cyan-400 text-xs" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-[#0b0d19]/95 border border-purple-500/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl animate-fadeIn space-y-1.5">
          <div className="px-2 py-1 border-b border-purple-900/40 mb-2 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest font-mono text-cyan-400 font-bold">
              CINEMATIC THEME ENGINE
            </span>
            <span className="text-[10px] text-gray-500">5 Presets</span>
          </div>

          {(Object.keys(THEME_CONFIGS) as ThemeMode[]).map((mode) => {
            const item = THEME_CONFIGS[mode];
            const isActive = theme === mode;
            return (
              <button
                key={mode}
                onClick={() => {
                  setTheme(mode);
                  setIsOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition group ${
                  isActive
                    ? 'bg-purple-950/70 border-cyan-400 shadow-md shadow-purple-900/30'
                    : 'bg-gray-900/40 border-purple-900/20 hover:border-purple-500/40 hover:bg-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <span className={`text-xs font-bold block leading-tight ${isActive ? 'text-cyan-300' : 'text-white group-hover:text-cyan-200'}`}>
                      {item.name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-light block line-clamp-1">
                      {item.subtitle}
                    </span>
                  </div>
                </div>

                {/* Color Swatch Indicators */}
                <div className="flex items-center space-x-1 pl-2">
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: item.accentPrimary }}
                  />
                  <span
                    className="w-3 h-3 rounded-full border border-white/30"
                    style={{ backgroundColor: item.accentSecondary }}
                  />
                  {isActive && <FiCheck className="text-cyan-400 text-xs ml-1" />}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
