import { Link } from "react-router-dom";

const SectionCard = ({
  title,
  children,
  link,
  accent = "indigo",
}) => {
  const accentStyles = {
    indigo: {
      background: "bg-indigo-50/50",
      border: "border-indigo-100",
      hover: "hover:border-indigo-200",
      link: "text-indigo-600 hover:text-indigo-700",
    },
    violet: {
      background: "bg-violet-50/50",
      border: "border-violet-100",
      hover: "hover:border-violet-200",
      link: "text-violet-600 hover:text-violet-700",
    },
    emerald: {
      background: "bg-emerald-50/50",
      border: "border-emerald-100",
      hover: "hover:border-emerald-200",
      link: "text-emerald-600 hover:text-emerald-700",
    },
    amber: {
      background: "bg-amber-50/50",
      border: "border-amber-100",
      hover: "hover:border-amber-200",
      link: "text-amber-600 hover:text-amber-700",
    },
  };

  const styles = accentStyles[accent] || accentStyles.indigo;

  return (
    <div
      className={`
        ${styles.background}
        border ${styles.border}
        rounded-3xl
        p-6
        shadow-sm
        transition-all duration-300
        hover:shadow-md
        ${styles.hover}
      `}
    >
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>

        <Link
          to={link}
          className={`
            ${styles.link}
            text-sm
            font-medium
            transition
          `}
        >
          View All →
        </Link>
      </div>

      {children}
    </div>
  );
};

export default SectionCard;