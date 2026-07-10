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

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-2xl p-8 border border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-8">
          {initialData ? "Edit Project" : "New Project"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Project title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Project description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white h-32"
            required
          />

          <input
            type="text"
            name="techStack"
            placeholder="React, Node.js, MongoDB"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
          />

          <input
            type="text"
            name="githubLink"
            placeholder="GitHub URL"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
          />

          <input
            type="text"
            name="liveLink"
            placeholder="Live Demo URL"
            value={formData.liveLink}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
          >
            <option>Planning</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose();
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;