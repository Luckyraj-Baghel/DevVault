import { useEffect, useState } from "react";

const BookmarkModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    type: "",
    description: "",
    tags: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        url: initialData.url || "",
        type: initialData.type || "",
        description: initialData.description || "",
        tags: initialData.tags?.join(", ") || "",
      });
    } else {
      setFormData({
        title: "",
        url: "",
        type: "",
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
    "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100";

  const labelClass =
    "block text-sm font-semibold text-slate-700 mb-2";

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-amber-100 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {initialData
                ? "Edit Bookmark"
                : "New Bookmark"}
            </h2>

            <p className="text-slate-500 mt-2">
              {initialData
                ? "Update your saved developer resource."
                : "Save a useful developer resource for later."}
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
              Bookmark Title
            </label>

            <input
              type="text"
              name="title"
              placeholder="e.g. React Documentation"
              value={formData.title}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className={labelClass}>
              URL
            </label>

            <input
              type="url"
              name="url"
              placeholder="https://..."
              value={formData.url}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className={labelClass}>
              Bookmark Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
              required
            >
              <option value="" disabled>
                Select Bookmark Type
              </option>

              <option value="Documentation">
                Documentation
              </option>

              <option value="GitHub">
                GitHub
              </option>

              <option value="Video">
                Video
              </option>

              <option value="Article">
                Article
              </option>

              <option value="API">
                API
              </option>

              <option value="Tool">
                Tool
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description
            </label>

            <textarea
              name="description"
              placeholder="What is this resource useful for?"
              value={formData.description}
              onChange={handleChange}
              className={`${inputClass} h-24 resize-none`}
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
              placeholder="react, api, auth"
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
              className="px-5 py-3 rounded-xl bg-amber-500 text-white font-semibold shadow-sm hover:bg-amber-600 hover:shadow-md transition"
            >
              {initialData
                ? "Update Bookmark"
                : "Save Bookmark"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default BookmarkModal;