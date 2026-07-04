import React, { useState } from 'react';
import GlassCard from '../common/GlassCard';

const FALLBACK_PACKING = [
  {
    category: 'Clothing',
    items: [
      'Lightweight, breathable shirts (3–4)',
      'Comfortable walking trousers/shorts',
      'Light jacket or cardigan for evenings',
      'Comfortable walking shoes (broken in)',
      'Sandals for warmer afternoons',
      'Respectful attire for temples or holy sites (shoulders covered)',
    ],
  },
  {
    category: 'Essentials',
    items: [
      'Sunscreen SPF 30+',
      'Insect repellent',
      'Personal medications & first aid kit',
      'Reusable water bottle',
      'Travel umbrella',
      'Hand sanitizer & wet wipes',
    ],
  },
  {
    category: 'Tech & Accessories',
    items: [
      'Universal travel adapter',
      'Portable phone charger / power bank',
      'Earbuds or noise-cancelling headphones',
      'Camera or smartphone with extra memory',
    ],
  },
  {
    category: 'Documents',
    items: [
      'Passport + 2 photocopies',
      'Visa documentation (if applicable)',
      'Travel insurance policy',
      'Hotel booking confirmations (printed)',
      'Emergency contact numbers (written down)',
    ],
  },
];

const categoryColors = {
  Clothing: { icon: '👕', bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400' },
  Essentials: { icon: '💊', bg: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400' },
  'Tech & Accessories': { icon: '🔌', bg: 'bg-sky-500/10 border-sky-500/20', text: 'text-sky-400' },
  Documents: { icon: '📄', bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400' },
};

function getCategoryStyle(cat) {
  return categoryColors[cat] || { icon: '📦', bg: 'bg-slate-500/10 border-slate-500/20', text: 'text-slate-400' };
}

export default function PackingTab({ packing }) {
  const categories = packing && packing.length > 0 ? packing : FALLBACK_PACKING;
  const [checked, setChecked] = useState({});

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalItems = categories.reduce((sum, c) => sum + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-6">

      {/* Progress bar */}
      <GlassCard className="py-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">Packing Progress</h3>
          <span className="text-sm font-bold text-sky-400">{checkedCount} / {totalItems}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-800">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-sky-400 transition-all duration-500"
            style={{ width: `${totalItems > 0 ? (checkedCount / totalItems) * 100 : 0}%` }}
          />
        </div>
        <p className="text-xxs text-slate-500 mt-2">
          {checkedCount === totalItems && totalItems > 0
            ? '✅ All packed! You\'re ready to go.'
            : `${totalItems - checkedCount} items remaining`}
        </p>
      </GlassCard>

      {/* Categories */}
      {categories.map((cat, catIdx) => {
        const style = getCategoryStyle(cat.category);
        const catChecked = cat.items.filter((_, itemIdx) => checked[`${catIdx}-${itemIdx}`]).length;
        return (
          <GlassCard key={catIdx} className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg border text-base ${style.bg}`}>
                {style.icon}
              </div>
              <div className="flex-1">
                <h4 className={`text-sm font-bold ${style.text}`}>{cat.category}</h4>
                <p className="text-xxs text-slate-600">{catChecked}/{cat.items.length} packed</p>
              </div>
            </div>

            <div className="space-y-2 pl-1">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const isChecked = !!checked[key];
                return (
                  <div
                    key={itemIdx}
                    onClick={() => toggleItem(catIdx, itemIdx)}
                    className={`flex items-center space-x-3 rounded-lg p-2.5 cursor-pointer transition-all duration-200 select-none
                      ${isChecked ? 'bg-white/5 opacity-60' : 'hover:bg-white/3'}`}
                  >
                    <div className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-all duration-200
                      ${isChecked
                        ? 'border-sky-500 bg-sky-500'
                        : 'border-slate-600 bg-transparent'
                      }`}
                    >
                      {isChecked && (
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={`text-xs transition-all duration-200 ${isChecked ? 'line-through text-slate-600' : 'text-slate-300'}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
