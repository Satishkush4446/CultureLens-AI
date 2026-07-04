import React from 'react';
import GlassCard from '../common/GlassCard';

// WMO Weather Interpretation Code mapping
function getWeatherInfo(code) {
  if (code === 0) return { label: 'Clear Sky', icon: '☀️', color: 'text-amber-400' };
  if (code <= 3) return { label: 'Partly Cloudy', icon: '⛅', color: 'text-sky-400' };
  if (code <= 48) return { label: 'Foggy', icon: '🌫️', color: 'text-slate-400' };
  if (code <= 67) return { label: 'Rainy', icon: '🌧️', color: 'text-blue-400' };
  if (code <= 77) return { label: 'Snowy', icon: '❄️', color: 'text-cyan-400' };
  if (code <= 82) return { label: 'Rain Showers', icon: '🌦️', color: 'text-blue-300' };
  if (code <= 86) return { label: 'Snow Showers', icon: '🌨️', color: 'text-cyan-300' };
  if (code <= 99) return { label: 'Thunderstorm', icon: '⛈️', color: 'text-purple-400' };
  return { label: 'Unknown', icon: '🌡️', color: 'text-slate-400' };
}

const FALLBACK_FORECAST = [
  { date: '2026-07-05', maxTemp: 28, minTemp: 18, rainProb: 10, weatherCode: 1 },
  { date: '2026-07-06', maxTemp: 26, minTemp: 17, rainProb: 30, weatherCode: 51 },
  { date: '2026-07-07', maxTemp: 24, minTemp: 16, rainProb: 70, weatherCode: 61 },
  { date: '2026-07-08', maxTemp: 22, minTemp: 15, rainProb: 80, weatherCode: 65 },
  { date: '2026-07-09', maxTemp: 25, minTemp: 17, rainProb: 20, weatherCode: 2 },
  { date: '2026-07-10', maxTemp: 29, minTemp: 19, rainProb: 5, weatherCode: 0 },
  { date: '2026-07-11', maxTemp: 31, minTemp: 20, rainProb: 5, weatherCode: 0 },
];

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return { day: days[d.getDay()], date: `${months[d.getMonth()]} ${d.getDate()}` };
}

export default function WeatherTab({ weatherData }) {
  const forecast = weatherData?.forecast && weatherData.forecast.length > 0
    ? weatherData.forecast
    : FALLBACK_FORECAST;

  const isDemo = !weatherData?.forecast;

  const maxOverall = Math.max(...forecast.map(d => d.maxTemp));
  const minOverall = Math.min(...forecast.map(d => d.minTemp));
  const avgRain = Math.round(forecast.reduce((s, d) => s + d.rainProb, 0) / forecast.length);

  return (
    <div className="space-y-6">
      {isDemo && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 flex items-center space-x-2">
          <svg className="h-4 w-4 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-amber-400">Showing sample weather data. Real data loads after destination geocoding.</p>
        </div>
      )}

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Max Temp', value: `${maxOverall}°C`, icon: '🌡️', color: 'text-orange-400' },
          { label: 'Min Temp', value: `${minOverall}°C`, icon: '❄️', color: 'text-sky-400' },
          { label: 'Avg Rain %', value: `${avgRain}%`, icon: '💧', color: 'text-blue-400' },
        ].map(stat => (
          <GlassCard key={stat.label} className="text-center py-4 space-y-1">
            <div className="text-xl">{stat.icon}</div>
            <div className={`text-base font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xxs text-slate-500">{stat.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">7-Day Forecast</h3>
        <div className="space-y-2">
          {forecast.map((day, idx) => {
            const weather = getWeatherInfo(day.weatherCode);
            const dateInfo = formatDate(day.date);
            const isToday = idx === 0;
            return (
              <div
                key={idx}
                className={`flex items-center justify-between rounded-xl border p-3 transition-all duration-200
                  ${isToday
                    ? 'border-sky-500/30 bg-sky-500/5'
                    : 'border-white/5 bg-white/2 hover:bg-white/4'
                  }`}
              >
                <div className="w-16">
                  <p className={`text-xs font-bold ${isToday ? 'text-sky-400' : 'text-white'}`}>
                    {isToday ? 'Today' : dateInfo.day}
                  </p>
                  <p className="text-xxs text-slate-500">{dateInfo.date}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{weather.icon}</span>
                  <span className={`text-xs ${weather.color} hidden sm:block`}>{weather.label}</span>
                </div>
                <div className="flex items-center space-x-3 text-right">
                  <div className="flex items-center space-x-1">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                    <span className="text-xxs text-slate-400">{day.rainProb}%</span>
                  </div>
                  <div className="text-xs">
                    <span className="text-orange-400 font-semibold">{day.maxTemp}°</span>
                    <span className="text-slate-600 mx-1">/</span>
                    <span className="text-slate-400">{day.minTemp}°</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
