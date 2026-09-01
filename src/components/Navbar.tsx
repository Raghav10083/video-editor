'use client';

import React from 'react';
import { FiFilm, FiPhone } from 'react-icons/fi';
import { ThemeSwitcher } from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { YOUTUBE_CHANNEL_URL } from '../data/portfolioData';

export const Navbar: React.FC = () => {
  const { config } = useTheme();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="h-16 bg-[#090b14]/90 backdrop-blur-xl border-b border-purple-900/40 px-4 sm:px-6 flex items-center justify-between z-50 sticky top-0 transition-colors duration-700">
      
      {/* Brand Logo */}
      <div 
        onClick={() => scrollToSection('projects-gallery')}
        className="flex items-center space-x-2.5 cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl p-0.5 shadow-lg group-hover:scale-105 transition-transform"
             style={{ backgroundImage: `linear-gradient(to top right, ${config.accentPrimary}, ${config.accentSecondary})` }}>
          <div className="w-full h-full bg-[#07080d] rounded-[10px] flex items-center justify-center">
            <FiFilm className="text-lg group-hover:rotate-12 transition-transform" style={{ color: config.accentPrimary }} />
          </div>
        </div>
        <div className="flex flex-col">
          <span className={`font-extrabold text-base tracking-wider bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent leading-none`}>
            CINECRAFT
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: config.accentPrimary }}>
            STRATEGY • WRITING • EDITING
          </span>
        </div>
      </div>

      {/* Navigation Core Skills */}
      <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold tracking-wide text-gray-300">
        <button onClick={() => scrollToSection('skills-overview')} className="hover:text-white transition flex items-center space-x-1.5">
          <span>Content Strategist</span>
        </button>
        <span className="text-gray-600">•</span>
        <button onClick={() => scrollToSection('skills-overview')} className="hover:text-white transition flex items-center space-x-1.5">
          <span>Content Writer</span>
        </button>
        <span className="text-gray-600">•</span>
        <button onClick={() => scrollToSection('projects-gallery')} className="hover:text-white transition flex items-center space-x-1.5">
          <span>Video Editor</span>
        </button>
      </nav>

      {/* Right Controls: Phone, YouTube Channel & Theme Switcher */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <a
          href="tel:7973949855"
          className="px-3 py-1.5 rounded-xl bg-gray-900 border text-white text-xs font-bold font-mono transition flex items-center space-x-1.5 shadow-md hover:border-cyan-500"
          style={{ borderColor: config.borderTheme }}
        >
          <FiPhone className="text-xs" style={{ color: config.accentPrimary }} />
          <span>7973949855</span>
        </a>

        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex px-3 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white text-xs font-bold transition items-center space-x-1 shadow-md"
        >
          <span>@TXnbStudios 📺</span>
        </a>

        <ThemeSwitcher />
      </div>

    </header>
  );
};
