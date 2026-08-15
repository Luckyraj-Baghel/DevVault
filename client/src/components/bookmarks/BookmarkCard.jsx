const BookmarkCard = ({
  bookmark,
  onEdit,
  onDelete,
  onOpen,
}) => {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${bookmark.title}" ?`
    );

    if (confirmed) {
      onDelete(bookmark._id);
    }
  };

  return (
    <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">

      {/* Header */}
      <div className="flex justify-between items-start mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900 break-words">
              {bookmark.title}
            </h2>

            {bookmark.isFavorite && (
              <span
                className="text-amber-500 shrink-0"
                title="Favorite"
              >
                ⭐
              </span>
            )}
          </div>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white border border-amber-100 text-amber-700 text-xs font-semibold">
            {bookmark.type}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 ml-4 shrink-0">
          <button
            onClick={() => onEdit(bookmark)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-amber-100 text-amber-600 hover:bg-amber-100 hover:text-amber-700 transition"
            title="Edit bookmark"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
            title="Delete bookmark"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      {bookmark.description && (
        <p className="text-slate-800 mb-5 leading-relaxed">
          {bookmark.description}
        </p>
      )}

      {/* URL */}
      <div className="mb-5">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noreferrer"
          className="block px-4 py-3 rounded-xl bg-white border border-amber-100 text-blue-800 hover:text-amber-800 hover:border-amber-200 break-all transition text-sm"
        >
          {bookmark.url}
        </a>
      </div>

      {/* Tags */}
      {bookmark.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {bookmark.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full bg-white border border-amber-100 text-amber-700 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center gap-3">
        <button
          onClick={() => onOpen(bookmark.url)}
          className="px-4 py-2 rounded-xl bg-white border border-amber-100 text-slate-700 hover:text-amber-700 hover:border-amber-200 transition font-medium text-sm"
        >
          🔗 Open Link
        </button>

        <span className="text-xs text-slate-500">
          {new Date(
            bookmark.createdAt
          ).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default BookmarkCard;