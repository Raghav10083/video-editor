'use client';

import React from 'react';
import { ShowreelHero } from './ShowreelHero';
import { SkillsOverview } from './SkillsOverview';
import { FoodScientistSection } from './FoodScientistSection';
import { ProjectGallery } from './ProjectGallery';
import { Footer } from './Footer';

export const PortfolioView: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-dark)] text-gray-100 overflow-y-auto selection:bg-purple-600 selection:text-white transition-colors duration-700">
      {/* Hero Showreel */}
      <ShowreelHero
        onExploreClick={() => scrollToSection('projects-gallery')}
      />

      {/* Core Skills: Content Strategist, Content Writer, Video Editor */}
      <SkillsOverview />

      {/* Food Scientist Collaboration Section */}
      <FoodScientistSection />

      {/* Featured Projects Gallery */}
      <ProjectGallery />

      {/* Footer */}
      <Footer />
    </div>
  );
};
