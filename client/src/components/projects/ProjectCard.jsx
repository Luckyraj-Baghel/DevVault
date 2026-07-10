const ProjectCard = ({
  project,
  onEdit,
  onDelete,
}) => {
  const statusColors = {
    Planning: "bg-slate-700 text-slate-300",
    "In Progress": "bg-indigo-500/20 text-indigo-300",
    Completed: "bg-emerald-500/20 text-emerald-300",
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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {project.title}
          </h2>

          <span
            className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}
          >
            {project.status}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(project)}
            className="text-blue-400 hover:text-blue-300"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300"
          >
            🗑️
          </button>
        </div>
      </div>

      <p className="text-slate-400 mb-6 line-clamp-4">
        {project.description}
      </p>

      {project.techStack?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-slate-800 text-indigo-300 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            GitHub ↗
          </a>
        )}

        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;