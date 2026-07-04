import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import GlassCard from '../common/GlassCard';
import MapView from './MapView';
import ItineraryTab from './ItineraryTab';
import CultureTab from './CultureTab';
import HiddenGemsTab from './HiddenGemsTab';
import FoodTab from './FoodTab';
import WeatherTab from './WeatherTab';
import PackingTab from './PackingTab';

const TABS = [
  {
    id: 'itinerary',
    label: 'Itinerary',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'culture',
    label: 'Culture',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'gems',
    label: 'Hidden Gems',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 'food',
    label: 'Food',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: 'weather',
    label: 'Weather',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
  },
  {
    id: 'packing',
    label: 'Packing',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const {
    destination,
    duration,
    interests,
    tripData,
    weatherData,
    gems,
    coords,
    activeTab,
    setActiveTab,
    loading,
    isDemo,
  } = useTrip();

  // If no data and not loading, redirect home
  useEffect(() => {
    if (!tripData && !loading) {
      navigate('/');
    }
  }, [tripData, loading, navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'itinerary':
        return <ItineraryTab itinerary={tripData?.itinerary} />;
      case 'culture':
        return <CultureTab tripData={tripData} />;
      case 'gems':
        return <HiddenGemsTab gems={gems} />;
      case 'food':
        return <FoodTab food={tripData?.food} />;
      case 'weather':
        return <WeatherTab weatherData={weatherData} />;
      case 'packing':
        return <PackingTab packing={tripData?.packing} />;
      default:
        return <ItineraryTab itinerary={tripData?.itinerary} />;
    }
  };

  const destinationName = tripData?.destination?.name || destination || 'Your Destination';
  const countryName = tripData?.destination?.country || '';
  const summary = tripData?.destination?.summary || '';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#0A0F1E]">
      {/* Ambient glow */}
      <div className="fixed top-32 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Demo Mode Banner ── */}
        {isDemo && (
          <div className="mb-6 flex items-center space-x-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
            <svg className="h-4 w-4 flex-shrink-0 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-amber-300">
              <span className="font-bold">Demo Mode</span> — Showing curated Kyoto sample data. Add a{' '}
              <code className="rounded bg-amber-500/10 px-1 font-mono text-amber-400">VITE_GEMINI_API_KEY</code>{' '}
              in <code className="rounded bg-amber-500/10 px-1 font-mono text-amber-400">.env</code> for live AI-generated results.
            </p>
          </div>
        )}

        {/* ── Destination Header ── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                  Cultural Journey
                </span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {destinationName}
                {countryName && (
                  <span className="ml-2 text-xl font-normal text-slate-400">{countryName}</span>
                )}
              </h1>
              {summary && (
                <p className="mt-2 text-sm text-slate-400 max-w-2xl leading-relaxed">{summary}</p>
              )}
            </div>

            {/* Meta badges */}
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center space-x-1.5 rounded-lg border border-sky-500/20 bg-sky-500/5 px-3 py-1.5 text-xs font-semibold text-sky-400">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{duration || 5} Days</span>
              </span>
              {interests && interests.length > 0 && interests.map((interest) => (
                <span key={interest} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300">
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Interactive Map ── */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Destination Map
            </h2>
            {coords && (
              <span className="text-xxs font-mono text-slate-600">
                {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
              </span>
            )}
          </div>
          <div
            className="relative overflow-hidden rounded-2xl border border-white/5 shadow-xl shadow-black/20"
            style={{ height: '340px' }}
          >
            <MapView coords={coords} gems={gems} />
            {/* Map overlay legend */}
            <div className="absolute bottom-3 left-3 z-[400] flex flex-col space-y-1.5 pointer-events-none">
              {[
                { color: '#F97316', label: 'Destination' },
                { color: '#F59E0B', label: 'Historic' },
                { color: '#14B8A6', label: 'Cultural' },
                { color: '#A855F7', label: 'Temple' },
                { color: '#22C55E', label: 'Nature' },
              ].map((item) => (
                <div key={item.label} className="flex items-center space-x-1.5">
                  <div
                    className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}80` }}
                  />
                  <span
                    className="text-xxs font-medium"
                    style={{
                      color: '#E2E8F0',
                      textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Navigation ── */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex min-w-max space-x-1 rounded-xl border border-white/5 bg-white/3 p-1.5">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap
                    ${isActive
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <div className="w-full">
          {renderTabContent()}
        </div>

      </div>
    </div>
  );
}
