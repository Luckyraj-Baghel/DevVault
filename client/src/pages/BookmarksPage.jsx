import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import BookmarkCard from "../components/bookmarks/BookmarkCard";
import BookmarkModal from "../components/bookmarks/BookmarkModal";
import toast from "react-hot-toast";

import {
  getAllBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "../services/bookmark.service";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  const fetchBookmarks = async () => {
    try {
      const response = await getAllBookmarks();
      setBookmarks(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleCreateBookmark = async (bookmarkData) => {
    try {
      const response = await createBookmark(bookmarkData);

      setBookmarks((prev) => [
        response.data,
        ...prev,
      ]);

      setIsModalOpen(false);

      toast.success("Bookmark created successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create bookmark"
      );
    }
  };

  const handleUpdateBookmark = async (bookmarkData) => {
    try {
      const response = await updateBookmark(
        editingBookmark._id,
        bookmarkData
      );

      setBookmarks((prev) =>
        prev.map((bookmark) =>
          bookmark._id === editingBookmark._id
            ? response.data
            : bookmark
        )
      );

      setEditingBookmark(null);
      setIsModalOpen(false);

      toast.success("Bookmark updated successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update bookmark"
      );
    }
  };

  const handleDeleteBookmark = async (id) => {
    try {
      await deleteBookmark(id);

      setBookmarks((prev) =>
        prev.filter(
          (bookmark) => bookmark._id !== id
        )
      );

      toast.success("Bookmark deleted successfully");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to delete bookmark"
      );
    }
  };

  const handleOpenLink = (url) => {
    window.open(url, "_blank");
  };

  const openCreateModal = () => {
    setEditingBookmark(null);
    setIsModalOpen(true);
  };

  const openEditModal = (bookmark) => {
    setEditingBookmark(bookmark);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-slate-600 text-lg font-medium">
            Loading bookmarks...
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
              Bookmarks
            </h1>

            <p className="text-slate-600 mt-2">
              Store useful developer resources and links.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="self-start sm:self-auto bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
          >
            + New Bookmark
          </button>
        </div>

        {/* Bookmarks */}
        {bookmarks.length === 0 ? (
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-10 text-center shadow-sm">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white border border-amber-100 flex items-center justify-center text-2xl">
              🔖
            </div>

            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              No bookmarks yet
            </h2>

            <p className="text-slate-600 mb-6">
              Start saving useful developer resources and links for later.
            </p>

            <button
              onClick={openCreateModal}
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              + Create Bookmark
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {bookmarks.map((bookmark) => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={openEditModal}
                onDelete={handleDeleteBookmark}
                onOpen={handleOpenLink}
              />
            ))}
          </div>
        )}

        {/* Bookmark Modal */}
        <BookmarkModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingBookmark(null);
          }}
          initialData={editingBookmark}
          onSubmit={
            editingBookmark
              ? handleUpdateBookmark
              : handleCreateBookmark
          }
        />

      </div>
    </DashboardLayout>
  );
};

export default BookmarksPage;