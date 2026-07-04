import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../../context/TripContext';
import GlassCard from '../common/GlassCard';

const INTERESTS_PRESETS = [
  { id: 'History', label: 'History & Temples', icon: '🏛️' },
  { id: 'Food', label: 'Street Food & Dining', icon: '🍜' },
  { id: 'Art', label: 'Art & Museums', icon: '🎨' },
  { id: 'Nature', label: 'Nature & Parks', icon: '🌿' },
  { id: 'Festivals', label: 'Festivals & Music', icon: '🏮' },
  { id: 'Architecture', label: 'Architecture', icon: '🕌' },
  { id: 'Shopping', label: 'Local Markets', icon: '🛍️' },
  { id: 'Nightlife', label: 'Nightlife & Drinks', icon: '🌙' },
];

export default function SearchForm() {
  const navigate = useNavigate();
  const { executeSearch, loading } = useTrip();

  const [destinationInput, setDestinationInput] = useState('');
  const [durationInput, setDurationInput] = useState(5);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [validationError, setValidationError] = useState('');

  const toggleInterest = useCallback((id) => {
    setSelectedInterests(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setValidationError('');

    if (!destinationInput.trim()) {
      setValidationError('Please enter a destination name (e.g. Kyoto, Tokyo, Paris).');
      return;
    }

    // Trigger context search
    executeSearch(destinationInput, durationInput, selectedInterests, navigate);
  }, [destinationInput, durationInput, selectedInterests, executeSearch, navigate]);

  return (
    <GlassCard className="w-full max-w-2xl mx-auto border-white/10 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Destination Search */}
        <div className="space-y-2 text-left">
          <label htmlFor="destination" className="text-sm font-semibold tracking-wide text-slate-300">
            Where do you want to experience?
          </label>
          <div className="relative">
            <input
              id="destination"
              type="text"
              aria-invalid={!!validationError}
              aria-describedby={validationError ? "destination-error" : undefined}
              className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3.5 pl-11 text-white placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus:outline-none transition-all duration-200"
              placeholder="e.g. Kyoto, Oaxaca, Rome, Rajasthan..."
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
              disabled={loading}
            />
            {/* Search Icon */}
            <svg 
              className="absolute left-4 top-4 h-5 w-5 text-slate-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414zM10 16a6 6 0 100-12 6 6 0 000 12z" />
            </svg>
          </div>
          {validationError && (
            <p id="destination-error" role="alert" className="text-xs text-orange-400 mt-1 flex items-center space-x-1">
              <span aria-hidden="true">⚠️</span> <span>{validationError}</span>
            </p>
          )}
        </div>

        {/* Duration Picker */}
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between">
            <label htmlFor="duration" className="text-sm font-semibold tracking-wide text-slate-300">
              Trip Duration
            </label>
            <span className="text-sm font-bold text-sky-400">{durationInput} Days</span>
          </div>
          <input
            id="duration"
            type="range"
            min="1"
            max="10"
            className="w-full h-1.5 rounded-lg bg-slate-800 accent-sky-500 cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none focus:outline-none"
            value={durationInput}
            onChange={(e) => setDurationInput(parseInt(e.target.value))}
            disabled={loading}
          />
          <div className="flex justify-between text-xxs text-slate-400">
            <span>1 Day</span>
            <span>3 Days</span>
            <span>5 Days</span>
            <span>7 Days</span>
            <span>10 Days</span>
          </div>
        </div>

        {/* Cultural Interest Chips */}
        <div className="space-y-2 text-left">
          <span id="interests-group-label" className="text-sm font-semibold tracking-wide text-slate-300 block">
            Select Your Cultural Interests
          </span>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 pt-1" role="group" aria-labelledby="interests-group-label">
            {INTERESTS_PRESETS.map((interest) => {
              const isSelected = selectedInterests.includes(interest.id);
              return (
                <button
                  key={interest.id}
                  type="button"
                  onClick={() => toggleInterest(interest.id)}
                  disabled={loading}
                  aria-pressed={isSelected}
                  className={`
                    flex items-center space-x-2 rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-300 cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none
                    ${isSelected 
                      ? 'border-sky-500/50 bg-sky-500/10 text-white shadow-lg shadow-sky-500/5' 
                      : 'border-white/5 bg-white/3 text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-300'
                    }
                  `}
                >
                  <span className="text-sm" aria-hidden="true">{interest.icon}</span>
                  <span className="truncate">{interest.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            aria-disabled={loading}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-sky-500/10 transition-all duration-300 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none"
          >
            <span>Reveal Local Culture</span>
            <svg 
              className="h-4.5 w-4.5 text-white animate-bounce-horizontal" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

      </form>
    </GlassCard>
  );
}
