import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import SnippetCard from "../components/snippets/SnippetCard";
import SnippetModal from "../components/snippets/SnippetModal";
import toast from "react-hot-toast";

import {
  getAllSnippets,
  createSnippet,
  updateSnippet,
  deleteSnippet,
} from "../services/snippet.service";

const SnippetsPage = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  const fetchSnippets = async () => {
    try {
      const response = await getAllSnippets();
      setSnippets(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleCreateSnippet = async (snippetData) => {
    try {
      const response = await createSnippet(snippetData);

      setSnippets((prev) => [
        response.data,
        ...prev,
      ]);

      toast.success("Snippet created successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create snippet"
      );
    }
  };

  const handleUpdateSnippet = async (snippetData) => {
    try {
      const response = await updateSnippet(
        editingSnippet._id,
        snippetData
      );

      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet._id === editingSnippet._id
            ? response.data
            : snippet
        )
      );

      setEditingSnippet(null);

      toast.success("Snippet updated successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update snippet"
      );
    }
  };

  const handleDeleteSnippet = async (id) => {
    try {
      await deleteSnippet(id);

      setSnippets((prev) =>
        prev.filter(
          (snippet) => snippet._id !== id
        )
      );

      toast.success("Snippet deleted successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete snippet"
      );
    }
  };

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      alert("Snippet copied to clipboard!");
    } catch (error) {
      console.log(error);
    }
  };

  const openCreateModal = () => {
    setEditingSnippet(null);
    setIsModalOpen(true);
  };

  const openEditModal = (snippet) => {
    setEditingSnippet(snippet);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-white text-xl">
          Loading snippets...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white">
              Code Snippets
            </h1>

            <p className="text-slate-400 mt-2">
              Save reusable code snippets for future projects.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-2xl text-white font-medium"
          >
            + New Snippet
          </button>
        </div>

        {snippets.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              No snippets found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {snippets.map((snippet) => (
              <SnippetCard
                key={snippet._id}
                snippet={snippet}
                onEdit={openEditModal}
                onDelete={handleDeleteSnippet}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}

        <SnippetModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingSnippet(null);
          }}
          initialData={editingSnippet}
          onSubmit={
            editingSnippet
              ? handleUpdateSnippet
              : handleCreateSnippet
          }
        />

      </div>
    </DashboardLayout>
  );
};

export default SnippetsPage;