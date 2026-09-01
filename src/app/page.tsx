'use client';

import React from 'react';
import { Navbar } from '../components/Navbar';
import { PortfolioView } from '../components/PortfolioView';

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col bg-[var(--bg-dark)] text-gray-100 overflow-hidden font-sans transition-colors duration-700">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Portfolio View */}
      <div className="flex-1 overflow-y-auto">
        <PortfolioView />
      </div>
    </div>
  );
}
