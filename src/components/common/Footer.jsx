import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#070b15] py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-4 sm:flex-row sm:px-6 lg:px-8 text-slate-500 text-xs">
        <p className="mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} CultureLens AI. Built with Gemini, OpenTripMap, & Open-Meteo.
        </p>
        <p className="flex items-center space-x-1">
          <span>Made for</span>
          <span className="font-semibold text-sky-400/80">Prompt Wars Hackathon</span>
          <span>⚡</span>
        </p>
      </div>
    </footer>
  );
}
