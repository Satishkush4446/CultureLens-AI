import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { startNewTrip } = useTrip();

  const handleLogoClick = () => {
    startNewTrip();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0A0F1E]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          onClick={handleLogoClick}
          className="flex cursor-pointer items-center space-x-2 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-all duration-300">
            {/* Camera SVG icon */}
            <svg 
              className="h-5.5 w-5.5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors duration-200">
            CultureLens<span className="text-sky-400">AI</span>
          </span>
        </div>

        {/* Action Button */}
        {location.pathname === '/dashboard' && (
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-1.5 cursor-pointer rounded-lg bg-sky-500/10 px-4 py-2 text-xs font-semibold text-sky-400 border border-sky-500/20 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300"
          >
            {/* Search SVG icon */}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Plan Another Journey</span>
          </button>
        )}
      </div>
    </header>
  );
}
