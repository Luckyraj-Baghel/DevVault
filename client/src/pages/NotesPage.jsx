import { useEffect, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import EditNoteModal from "../components/notes/EditNoteModal";
import CreateNoteModal from "../components/notes/CreateNoteModal";
import NoteCard from "../components/notes/NoteCard";

import toast from "react-hot-toast";

import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  togglePinNote,
} from "../services/notes.service";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [selectedNote, setSelectedNote] = useState(null);

  const fetchNotes = async () => {
    try {
      const response = await getAllNotes();
      setNotes(response.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes();
      setLoading(false);
    };

    loadNotes();
  }, []);

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      await fetchNotes();

      toast.success("Note created successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create note"
      );
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);

      setNotes((prev) =>
        prev.filter((note) => note._id !== id)
      );

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete note"
      );
    }
  };

  const handleEditClick = (note) => {
    setSelectedNote(note);
    setShowEditModal(true);
  };

  const handleUpdateNote = async (id, noteData) => {
    try {
      await updateNote(id, noteData);

      await fetchNotes();

      toast.success("Note updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update note"
      );
    }
  };

  const handlePinNote = async (id) => {
    try {
      await togglePinNote(id);

      await fetchNotes();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to pin note"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-slate-500 text-sm">
            Loading notes...
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const filteredNotes = notes.filter((note) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.category.toLowerCase().includes(query) ||
      note.tags.some((tag) =>
        tag.toLowerCase().includes(query)
      );

    const matchesCategory =
      selectedCategory === "All" ||
      note.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(notes.map((note) => note.category)),
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-indigo-600 mb-2">
              Knowledge Vault
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Notes
            </h1>

            <p className="text-slate-500 mt-2">
              Capture ideas, concepts and learning resources.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              px-5 py-3
              rounded-2xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-medium
              shadow-sm
              hover:shadow-md
              transition
            "
          >
            + New Note
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search notes, tags, categories..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              w-full
              bg-white
              border border-slate-200
              rounded-2xl
              px-5 py-4
              text-slate-900
              placeholder:text-slate-400
              outline-none
              shadow-sm
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-100
              transition
            "
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`
                px-4 py-2
                rounded-xl
                text-sm
                font-medium
                border
                transition
                ${
                  selectedCategory === category
                    ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Empty Search Result */}
        {filteredNotes.length === 0 &&
          notes.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm">
              <div className="text-5xl mb-4">
                🔎
              </div>

              <h2 className="text-xl font-semibold text-slate-900">
                No notes found
              </h2>

              <p className="text-slate-500 mt-2">
                Try a different search term or category.
              </p>
            </div>
          )}

        {/* No Notes */}
        {notes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 md:p-16 text-center shadow-sm">
            <div className="text-6xl mb-6">
              📝
            </div>

            <h2 className="text-2xl font-semibold text-slate-900">
              No Notes Yet
            </h2>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
              Create your first note to start building
              your knowledge vault.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="
                mt-8
                px-6 py-3
                rounded-2xl
                bg-indigo-600
                hover:bg-indigo-700
                text-white
                font-medium
                shadow-sm
                transition
              "
            >
              Create First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...filteredNotes]
              .sort(
                (a, b) =>
                  Number(b.isPinned) -
                  Number(a.isPinned)
              )
              .map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onDelete={handleDeleteNote}
                  onEdit={handleEditClick}
                  onPin={handlePinNote}
                />
              ))}
          </div>
        )}

        {/* Create Modal */}
        <CreateNoteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateNote}
        />

        {/* Edit Modal */}
        <EditNoteModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          note={selectedNote}
          onUpdate={handleUpdateNote}
        />

      </div>
    </DashboardLayout>
  );
};

export default NotesPage;