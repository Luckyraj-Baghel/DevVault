import { useState } from "react";
import { summarizeNote, removeNoteSummary, } from "../../services/notes.service";
import toast from "react-hot-toast";

const NoteCard = ({
  note,
  onDelete,
  onEdit,
  onPin,
}) => {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summary, setSummary] = useState(note.summary);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${note.title}" ?`
    );

    if (confirmed) {
      onDelete(note._id);
    }
  };

  const handleSummarize = async () => {
    try {
      setIsSummarizing(true);

      const response = await summarizeNote(note._id);

      console.log("AI SUMMARY RESPONSE:", response);

      setSummary(response.data.summary);

      toast.success("AI summary generated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to generate AI summary"
      );
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleRemoveSummary = async () => {
    const confirmed = window.confirm(
      "Remove the AI summary from this note?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await removeNoteSummary(note._id);

      setSummary("");

      toast.success("AI summary removed successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to remove AI summary"
      );
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
            className={`transition ${note.isPinned
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

      <div className="mt-5">
        <button
          onClick={handleSummarize}
          disabled={isSummarizing}
          className="w-full px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition"
        >
          {isSummarizing
            ? "✨ Generating Summary..."
            : summary
              ? "🔄 Regenerate Summary"
              : "✨ Summarize with AI"}
        </button>
      </div>

      {summary && (
        <div className="mt-5 p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span>✨</span>

              <h3 className="text-sm font-semibold text-indigo-300">
                AI Summary
              </h3>
            </div>

            <button
              onClick={handleRemoveSummary}
              className="text-slate-500 hover:text-red-400 transition"
              title="Remove AI summary"
            >
              🗑️
            </button>
          </div>

          <p className="text-sm text-slate-300 leading-6 whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}

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