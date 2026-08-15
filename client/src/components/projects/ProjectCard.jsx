const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}) => {
  const statusStyles = {
    Planning:
      "bg-white text-slate-700 border border-slate-200",
    "In Progress":
      "bg-violet-100 text-violet-700 border border-violet-200",
    Completed:
      "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${project.title}" ?`
    );

    if (confirmed) {
      onDelete(project._id);
    }
  };

  return (
    <div className="bg-violet-50 border border-violet-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-slate-900 break-words">
            {project.title}
          </h2>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
              statusStyles[project.status] ||
              "bg-white text-slate-700 border border-slate-200"
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4 shrink-0">
          <button
            onClick={() => onEdit(project)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-violet-100 text-violet-600 hover:bg-violet-100 hover:text-violet-700 transition"
            title="Edit project"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete project"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-800 mb-6 line-clamp-4 leading-relaxed">
        {project.description}
      </p>

      {/* Tech Stack */}
      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white border border-violet-100 text-violet-700 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      <div className="flex flex-wrap gap-3">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-violet-100 text-slate-700 hover:text-violet-700 hover:border-violet-200 transition font-medium text-sm"
          >
            GitHub ↗
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-xl bg-white border border-violet-100 text-slate-700 hover:text-violet-700 hover:border-violet-200 transition font-medium text-sm"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;