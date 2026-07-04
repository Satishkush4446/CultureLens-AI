import { useTrip } from '../../context/TripContext';
import SearchForm from './SearchForm';
import Loading from '../ui/Loading';
import GlassCard from '../common/GlassCard';

export default function Hero() {
  const { loading, loadingStatus, error } = useTrip();

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/10 blur-[100px]" aria-hidden="true"></div>
      <div className="absolute bottom-10 left-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-purple-500/5 blur-[80px]" aria-hidden="true"></div>

      <div className="mx-auto max-w-5xl flex-grow flex flex-col justify-center">
        
        {/* Main Content Head */}
        <div className="text-center mb-10 space-y-4">
          <div className="inline-flex items-center space-x-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 px-3 py-1 text-xs font-semibold text-sky-400">
            <span aria-hidden="true">✨</span> <span>AI Cultural Travel Assistant</span>
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-white">
            Discover the World's Soul, Not Just Its <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-orange-400 bg-clip-text text-transparent">Sights</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-400">
            CultureLens AI creates travel itineraries steeped in native folklore, local culinary stories, historical hidden gems, and weather-aware preparation checklists.
          </p>
        </div>

        {/* Global Error Display */}
        {error && (
          <div role="alert" className="mx-auto mb-6 max-w-2xl rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center text-sm text-red-400">
            <p className="font-semibold">Generation Failed</p>
            <p className="text-xs mt-1 text-slate-400">{error}</p>
          </div>
        )}

        {/* Search Form component */}
        <SearchForm />

        {/* Bento Grid Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          
          <GlassCard className="flex flex-col space-y-3" hoverEffect={true}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-white">Cultural Narratives</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Read rich localized stories of regional heritage, common language idioms, and unique traditions.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col space-y-3" hoverEffect={true}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 12.414a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-white">OpenTripMap Integration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover verified historical sites, monuments, and hidden architectural gems on an interactive map.
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col space-y-3 sm:col-span-2 lg:col-span-1" hoverEffect={true}>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h4 className="text-base font-bold text-white">Weather-Aware Packing</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Fetch Live weather updates from Open-Meteo to prepare tailored gear checklist recommendations.
            </p>
          </GlassCard>

        </div>

      </div>

      {/* Global Loader Overlay */}
      {loading && <Loading statusText={loadingStatus} />}

    </div>
  );
}
