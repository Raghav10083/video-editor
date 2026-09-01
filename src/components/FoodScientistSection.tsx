'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiCalendar, FiSmartphone, FiAward, FiVideo, FiCheckCircle } from 'react-icons/fi';

interface FoodScientistSectionProps {
  onAddVideosClick?: () => void;
}

export const FoodScientistSection: React.FC<FoodScientistSectionProps> = () => {
  const { config } = useTheme();

  return (
    <section id="food-scientist" className="py-20 bg-[var(--bg-dark)] border-b border-purple-900/20 relative transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collaboration Banner Box */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0c0f1e] via-[#090b14] to-[var(--bg-dark)]"
             style={{ borderColor: config.borderTheme }}>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            
            {/* Left Info Column */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-gray-950/80 px-3.5 py-1.5 rounded-full border mb-4 text-xs font-mono font-bold uppercase"
                   style={{ color: config.accentPrimary, borderColor: config.borderTheme }}>
                <FiAward />
                <span>CREATOR COLLABORATION</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Worked with <span className={`bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>Food Scientist</span>
              </h2>

              <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-lg mb-6">
                <FiCalendar />
                <span>September 2024 – December 2024</span>
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                Provided specialized content strategy, video scriptwriting, and high-retention vertical video editing in Adobe Premiere Pro for Food Scientist content creation.
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['Content Strategy', 'Script Writing', 'Adobe Premiere Pro', 'Vertical 9:16 Edits'].map((tag, i) => (
                  <span key={i} className="bg-gray-950/90 text-gray-200 px-3 py-1 rounded-full font-mono border"
                        style={{ borderColor: config.borderTheme }}>
                    ✓ {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Video Slots Box */}
            <div className="w-full lg:w-96 shrink-0 bg-gray-950/80 p-6 rounded-2xl border text-center relative"
                 style={{ borderColor: config.borderTheme }}>
              
              <div className="w-12 h-12 rounded-xl bg-gray-900 border mx-auto flex items-center justify-center mb-3 text-cyan-400"
                   style={{ borderColor: config.borderTheme }}>
                <FiSmartphone className="text-2xl" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                Portrait Videos Showcase
              </h3>

              <p className="text-xs text-gray-400 font-light mb-4">
                Section ready for your Food Scientist portrait video uploads.
              </p>

              <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                <div className="p-3 bg-gray-900/90 border border-dashed rounded-xl text-gray-400 flex flex-col items-center justify-center space-y-1"
                     style={{ borderColor: config.borderTheme }}>
                  <FiVideo className="text-base" style={{ color: config.accentPrimary }} />
                  <span>Video 1 Ready</span>
                </div>
                <div className="p-3 bg-gray-900/90 border border-dashed rounded-xl text-gray-400 flex flex-col items-center justify-center space-y-1"
                     style={{ borderColor: config.borderTheme }}>
                  <FiVideo className="text-base" style={{ color: config.accentSecondary }} />
                  <span>Video 2 Ready</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
