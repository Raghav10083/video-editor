'use client';

import React, { useState, useMemo } from 'react';
import { PORTFOLIO_PROJECTS, YOUTUBE_CHANNEL_URL } from '../data/portfolioData';
import { PortfolioProject, ProjectCategory } from '../types/portfolio';
import { useTheme } from '../context/ThemeContext';
import { 
  FiPlay, 
  FiX, 
  FiEye, 
  FiAward, 
  FiCpu, 
  FiLayers, 
  FiClock, 
  FiSearch,
  FiExternalLink,
  FiSmartphone,
  FiTv,
  FiYoutube
} from 'react-icons/fi';

export const ProjectGallery: React.FC = () => {
  const { config } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);

  const categories: { id: ProjectCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'longform', label: 'Long-Form 16:9 Edits 📺' },
    { id: 'cinematic', label: 'Cinematic Edits 🎬' },
    { id: 'talking_head', label: 'Casual Talking Head 🎙️' },
    { id: 'ugc', label: 'UGC & Creator Edits 📱' },
  ];

  const filteredProjects = useMemo(() => {
    return PORTFOLIO_PROJECTS.filter((p) => {
      const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        p.title.toLowerCase().includes(q) || 
        p.client.toLowerCase().includes(q) || 
        p.software.some(sw => sw.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="projects-gallery" className="py-24 bg-[var(--bg-dark)] border-b border-purple-900/20 relative transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-2"
                 style={{ color: config.accentPrimary }}>
              <FiLayers />
              <span>LONG-FORM & VERTICAL PORTFOLIO SHOWCASE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected <span className={`bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>Scripts, Concepts & Edits</span>
            </h2>
          </div>

          {/* Search Bar & YouTube Link */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search edits, scripts..."
                className="w-full bg-gray-950/80 border text-xs text-white px-4 py-3 pl-10 rounded-xl outline-none transition"
                style={{ borderColor: config.borderTheme }}
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-500 text-sm" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <FiYoutube className="text-base" />
              <span>TXnbStudios</span>
            </a>
          </div>
        </div>

        {/* Category Filter Navigation */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? 'text-white border-transparent shadow-lg scale-105 font-bold'
                    : 'bg-gray-950/60 border-purple-900/40 text-gray-400 hover:text-white'
                }`}
                style={isActive ? { backgroundImage: `linear-gradient(to right, ${config.accentPrimary}, ${config.accentSecondary})` } : {}}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid: Dynamic Layout supporting 16:9 Landscape & 9:16 Portrait Cards */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-gray-500 text-sm glass-panel rounded-2xl">
            No edits found matching "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-start">
            {filteredProjects.map((project) => {
              const isLandscape = project.aspect === '16:9' || project.category === 'longform';
              
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveModalProject(project)}
                  className={`group glass-panel rounded-3xl overflow-hidden border hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col shadow-2xl relative ${
                    isLandscape ? 'sm:col-span-2 lg:col-span-2' : ''
                  }`}
                  style={{ borderColor: config.borderTheme }}
                >
                  {/* Video Stream Container (16:9 Landscape or 9:16 Portrait) */}
                  <div className={`relative w-full overflow-hidden bg-black ${isLandscape ? 'aspect-video' : 'aspect-[9/16]'}`}>
                    {project.drivePreviewUrl ? (
                      <iframe
                        src={project.drivePreviewUrl}
                        className="w-full h-full border-0 pointer-events-none scale-105 opacity-90 group-hover:opacity-100 transition-opacity"
                        title={project.title}
                      />
                    ) : (
                      <video
                        src={project.videoUrl}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity"
                      />
                    )}
                    
                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-85" />

                    {/* Aspect Format Pill */}
                    <span className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md text-xs px-2.5 py-1 rounded-full font-mono border flex items-center space-x-1"
                          style={{ color: config.accentPrimary, borderColor: config.borderTheme }}>
                      {isLandscape ? <FiTv className="text-[10px]" /> : <FiSmartphone className="text-[10px]" />}
                      <span>{isLandscape ? '16:9 Landscape' : '9:16 Vertical'}</span>
                    </span>

                    {/* Category Pill */}
                    <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full uppercase font-bold tracking-wider border"
                          style={{ borderColor: config.borderTheme }}>
                      {project.category.toUpperCase()}
                    </span>

                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-14 h-14 rounded-full text-white flex items-center justify-center pl-1 group-hover:scale-110 transition-all duration-300 shadow-2xl"
                           style={{ backgroundColor: config.accentPrimary }}>
                        <FiPlay className="text-xl" />
                      </div>
                    </div>

                    {/* Bottom Info Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end pointer-events-none">
                      <span className="text-[11px] font-semibold tracking-wide block mb-1" style={{ color: config.accentPrimary }}>
                        {project.client} • {project.duration}
                      </span>
                      <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug mb-2">
                        {project.title}
                      </h3>

                      {/* Software tags */}
                      <div className="flex flex-wrap gap-1">
                        {project.software.map((sw, idx) => (
                          <span key={idx} className="text-[9px] bg-gray-900/90 text-gray-300 px-2 py-0.5 rounded font-mono border border-gray-800">
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Video Breakdown Modal (Adapts to 16:9 Wide or 9:16 Vertical) */}
        {activeModalProject && (() => {
          const isLandscape = activeModalProject.aspect === '16:9' || activeModalProject.category === 'longform';
          
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
              <div className={`bg-[#0b0e1b] border rounded-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 flex flex-col ${
                isLandscape ? 'max-w-4xl space-y-6' : 'max-w-4xl md:flex-row gap-8'
              }`} style={{ borderColor: config.borderTheme }}>
                
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-gray-900/90 text-gray-300 hover:text-white transition flex items-center justify-center border"
                  style={{ borderColor: config.borderTheme }}
                >
                  <FiX className="text-xl" />
                </button>

                {/* Video Player Column */}
                <div className={isLandscape ? 'w-full' : 'w-full md:w-80 shrink-0 mx-auto'}>
                  <div className={`relative w-full bg-black rounded-2xl overflow-hidden border shadow-2xl ${
                    isLandscape ? 'aspect-video' : 'aspect-[9/16]'
                  }`} style={{ borderColor: config.borderTheme }}>
                    {activeModalProject.drivePreviewUrl ? (
                      <iframe
                        src={activeModalProject.drivePreviewUrl}
                        className="w-full h-full border-0"
                        allow="autoplay"
                        allowFullScreen
                        title={activeModalProject.title}
                      />
                    ) : (
                      <video
                        src={activeModalProject.videoUrl}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                {/* Project Details Column */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold block mb-1" style={{ color: config.accentPrimary }}>
                      {activeModalProject.category.toUpperCase()} • {isLandscape ? '16:9 LANDSCAPE FORMAT' : '9:16 VERTICAL FORMAT'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                      {activeModalProject.title}
                    </h3>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                      {activeModalProject.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-1.5"
                          style={{ color: config.accentPrimary }}>
                        <FiCpu />
                        <span>Script, Strategy & Edit Highlights</span>
                      </h4>
                      <ul className="space-y-2">
                        {activeModalProject.keyHighlights.map((hl, i) => (
                          <li key={i} className="text-gray-300 text-xs flex items-start space-x-2">
                            <span style={{ color: config.accentPrimary }} className="mt-0.5">✓</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* External Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-purple-900/30">
                    {activeModalProject.drivePreviewUrl && (
                      <a
                        href={activeModalProject.drivePreviewUrl.replace('/preview', '/view')}
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gray-900 border text-gray-200 hover:text-white font-medium text-xs flex items-center space-x-2 transition"
                        style={{ borderColor: config.borderTheme }}
                      >
                        <span>Open Drive File</span>
                        <FiExternalLink />
                      </a>
                    )}

                    <a
                      href={activeModalProject.youtubeUrl || YOUTUBE_CHANNEL_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg transition"
                    >
                      <FiYoutube className="text-base" />
                      <span>Watch on @TXnbStudios</span>
                    </a>
                  </div>

                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
