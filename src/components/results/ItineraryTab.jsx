import { memo } from 'react';
import GlassCard from '../common/GlassCard';

const FALLBACK_ITINERARY = [
  {
    day: 1,
    theme: 'Historical Heart & Ancient Temples',
    morning: { activity: 'Visit the iconic ancient temples at dawn before the crowds arrive.', location: 'Ancient Temple District', culturalSignificance: 'These temples have been places of worship for over 1,200 years, embodying the spiritual core of local culture.' },
    afternoon: { activity: 'Explore the traditional artisan market and watch craftsmen at work.', location: 'Old Artisan Quarter', culturalSignificance: 'The craft traditions here have been passed down through generations, representing living cultural heritage.' },
    evening: { activity: 'Enjoy a traditional dinner and watch a local cultural performance.', location: 'Cultural Performance Hall', culturalSignificance: 'These performances preserve ancient storytelling traditions through music and dance.' },
  },
  {
    day: 2,
    theme: 'Local Markets & Culinary Discovery',
    morning: { activity: 'Wake up early to experience the vibrant morning market alongside locals.', location: 'Central Morning Market', culturalSignificance: 'Morning markets are the heartbeat of local life, where communities gather and commerce thrives since medieval times.' },
    afternoon: { activity: 'Take a guided street food tour through the old city neighborhoods.', location: 'Historic Food District', culturalSignificance: 'Street food culture here dates back centuries and reflects the city\'s trading history.' },
    evening: { activity: 'Sunset rooftop views over the historic skyline with local wine.', location: 'Rooftop Terrace Viewpoint', culturalSignificance: 'This vantage point offers a panoramic perspective of centuries of architectural history.' },
  },
];

const TimeSlotIcon = ({ period }) => {
  const icons = {
    morning: (
      <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    afternoon: (
      <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    evening: (
      <svg className="h-4 w-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
  };
  return icons[period] || null;
};

const ItineraryTab = memo(function ItineraryTab({ itinerary }) {
  const days = itinerary && itinerary.length > 0 ? itinerary : FALLBACK_ITINERARY;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2" aria-hidden="true">
        <div className="h-px flex-1 bg-white/5" />
        <span className="text-xs text-slate-400 font-medium">Day-by-Day Cultural Journey</span>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      {days.map((day) => (
        <GlassCard key={day.day} className="space-y-4">
          {/* Day Header */}
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400 text-sm font-bold border border-sky-500/20">
              D{day.day}
            </div>
            <div>
              <p className="text-xxs font-medium text-slate-400 uppercase tracking-widest">Day {day.day}</p>
              <h4 className="text-sm font-bold text-white">{day.theme}</h4>
            </div>
          </div>

          {/* Time Slots */}
          <div className="space-y-3 pl-2">
            {['morning', 'afternoon', 'evening'].map((period) => {
              const slot = day[period];
              if (!slot) return null;
              return (
                <div key={period} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-slate-800/50 border border-white/5">
                      <TimeSlotIcon period={period} />
                    </div>
                    {period !== 'evening' && <div className="mt-1 w-px flex-1 bg-white/5" aria-hidden="true" />}
                  </div>
                  <div className="pb-3 flex-1 min-w-0">
                    <p className="text-xxs font-semibold uppercase tracking-widest text-slate-400 capitalize mb-1">{period}</p>
                    <p className="text-sm text-slate-200 font-medium mb-1">{slot.activity}</p>
                    {slot.location && (
                      <div className="flex items-center space-x-1 mb-1.5">
                        <svg className="h-3 w-3 text-sky-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
                        </svg>
                        <span className="text-xxs text-sky-300 font-medium">{slot.location}</span>
                      </div>
                    )}
                    {slot.culturalSignificance && (
                      <p className="text-xxs text-slate-400 leading-relaxed border-l-2 border-sky-500/20 pl-2">
                        {slot.culturalSignificance}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      ))}
    </div>
  );
});

export default ItineraryTab;
