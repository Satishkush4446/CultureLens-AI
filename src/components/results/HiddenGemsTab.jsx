import React from 'react';
import GlassCard from '../common/GlassCard';

const FALLBACK_GEMS = [
  { name: 'The Ancient Citadel', kinds: 'historic,monuments', rate: 3, description: 'A sprawling fortress dating back to the 9th century, offering panoramic views over the old city.' },
  { name: 'Hidden Silk Road Caravanserai', kinds: 'historic,architecture', rate: 3, description: 'A remarkably preserved waystation once used by merchants traveling the ancient Silk Road.' },
  { name: 'Sacred Underground Shrine', kinds: 'religion,cultural', rate: 2, description: 'An underground sanctuary carved directly into the rock, used by local communities for centuries.' },
  { name: 'Lost Imperial Gardens', kinds: 'nature,historic', rate: 2, description: 'Once part of a royal estate, now a quiet refuge where locals gather at dawn for meditation.' },
  { name: 'Artisan Pottery Village', kinds: 'cultural,architecture', rate: 2, description: 'A living museum where traditional pottery techniques unchanged since the Bronze Age are still practiced.' },
];

const kindColors = {
  historic: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  cultural: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
  religion: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  nature: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  architecture: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
  monuments: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

function getKindColor(kinds) {
  if (!kinds) return kindColors.cultural;
  const first = kinds.split(',')[0].trim();
  return kindColors[first] || kindColors.cultural;
}

function getKindLabel(kinds) {
  if (!kinds) return 'Cultural Site';
  const first = kinds.split(',')[0].trim();
  return first.charAt(0).toUpperCase() + first.slice(1);
}

const RatingStars = ({ rate }) => {
  const stars = Math.min(Math.max(rate || 1, 1), 3);
  return (
    <div className="flex space-x-0.5">
      {[1, 2, 3].map((s) => (
        <svg
          key={s}
          className={`h-3 w-3 ${s <= stars ? 'text-amber-400' : 'text-slate-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function HiddenGemsTab({ gems }) {
  const displayGems = gems && gems.length > 0 ? gems : FALLBACK_GEMS;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">{displayGems.length} hidden gems discovered near your destination</p>
        {(!gems || gems.length === 0) && (
          <span className="rounded-md border border-amber-500/20 bg-amber-500/5 px-2 py-0.5 text-xxs text-amber-400">Demo Data</span>
        )}
      </div>

      <div className="grid gap-4">
        {displayGems.map((gem, idx) => (
          <GlassCard key={idx} hoverEffect className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border ${getKindColor(gem.kinds)}`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{gem.name}</h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={`inline-block rounded border px-1.5 py-0.5 text-xxs font-medium ${getKindColor(gem.kinds)}`}>
                      {getKindLabel(gem.kinds)}
                    </span>
                    <RatingStars rate={gem.rate} />
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-slate-600 text-xxs font-mono">
                #{(idx + 1).toString().padStart(2, '0')}
              </div>
            </div>

            {gem.description && (
              <p className="text-xs text-slate-400 leading-relaxed pl-12">{gem.description}</p>
            )}

            {(gem.lat && gem.lon) && (
              <div className="flex items-center space-x-1 pl-12">
                <svg className="h-3 w-3 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <span className="text-xxs text-slate-600 font-mono">{gem.lat.toFixed(4)}, {gem.lon.toFixed(4)}</span>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
