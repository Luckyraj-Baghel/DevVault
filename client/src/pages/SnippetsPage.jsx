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
      toast.success("Snippet copied to clipboard!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy snippet");
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
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-slate-600 text-lg font-medium">
            Loading snippets...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Code Snippets
            </h1>

            <p className="text-slate-600 mt-2">
              Save reusable code snippets for future projects.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="self-start sm:self-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            + New Snippet
          </button>
        </div>

        {/* Snippets */}
        {snippets.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border border-emerald-100 flex items-center justify-center text-2xl">
              💻
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No snippets yet
            </h2>

            <p className="text-slate-600 mb-6">
              Start building your reusable code library by creating your first snippet.
            </p>

            <button
              onClick={openCreateModal}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              + Create Snippet
            </button>
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

        {/* Snippet Modal */}
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