import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import EditNoteModal from "../components/notes/EditNoteModal";
import toast from "react-hot-toast";

import {
  getAllNotes,
  createNote,
  deleteNote,
  updateNote,
  togglePinNote,
} from "../services/notes.service";

import NoteCard from "../components/notes/NoteCard";
import CreateNoteModal from "../components/notes/CreateNoteModal";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleUpdateNote = async (
    id,
    noteData
  ) => {
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
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to pin note"
      );
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white text-xl">
          Loading notes...
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
      {filteredNotes.length === 0 && (
        <div className="text-center py-16 text-slate-500">
          No notes found for "{searchTerm}"
        </div>
      )}
      <div className="relative">
        <input
          type="text"
          placeholder="Search notes, tags, categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
      w-full
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      px-5
      py-4
      text-white
      placeholder-slate-500
      outline-none
      focus:border-indigo-500
      transition
    "
        />
      </div>

      <div className="flex gap-3 flex-wrap mt-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
        px-4 py-2 rounded-xl transition
        ${selectedCategory === category
                ? "bg-indigo-600 text-white"
                : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white"
              }
      `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-8">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Notes
            </h1>

            <p className="text-slate-400 mt-2">
              Capture ideas, concepts and learning resources.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium"
          >
            + New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div className="border border-slate-800 bg-slate-900 rounded-3xl p-16 text-center">
            <div className="text-6xl mb-6">📝</div>

            <h2 className="text-2xl font-semibold text-white">
              No Notes Yet
            </h2>

            <p className="text-slate-400 mt-3">
              Create your first note to start building your knowledge vault.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-8 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
            >
              Create First Note
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...filteredNotes]
              .sort((a, b) => b.isPinned - a.isPinned)
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

        <CreateNoteModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateNote}
        />

      </div>

      <EditNoteModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        note={selectedNote}
        onUpdate={handleUpdateNote}
      />
    </DashboardLayout>
  );
};

export default NotesPage;