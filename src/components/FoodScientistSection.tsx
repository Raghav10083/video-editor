'use client';

import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  FiCalendar, 
  FiSmartphone, 
  FiAward, 
  FiPlay, 
  FiX, 
  FiExternalLink, 
  FiCpu 
} from 'react-icons/fi';

interface FoodScientistVideo {
  id: string;
  title: string;
  drivePreviewUrl: string;
  driveViewUrl: string;
  duration: string;
  description: string;
  highlights: string[];
}

const FOOD_SCIENTIST_VIDEOS: FoodScientistVideo[] = [
  {
    id: 'food_1',
    title: 'Food Science Breakdown #1',
    drivePreviewUrl: 'https://drive.google.com/file/d/1mjaj4852OR1ZbkkIH4y_MEqiKHjq1Irz/preview',
    driveViewUrl: 'https://drive.google.com/file/d/1mjaj4852OR1ZbkkIH4y_MEqiKHjq1Irz/view?usp=drive_link',
    duration: '00:48',
    description: 'High-retention 9:16 portrait food science edit structured with hook strategy and Adobe Premiere Pro video editing.',
    highlights: [
      'Hook strategy & opening visual alignment',
      'Visual pacing & food science content flow',
      'Rhythmic video editing in Adobe Premiere Pro'
    ]
  },
  {
    id: 'food_2',
    title: 'Food Science Breakdown #2',
    drivePreviewUrl: 'https://drive.google.com/file/d/1CWwjfeumw_zQq2RyrgOKvFGtNMf1F9ej/preview',
    driveViewUrl: 'https://drive.google.com/file/d/1CWwjfeumw_zQq2RyrgOKvFGtNMf1F9ej/view?usp=drive_link',
    duration: '00:52',
    description: 'Engaging vertical food science reel featuring custom masking techniques, visual flow, and audio leveling in Adobe Premiere Pro.',
    highlights: [
      'Masking techniques & seamless overlays',
      'Visual flow & composition in Adobe Premiere Pro',
      'Audio mixing & sound design'
    ]
  },
  {
    id: 'food_3',
    title: 'Food Science Breakdown #3',
    drivePreviewUrl: 'https://drive.google.com/file/d/1CV3F7Rj27IvkChRxho_2zmlWVmOYqN9o/preview',
    driveViewUrl: 'https://drive.google.com/file/d/1CV3F7Rj27IvkChRxho_2zmlWVmOYqN9o/view?usp=drive_link',
    duration: '00:42',
    description: 'Conversational 9:16 portrait edit crafted for viral retention, pattern interrupts, and sound FX drops in Adobe Premiere Pro.',
    highlights: [
      'Content strategy & audience drop-off prevention',
      'Pattern interrupt editing in Adobe Premiere Pro',
      'Sound FX accent drops'
    ]
  }
];

export const FoodScientistSection: React.FC = () => {
  const { config } = useTheme();
  const [activeModalVideo, setActiveModalVideo] = useState<FoodScientistVideo | null>(null);

  return (
    <section id="food-scientist" className="py-24 bg-[var(--bg-dark)] border-b border-purple-900/20 relative transition-colors duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-gray-950/80 px-4 py-2 rounded-full border mb-4 text-xs font-mono font-bold uppercase shadow-xl"
               style={{ color: config.accentPrimary, borderColor: config.borderTheme }}>
            <FiAward />
            <span>FEATURED CREATOR COLLABORATION</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Worked with <span className={`bg-gradient-to-r ${config.textHighlight} bg-clip-text text-transparent`}>Food Scientist</span>
              </h2>
              <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold font-mono text-amber-400 bg-amber-950/40 border border-amber-500/30 px-3.5 py-1.5 rounded-xl mt-3">
                <FiCalendar />
                <span>September 2024 – December 2024</span>
              </div>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
              Content Strategy, Masking Techniques, and 9:16 Vertical Video Editing in Adobe Premiere Pro.
            </p>
          </div>
        </div>

        {/* 3 Portrait Videos Grid (9:16 Aspect Ratio) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FOOD_SCIENTIST_VIDEOS.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setActiveModalVideo(vid)}
              className="group glass-panel rounded-3xl overflow-hidden border hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col shadow-2xl relative"
              style={{ borderColor: config.borderTheme }}
            >
              {/* 9:16 Vertical Live Preview Stream */}
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
                <iframe
                  src={vid.drivePreviewUrl}
                  className="w-full h-full border-0 pointer-events-none scale-105 opacity-90 group-hover:opacity-100 transition-opacity"
                  title={vid.title}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-85" />

                {/* 9:16 Aspect Pill */}
                <span className="absolute top-3 right-3 bg-gray-950/80 backdrop-blur-md text-xs px-2.5 py-1 rounded-full font-mono border flex items-center space-x-1"
                      style={{ color: config.accentPrimary, borderColor: config.borderTheme }}>
                  <FiSmartphone className="text-[10px]" />
                  <span>9:16</span>
                </span>

                {/* Duration Pill */}
                <span className="absolute top-3 left-3 bg-gray-950/80 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-full uppercase font-bold font-mono border"
                      style={{ borderColor: config.borderTheme }}>
                  {vid.duration}
                </span>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 rounded-full text-white flex items-center justify-center pl-1 group-hover:scale-110 transition-all duration-300 shadow-2xl"
                       style={{ backgroundColor: config.accentPrimary }}>
                    <FiPlay className="text-xl" />
                  </div>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end pointer-events-none">
                  <span className="text-[11px] font-mono font-bold tracking-wide block mb-1" style={{ color: config.accentPrimary }}>
                    Food Scientist Collaboration
                  </span>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 leading-snug mb-2">
                    {vid.title}
                  </h3>

                  {/* Software Tag */}
                  <span className="text-[9px] bg-gray-900/90 text-gray-300 px-2 py-0.5 rounded font-mono border border-gray-800 self-start">
                    Adobe Premiere Pro
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Detail Breakdown Modal Popup */}
        {activeModalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn">
            <div className="bg-[#0b0e1b] border rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 flex flex-col md:flex-row gap-8"
                 style={{ borderColor: config.borderTheme }}>
              
              <button
                onClick={() => setActiveModalVideo(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-gray-900/90 text-gray-300 hover:text-white transition flex items-center justify-center border"
                style={{ borderColor: config.borderTheme }}
              >
                <FiX className="text-xl" />
              </button>

              {/* Left Column: 9:16 Vertical Video Player */}
              <div className="w-full md:w-80 shrink-0 mx-auto">
                <div className="relative aspect-[9/16] w-full bg-black rounded-2xl overflow-hidden border shadow-2xl"
                     style={{ borderColor: config.borderTheme }}>
                  <iframe
                    src={activeModalVideo.drivePreviewUrl}
                    className="w-full h-full border-0"
                    allow="autoplay"
                    allowFullScreen
                    title={activeModalVideo.title}
                  />
                </div>
              </div>

              {/* Right Column: Video Details */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold block mb-1" style={{ color: config.accentPrimary }}>
                    FOOD SCIENTIST COLLABORATION • 9:16 PORTRAIT FORMAT
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                    {activeModalVideo.title}
                  </h3>

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                    {activeModalVideo.description}
                  </p>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center space-x-1.5"
                        style={{ color: config.accentPrimary }}>
                      <FiCpu />
                      <span>Strategy & Edit Highlights</span>
                    </h4>
                    <ul className="space-y-2">
                      {activeModalVideo.highlights.map((hl, i) => (
                        <li key={i} className="text-gray-300 text-xs flex items-start space-x-2">
                          <span style={{ color: config.accentPrimary }} className="mt-0.5">✓</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Links */}
                <div className="pt-6 border-t border-purple-900/30">
                  <a
                    href={activeModalVideo.driveViewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gray-900 border text-gray-200 hover:text-white font-medium text-xs flex items-center space-x-2 transition inline-flex"
                    style={{ borderColor: config.borderTheme }}
                  >
                    <span>Open Drive File</span>
                    <FiExternalLink />
                  </a>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
