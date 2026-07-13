import { Link } from "react-router-dom";

const SectionCard = ({
  title,
  children,
  link,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <Link
          to={link}
          className="text-indigo-400 hover:text-indigo-300 text-sm transition"
        >
          View All →
        </Link>
      </div>

      {children}
    </div>
  );
};

export default SectionCard;