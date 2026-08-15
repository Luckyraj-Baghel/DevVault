import { useState } from "react";
import {
  summarizeNote,
  removeNoteSummary,
} from "../../services/notes.service";
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
    <div
      className="
    bg-indigo-50
    border border-indigo-100
    rounded-3xl
    p-6
    shadow-sm
    transition-all duration-300
    hover:-translate-y-1
    hover:bg-indigo-100/70
    hover:shadow-lg
    hover:border-indigo-200
  "
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <h2 className="text-xl font-semibold text-slate-900 truncate">
            {note.title}
          </h2>

          {note.isPinned && (
            <span
              className="text-amber-500 text-lg shrink-0"
              title="Pinned"
            >
              📌
            </span>
          )}
        </div>

        <div className="flex gap-2 ml-3 shrink-0">
          <button
            onClick={() => onPin(note._id)}
            className={`h-9 w-9 rounded-xl flex items-center justify-center transition ${note.isPinned
                ? "bg-amber-50 text-amber-500 hover:bg-amber-100"
                : "bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-500"
              }`}
            title={
              note.isPinned
                ? "Unpin note"
                : "Pin note"
            }
          >
            📌
          </button>

          <button
            onClick={() => onEdit(note)}
            className="
              h-9 w-9
              rounded-xl
              bg-slate-50
              text-slate-500
              flex items-center justify-center
              hover:bg-indigo-50
              hover:text-indigo-600
              transition
            "
            title="Edit note"
          >
            ✏️
          </button>

          <button
            onClick={handleDelete}
            className="
              h-9 w-9
              rounded-xl
              bg-slate-50
              text-slate-500
              flex items-center justify-center
              hover:bg-red-50
              hover:text-red-500
              transition
            "
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Note Content */}
      <p className="text-slate-800 mb-6 line-clamp-4 leading-6">
        {note.content}
      </p>

      {/* Metadata */}
      <div className="flex justify-between items-center gap-3">
        <span className="text-xs text-slate-400">
          {new Date(
            note.createdAt
          ).toLocaleDateString()}
        </span>

        <span className="text-xs px-3 py-1.5 rounded-full bg-white text-slate-600 font-medium">
          {note.category}
        </span>
      </div>

      {/* AI Summary Action */}
      <div className="mt-5">
        <button
          onClick={handleSummarize}
          disabled={isSummarizing}
          className="
            w-full
            px-4 py-2.5
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-700
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-white
            font-medium
            shadow-sm
            hover:shadow
            transition
          "
        >
          {isSummarizing
            ? "✨ Generating Summary..."
            : summary
              ? "🔄 Regenerate Summary"
              : "✨ Summarize with AI"}
        </button>
      </div>

      {/* AI Summary */}
      {summary && (
        <div
          className="
            mt-5
            rounded-2xl
            bg-indigo-50/60
            border border-indigo-100
            p-4
          "
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="h-7 w-7 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">
                ✨
              </span>

              <h3 className="text-sm font-semibold text-indigo-700">
                AI Summary
              </h3>
            </div>

            <button
              onClick={handleRemoveSummary}
              className="
                h-8 w-8
                rounded-lg
                flex items-center justify-center
                text-slate-400
                hover:bg-red-50
                hover:text-red-500
                transition
              "
              title="Remove AI summary"
            >
              🗑️
            </button>
          </div>

          <p className="text-sm text-slate-800 leading-6 whitespace-pre-line">
            {summary}
          </p>
        </div>
      )}

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="
                text-xs
                px-2.5 py-1
                rounded-lg
                bg-indigo-50
                text-indigo-600
                font-medium
              "
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