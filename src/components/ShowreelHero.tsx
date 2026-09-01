'use client';

import React, { useState, useRef, useEffect } from 'react';
import { HERO_SHOWREEL_URL, YOUTUBE_CHANNEL_URL } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { 
  FiPlay, 
  FiPause, 
  FiVolume2, 
  FiVolumeX, 
  FiArrowRight, 
  FiFilm,
  FiPhone,
  FiTrendingUp,
  FiEdit3,
  FiVideo
} from 'react-icons/fi';

interface ShowreelHeroProps {
  onExploreClick: () => void;
}

export const ShowreelHero: React.FC<ShowreelHeroProps> = ({ onExploreClick }) => {
  const { config } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--bg-dark)] border-b border-purple-900/20 transition-colors duration-700">
      
      {/* Background Video Stream Showcase */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src={HERO_SHOWREEL_URL}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover filter brightness-[0.35] contrast-125 scale-105 transition-all duration-1000"
        />
        {/* Radial Dark Gradient Backdrop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-dark)] via-[var(--bg-dark)]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-dark)]/90 via-transparent to-[var(--bg-dark)]/90" />
      </div>

      {/* Hero Central Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center">
        
        {/* Core Skills Pill Badge */}
        <div className="inline-flex items-center space-x-2 bg-gray-950/80 backdrop-blur-xl px-4 py-2 rounded-full border mb-8 shadow-xl"
             style={{ borderColor: config.borderTheme }}>
          <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: config.accentPrimary }} />
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-white flex items-center space-x-2">
            <span>Content Strategist</span>
            <span>•</span>
            <span>Content Writer</span>
            <span>•</span>
            <span>Video Editor</span>
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.1] mb-6">
          Content Strategy, Scriptwriting & <span className={`bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>Video Editing</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mb-10 leading-relaxed font-light">
          Turning ideas into high-retention video content. Specialized in strategic planning, story copywriting, and precision video editing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14 w-full max-w-2xl">
          <button
            onClick={onExploreClick}
            className="px-6 py-4 rounded-xl text-white font-semibold text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-3 group"
            style={{ backgroundImage: `linear-gradient(to right, ${config.accentPrimary}, ${config.accentSecondary})` }}
          >
            <span>Explore Portfolio</span>
            <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:7973949855"
            className="px-6 py-4 rounded-xl bg-gray-900/90 border text-white font-semibold text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2 font-mono"
            style={{ borderColor: config.borderTheme }}
          >
            <FiPhone style={{ color: config.accentPrimary }} />
            <span>+91 7973949855</span>
          </a>

          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-4 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-semibold text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>YouTube (@TXnbStudios) 📺</span>
          </a>
        </div>

        {/* Video Player Floating Controls */}
        <div className="flex items-center space-x-4 bg-gray-950/80 backdrop-blur-xl p-2.5 rounded-2xl border"
             style={{ borderColor: config.borderTheme }}>
          
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:scale-105 transition border"
            style={{ borderColor: config.borderTheme }}
          >
            {isPlaying ? <FiPause /> : <FiPlay className="pl-0.5" />}
          </button>

          <div className="flex items-center space-x-1 px-3 py-1 font-mono text-xs text-gray-300">
            <FiFilm style={{ color: config.accentPrimary }} />
            <span className="hidden sm:inline">Showreel Stream</span>
          </div>

          <button
            onClick={toggleMute}
            className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:scale-105 transition border"
            style={{ borderColor: config.borderTheme }}
          >
            {isMuted ? <FiVolumeX className="text-gray-400" /> : <FiVolume2 style={{ color: config.accentPrimary }} />}
          </button>
        </div>

      </div>
    </section>
  );
};
