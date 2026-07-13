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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">
              {bookmark.title}
            </h2>

            {bookmark.isFavorite && (
              <span className="text-yellow-400">
                ⭐
              </span>
            )}
          </div>

          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs">
            {bookmark.type}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onEdit(bookmark)}
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

      {bookmark.description && (
        <p className="text-slate-400 mb-5">
          {bookmark.description}
        </p>
      )}

      <div className="mb-5">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noreferrer"
          className="text-indigo-400 hover:text-indigo-300 break-all"
        >
          {bookmark.url}
        </a>
      </div>

      {bookmark.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {bookmark.tags.map((tag, index) => (
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
          onClick={() => onOpen(bookmark.url)}
          className="text-slate-300 hover:text-white"
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