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
    <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-slate-900 break-words">
            {snippet.title}
          </h2>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white border border-emerald-100 text-emerald-700 text-xs font-semibold">
            {snippet.language}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4 shrink-0">
          <button
            onClick={() => onEdit(snippet)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition"
            title="Edit snippet"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete snippet"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      {snippet.description && (
        <p className="text-slate-800 mb-5 leading-relaxed">
          {snippet.description}
        </p>
      )}

      {/* Code */}
      <pre className="bg-white border border-emerald-100 rounded-2xl p-4 overflow-x-auto text-sm text-slate-800 mb-5 shadow-sm">
        <code className="font-mono">
          {snippet.code}
        </code>
      </pre>

      {/* Tags */}
      {snippet.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {snippet.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white border border-emerald-100 text-emerald-700 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={() => onCopy(snippet.code)}
          className="px-4 py-2 rounded-xl bg-white border border-emerald-100 text-slate-700 hover:text-emerald-700 hover:border-emerald-200 transition font-medium text-sm"
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