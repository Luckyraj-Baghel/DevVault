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
        <div className="text-white text-xl">
          Loading bookmarks...
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
              Bookmarks
            </h1>

            <p className="text-slate-400 mt-2">
              Store useful developer resources and links.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-3 rounded-2xl text-white font-medium"
          >
            + New Bookmark
          </button>
        </div>

        {bookmarks.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
            <p className="text-slate-400">
              No bookmarks found.
            </p>
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