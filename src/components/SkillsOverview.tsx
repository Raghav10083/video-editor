'use client';

import React from 'react';
import { USER_SKILLS } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { FiCheckCircle, FiEdit3, FiVideo, FiTrendingUp } from 'react-icons/fi';

export const SkillsOverview: React.FC = () => {
  const { config } = useTheme();

  const getSkillIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FiTrendingUp className="text-2xl" style={{ color: config.accentPrimary }} />;
      case 1:
        return <FiEdit3 className="text-2xl" style={{ color: config.accentSecondary }} />;
      default:
        return <FiVideo className="text-2xl" style={{ color: config.accentPrimary }} />;
    }
  };

  return (
    <section id="skills-overview" className="py-20 bg-[var(--bg-dark)] border-b border-purple-900/20 relative transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2"
               style={{ color: config.accentPrimary }}>
            <FiCheckCircle />
            <span>CORE EXPERTISE & SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Content Strategy, Writing & <span className={`bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>Video Editing</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mt-3 font-light">
            Combining strategic content planning, persuasive scriptwriting, and high-retention video editing for maximum audience engagement.
          </p>
        </div>

        {/* 3 Core Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {USER_SKILLS.map((skill, index) => (
            <div
              key={index}
              className="glass-panel p-8 rounded-3xl border hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 relative shadow-2xl flex flex-col justify-between"
              style={{ borderColor: config.borderTheme }}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gray-950 border flex items-center justify-center mb-6 shadow-lg"
                     style={{ borderColor: config.borderTheme }}>
                  {getSkillIcon(index)}
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-3">
                  {skill.title}
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light mb-6">
                  {skill.description}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs font-mono"
                   style={{ color: config.accentPrimary }}>
                <span>SPECIALIZATION 0{index + 1}</span>
                <span>✓ ACTIVE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
