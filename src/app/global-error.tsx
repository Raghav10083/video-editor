'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#07080d] text-white flex flex-col items-center justify-center min-h-screen p-6 text-center font-sans">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 text-sm mb-6">{error?.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-xs hover:bg-purple-500 transition"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
