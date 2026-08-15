import { useState } from "react";

const CreateNoteModal = ({ isOpen, onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "General",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    await onCreate(payload);

    setFormData({
      title: "",
      content: "",
      category: "General",
      tags: "",
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 md:px-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Create New Note
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Capture an idea, concept, or useful information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 md:p-8"
        >

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter note title"
              required
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Content
            </label>

            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="6"
              placeholder="Write your note here..."
              required
              className="
                w-full
                resize-none
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="General"
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tags
            </label>

            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, backend, mongodb"
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:bg-white
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />

            <p className="text-xs text-slate-400 mt-1.5">
              Separate multiple tags with commas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                rounded-xl
                border border-slate-200
                bg-white
                py-3
                text-sm
                font-medium
                text-slate-700
                hover:bg-slate-50
                hover:border-slate-300
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1
                rounded-xl
                bg-indigo-600
                py-3
                text-sm
                font-medium
                text-white
                shadow-sm
                hover:bg-indigo-700
                transition
              "
            >
              Create Note
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;