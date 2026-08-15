import { useEffect, useState } from "react";

const ProjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: "",
    status: "Planning",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        techStack: initialData.techStack?.join(", ") || "",
        githubLink: initialData.githubLink || "",
        liveLink: initialData.liveLink || "",
        status: initialData.status || "Planning",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: "",
        status: "Planning",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      techStack: "",
      githubLink: "",
      liveLink: "",
      status: "Planning",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    });

    resetForm();
    onClose();
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-violet-100 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {initialData ? "Edit Project" : "New Project"}
            </h2>

            <p className="text-slate-500 mt-2">
              {initialData
                ? "Update your project details."
                : "Add a new project to your workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            title="Close"
          >
            ✕
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Title */}
          <div>
            <label className={labelClass}>
              Project Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. DevVault"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Describe what this project is about..."
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-32 resize-none`}
              required
            />
          </div>

          {/* Tech Stack */}
          <div>
            <label className={labelClass}>
              Tech Stack
            </label>

            <input
              type="text"
              name="techStack"
              placeholder="React, Node.js, MongoDB"
              value={formData.techStack}
              onChange={handleChange}
              className={inputClass}
            />

            <p className="text-xs text-slate-400 mt-2">
              Separate technologies with commas.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                GitHub URL
              </label>

              <input
                type="text"
                name="githubLink"
                placeholder="https://github.com/..."
                value={formData.githubLink}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Live Demo URL
              </label>

              <input
                type="text"
                name="liveLink"
                placeholder="https://..."
                value={formData.liveLink}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>
              Project Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option>Planning</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-slate-100">

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold shadow-sm hover:bg-violet-700 hover:shadow-md transition"
            >
              {initialData ? "Update Project" : "Save Project"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;