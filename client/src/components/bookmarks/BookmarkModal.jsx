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
        description:
          initialData.description || "",
        tags:
          initialData.tags?.join(", ") || "",
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

    console.log(formData);
    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-2xl p-8 border border-slate-800">

        <h2 className="text-3xl font-bold text-white mb-8">
          {initialData
            ? "Edit Bookmark"
            : "New Bookmark"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Bookmark title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
            required
          />

          <input
            type="url"
            name="url"
            placeholder="https://..."
            value={formData.url}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
            required
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
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

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white h-24"
          />

          <input
            type="text"
            name="tags"
            placeholder="react, api, auth"
            value={formData.tags}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-slate-800 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white"
            >
              Save Bookmark
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BookmarkModal;