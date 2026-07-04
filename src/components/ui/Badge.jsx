import React from 'react';

export default function Badge({ text, type = 'default' }) {
  const getColors = () => {
    switch (type.toLowerCase()) {
      case 'temple':
      case 'religion':
      case 'historic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'museums':
      case 'cultural':
        return 'bg-teal-500/10 text-teal-400 border-teal-500/20';
      case 'food':
      case 'street food':
      case 'traditional dish':
      case 'local beverage':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'nature':
      case 'natural':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'architecture':
      case 'monuments':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xxs font-medium ${getColors()}`}>
      {text}
    </span>
  );
}
