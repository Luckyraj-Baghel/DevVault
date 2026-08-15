import { useEffect, useState } from "react";

const EditNoteModal = ({
  isOpen,
  onClose,
  note,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title || "",
        content: note.content || "",
        category: note.category || "General",
        tags: note.tags?.join(", ") || "",
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    await onUpdate(note._id, payload);

    onClose();
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Edit Note
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Update your note details and content.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

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
              placeholder="Note title"
              required
              className="
                w-full
                bg-slate-50
                border border-slate-200
                rounded-xl
                px-4 py-3
                text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
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
              placeholder="Write your note..."
              required
              className="
                w-full
                bg-slate-50
                border border-slate-200
                rounded-xl
                px-4 py-3
                text-slate-900
                placeholder:text-slate-400
                outline-none
                resize-none
                transition
                focus:border-indigo-500
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
                bg-slate-50
                border border-slate-200
                rounded-xl
                px-4 py-3
                text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
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
              placeholder="react, mongodb, backend"
              className="
                w-full
                bg-slate-50
                border border-slate-200
                rounded-xl
                px-4 py-3
                text-slate-900
                placeholder:text-slate-400
                outline-none
                transition
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-500/10
              "
            />

            <p className="text-xs text-slate-400 mt-2">
              Separate multiple tags with commas.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="
                flex-1
                py-3
                rounded-xl
                border border-slate-200
                bg-white
                text-slate-600
                font-medium
                hover:bg-slate-50
                hover:text-slate-900
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1
                py-3
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-medium
                shadow-sm
                transition
              "
            >
              Save Changes
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;