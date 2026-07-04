import React from 'react';
import GlassCard from '../common/GlassCard';

const FALLBACK_FOOD = [
  {
    name: 'Slow-Braised Heritage Stew',
    description: 'A rich, slow-cooked stew made with root vegetables and heritage breed meats, simmered in a clay pot over open wood fire for 6 hours.',
    category: 'Traditional Dish',
    whyTry: 'This dish has been the centerpiece of ceremonial feasts for over 400 years and is only prepared using recipes passed orally between generations.',
  },
  {
    name: 'Spiced Saffron Flatbread',
    description: 'Paper-thin bread charred on a wood-fired stone, dusted with hand-ground saffron, cumin, and local mountain herbs.',
    category: 'Street Food',
    whyTry: "Originally created as travel food for merchants on long journeys, it's now a beloved street staple eaten at every corner market.",
  },
  {
    name: 'Fermented Wildberry Cordial',
    description: 'A naturally fermented drink made from foraged wildberries, left to mature in oak barrels for 40 days before serving cold.',
    category: 'Local Beverage',
    whyTry: 'This traditional drink plays a central role in harvest festivals and is offered as a sign of hospitality to all guests.',
  },
  {
    name: 'Roasted Market Corn with Ash Butter',
    description: 'Locally grown corn roasted directly on embers and brushed with cultured ash butter seasoned with smoked paprika.',
    category: 'Street Food',
    whyTry: "A deeply nostalgic food that connects locals to their agricultural roots — you'll find vendors at every major market.",
  },
];

const categoryColors = {
  'Traditional Dish': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  'Street Food': 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  'Local Beverage': 'text-teal-400 bg-teal-500/10 border-teal-500/20',
};

const categoryIcon = (category) => {
  switch (category) {
    case 'Traditional Dish':
      return '🍲';
    case 'Street Food':
      return '🌮';
    case 'Local Beverage':
      return '🍵';
    default:
      return '🍴';
  }
};

export default function FoodTab({ food }) {
  const dishes = food && food.length > 0 ? food : FALLBACK_FOOD;

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">{dishes.length} local delicacies curated for your journey</p>

      <div className="grid gap-4">
        {dishes.map((item, idx) => {
          const colorClass = categoryColors[item.category] || 'text-slate-400 bg-slate-500/10 border-slate-500/20';
          return (
            <GlassCard key={idx} hoverEffect className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-white/5 bg-slate-800/50 text-xl">
                  {categoryIcon(item.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <span className={`mt-1 inline-block rounded border px-2 py-0.5 text-xxs font-medium ${colorClass}`}>
                    {item.category || 'Local Specialty'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

              {item.whyTry && (
                <div className="rounded-lg bg-white/3 border border-white/5 p-3">
                  <p className="text-xxs font-semibold text-sky-400 mb-1 uppercase tracking-widest">Why You Must Try This</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.whyTry}</p>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
