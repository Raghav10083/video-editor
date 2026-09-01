'use client';

import React from 'react';
import Link from 'next/link';
import { FiFilm, FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07080d] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-cyan-400 text-3xl mb-6 shadow-xl">
        <FiFilm />
      </div>
      <h1 className="text-4xl font-extrabold mb-2">404 — Frame Not Found</h1>
      <p className="text-gray-400 text-sm max-w-md mb-8 font-light">
        The video sequence or page you requested doesn't exist on this timeline.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition flex items-center space-x-2"
      >
        <FiArrowLeft />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}
