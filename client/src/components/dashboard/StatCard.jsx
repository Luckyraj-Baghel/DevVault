const StatCard = ({ title, value, subtitle, accent }) => {
  return (
    <div
      className="
        relative overflow-hidden
        bg-white
        border border-slate-200
        rounded-3xl
        p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Accent line */}
      <div
        className={`absolute top-0 left-0 h-1 w-full ${accent}`}
      />

      <p className="text-slate-500 text-sm font-medium mb-3">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-slate-900 mb-2">
        {value}
      </h2>

      <p className="text-slate-500 text-sm">
        {subtitle}
      </p>
    </div>
  );
};

export default StatCard;