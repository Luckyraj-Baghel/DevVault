const SnippetCard = ({
  snippet,
  onEdit,
  onDelete,
  onCopy,
}) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${snippet.title}" ?`
    );

    if (confirmed) {
      onDelete(snippet._id);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {snippet.title}
          </h2>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
            {snippet.language}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(snippet)}
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

      {snippet.description && (
        <p className="text-slate-400 mb-4">
          {snippet.description}
        </p>
      )}

      <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto text-sm text-slate-300 mb-5">
        <code>
          {snippet.code}
        </code>
      </pre>

      {snippet.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-slate-800 text-indigo-300 text-xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button
          onClick={() => onCopy(snippet.code)}
          className="text-slate-400 hover:text-white transition"
        >
          📋 Copy
        </button>

        <span className="text-xs text-slate-500">
          {new Date(
            snippet.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default SnippetCard;