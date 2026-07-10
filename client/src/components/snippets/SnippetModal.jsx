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

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
      <div className="bg-slate-900 rounded-3xl w-full max-w-3xl p-8 border border-slate-800">
        <h2 className="text-3xl font-bold text-white mb-8">
          {initialData
            ? "Edit Snippet"
            : "New Snippet"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Snippet title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
            required
          />

          <input
            type="text"
            name="language"
            placeholder="JavaScript, C++, Python..."
            value={formData.language}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full bg-slate-800 rounded-xl p-4 text-white h-24"
          />

          <textarea
            name="code"
            placeholder="Paste your code here..."
            value={formData.code}
            onChange={handleChange}
            className="w-full bg-slate-950 rounded-xl p-4 text-green-300 h-56 font-mono"
            required
          />

          <input
            type="text"
            name="tags"
            placeholder="jwt, auth, middleware"
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
              Save Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SnippetModal;