'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiFilm, FiPhone } from 'react-icons/fi';

export const Footer: React.FC = () => {
  const { config } = useTheme();

  return (
    <footer className="bg-[#05060a] border-t border-purple-900/30 py-12 transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg p-0.5"
               style={{ backgroundImage: `linear-gradient(to top right, ${config.accentPrimary}, ${config.accentSecondary})` }}>
            <div className="w-full h-full bg-[#07080d] rounded-[6px] flex items-center justify-center">
              <FiFilm className="text-sm" style={{ color: config.accentPrimary }} />
            </div>
          </div>
          <div>
            <span className={`font-extrabold text-sm tracking-wider bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>
              CINECRAFT
            </span>
            <p className="text-[10px] text-gray-500 font-mono">
              Content Strategist • Content Writer • Video Editor
            </p>
          </div>
        </div>

        {/* Contact Phone Number */}
        <a
          href="tel:7973949855"
          className="inline-flex items-center space-x-2 text-xs font-mono text-gray-300 hover:text-white px-4 py-2 rounded-xl bg-gray-900 border"
          style={{ borderColor: config.borderTheme }}
        >
          <FiPhone style={{ color: config.accentPrimary }} />
          <span>Contact: +91 7973949855</span>
        </a>

        {/* Copyright */}
        <div className="text-xs text-gray-500 font-mono">
          © {new Date().getFullYear()} CineCraft Portfolio. All rights reserved.
        </div>

      </div>
    </footer>
  );
};
