const StatCard = ({ title, value, subtitle, accent }) => {
  return (
    <div
      className={`
        relative overflow-hidden
        bg-slate-900/80
        border border-slate-800
        rounded-3xl
        p-6
        transition-all duration-300
        hover:-translate-y-1
        hover:border-slate-700
        hover:shadow-2xl
      `}
    >
      {/* Accent line */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${accent}`}
      />

      <p className="text-slate-400 text-sm font-medium mb-3">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mb-2">
        {value}
      </h2>

      <p className="text-slate-500 text-sm">
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;