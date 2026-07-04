
export default function GlassCard({ children, className = '', hoverEffect = false, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`
        glass-card rounded-2xl p-6 text-slate-200 shadow-xl shadow-black/10 backdrop-blur-md
        ${hoverEffect ? 'glass-card-hover cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
