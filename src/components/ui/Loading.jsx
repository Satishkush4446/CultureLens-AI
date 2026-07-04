import React from 'react';
import GlassCard from '../common/GlassCard';

export default function Loading({ statusText }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0F1E]/90 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md text-center">
        {/* Animated Visual */}
        <div className="relative mx-auto mb-8 h-24 w-24">
          <div className="absolute inset-0 rounded-full border-4 border-sky-500/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-sky-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 animate-spin [animation-duration:1.5s]"></div>
          <div className="absolute inset-4 flex items-center justify-center">
            <svg 
              className="h-8 w-8 text-sky-400 animate-pulse" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
            </svg>
          </div>
        </div>

        {/* Text Details */}
        <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
          Configuring Your CultureLens
        </h3>
        <div className="mb-8 min-h-[24px]">
          <p className="text-sm text-sky-400 font-mono inline-block border-r-2 border-sky-400 animate-pulse px-1">
            {statusText || 'Executing search coordinates...'}
          </p>
        </div>

        {/* Shimmering Skeleton Mock */}
        <GlassCard className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg shimmer-loader flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded shimmer-loader"></div>
              <div className="h-3 w-1/2 rounded shimmer-loader"></div>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-2.5 w-full rounded shimmer-loader"></div>
            <div className="h-2.5 w-full rounded shimmer-loader"></div>
            <div className="h-2.5 w-3/4 rounded shimmer-loader"></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
