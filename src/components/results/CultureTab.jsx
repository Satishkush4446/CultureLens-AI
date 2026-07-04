import { memo } from 'react';
import GlassCard from '../common/GlassCard';

const FALLBACK_STORY = `This destination is a living tapestry of ancient traditions woven seamlessly into modern life. Every cobblestone street tells a story of conquests, trade routes, and artistic revolutions that have shaped not just this city, but the world itself. The people here carry centuries of heritage in their daily rituals — from the way they greet strangers with ceremonial warmth to the deeply symbolic foods they prepare during festivals.

The cultural soul of this place is best found in its quiet moments: a grandmother weaving traditional textiles in a doorway, children chasing each other through ancient archways, and elders sharing stories over strong local tea. To truly experience this destination is to step outside the curated tourist path and into the rhythm of authentic local life.`;

const FALLBACK_FUN_FACTS = [
  "The local calendar still follows a lunar cycle system that predates the Gregorian calendar by over 800 years.",
  "Traditional architecture here uses no nails — buildings are constructed using interlocking wood joints perfected over centuries.",
  "The local tea ceremony can last up to 4 hours and is considered a meditative practice, not just a social one.",
];

const FALLBACK_ETIQUETTE = [
  {
    do: "Greet elders first and use both hands when giving or receiving anything.",
    dont: "Never point your feet towards a sacred object, shrine, or elder.",
    context: "Foot direction is deeply symbolic here — feet are considered the lowest, most unclean part of the body in this cultural tradition.",
  },
  {
    do: "Remove your shoes before entering any home, temple, or traditional establishment.",
    dont: "Don't raise your voice or show frustration in public — composure is highly valued.",
    context: "Maintaining public harmony is a cultural cornerstone that dates back to early communal governance systems.",
  },
  {
    do: "Always try a small amount of food offered by a host — refusing is considered disrespectful.",
    dont: "Avoid using your left hand for eating or passing food, as it is traditionally considered unclean.",
    context: "This custom has its roots in ancient hygienic practices that became embedded into cultural etiquette.",
  },
];

const CultureTab = memo(function CultureTab({ tripData }) {
  const story = tripData?.story || FALLBACK_STORY;
  const funFacts = tripData?.funFacts && tripData.funFacts.length > 0 ? tripData.funFacts : FALLBACK_FUN_FACTS;
  const etiquette = tripData?.etiquette && tripData.etiquette.length > 0 ? tripData.etiquette : FALLBACK_ETIQUETTE;

  return (
    <div className="space-y-6">

      {/* Cultural Narrative */}
      <GlassCard>
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white">The Cultural Soul</h3>
        </div>
        <div className="space-y-3">
          {story.split('\n\n').filter(p => p.trim()).map((paragraph, idx) => (
            <p key={idx} className="text-sm text-slate-200 leading-relaxed">{paragraph}</p>
          ))}
        </div>
      </GlassCard>

      {/* Fun Facts */}
      <GlassCard>
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-white">Surprising Cultural Facts</h3>
        </div>
        <div className="space-y-3">
          {funFacts.map((fact, idx) => (
            <div key={idx} className="flex space-x-3">
              <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold">
                {idx + 1}
              </div>
              <p className="text-sm text-slate-200 leading-relaxed">{fact}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Do's & Don'ts */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Traveler Etiquette</h3>
        <div className="space-y-4">
          {etiquette.map((item, idx) => (
            <GlassCard key={idx} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3">
                  <p className="text-xxs font-bold text-emerald-400 uppercase tracking-widest mb-1">✓ Do</p>
                  <p className="text-xs text-slate-200">{item.do}</p>
                </div>
                <div className="rounded-lg bg-red-500/5 border border-red-500/10 p-3">
                  <p className="text-xxs font-bold text-red-400 uppercase tracking-widest mb-1">✕ Don't</p>
                  <p className="text-xs text-slate-200">{item.dont}</p>
                </div>
              </div>
              {item.context && (
                <p className="text-xxs text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                  <span className="text-slate-300 font-medium">Why: </span>{item.context}
                </p>
              )}
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
});

export default CultureTab;
