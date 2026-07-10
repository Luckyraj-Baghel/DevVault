const SectionCard = ({ title, children }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <button className="text-indigo-400 hover:text-indigo-300 text-sm transition">
          View All →
        </button>
      </div>

      {children}
    </div>
  );
};

export default SectionCard;