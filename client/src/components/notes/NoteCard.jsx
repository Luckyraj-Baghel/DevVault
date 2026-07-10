const NoteCard = ({
  note,
  onDelete,
  onEdit,
  onPin,
}) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${note.title}" ?`
    );

    if (confirmed) {
      onDelete(note._id);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold text-white">
            {note.title}
          </h2>

          {note.isPinned && (
            <span className="text-yellow-400 text-lg">
              📌
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onPin(note._id)}
            className={`transition ${
              note.isPinned
                ? "text-yellow-400 hover:text-yellow-300"
                : "text-slate-500 hover:text-yellow-400"
            }`}
          >
            📌
          </button>

          <button
            onClick={() => onEdit(note)}
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
        {note.content}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300">
          {note.category}
        </span>
      </div>

      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-slate-800 text-indigo-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteCard;