import { useEffect, useState } from "react";

const SnippetModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    language: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        code: initialData.code || "",
        language: initialData.language || "",
        description: initialData.description || "",
        tags: initialData.tags?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        code: "",
        language: "",
        description: "",
        tags: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    onClose();
  };

  const inputClass =
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-emerald-100 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {initialData
                ? "Edit Snippet"
                : "New Snippet"}
            </h2>

            <p className="text-slate-500 mt-2">
              {initialData
                ? "Update your reusable code snippet."
                : "Save a reusable piece of code for future projects."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
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
              Snippet Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. Express Async Handler"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className={labelClass}>
              Programming Language
            </label>

            <input
              type="text"
              name="language"
              placeholder="JavaScript, C++, Python..."
              value={formData.language}
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
              placeholder="What does this snippet do?"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-24 resize-none`}
            />
          </div>

          {/* Code */}
          <div>
            <label className={labelClass}>
              Code
            </label>

            <textarea
              name="code"
              placeholder="Paste your code here..."
              value={formData.code}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-emerald-300 placeholder:text-slate-500 h-56 font-mono text-sm leading-relaxed resize-y outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              spellCheck="false"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className={labelClass}>
              Tags
            </label>

            <input
              type="text"
              name="tags"
              placeholder="jwt, auth, middleware"
              value={formData.tags}
              onChange={handleChange}
              className={inputClass}
            />

            <p className="text-xs text-slate-400 mt-2">
              Separate tags with commas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-slate-100">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold hover:bg-slate-200 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-emerald-600 text-white font-semibold shadow-sm hover:bg-emerald-700 hover:shadow-md transition"
            >
              {initialData
                ? "Update Snippet"
                : "Save Snippet"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetModal;