import Note from "../notes/notes.model.js";
import Project from "../projects/project.model.js";
import Snippet from "../snippets/snippet.model.js";
import Bookmark from "../bookmarks/bookmark.model.js";

export const getDashboardStats = async (userId) => {
  const [
    totalNotes,
    totalProjects,
    totalSnippets,
    totalBookmarks,
    pinnedNotes,
    favoriteSnippets,
    favoriteBookmarks,
    completedProjects,
    inProgressProjects,
  ] = await Promise.all([
    Note.countDocuments({
      owner: userId,
    }),

    Project.countDocuments({
      owner: userId,
    }),

    Snippet.countDocuments({
      owner: userId,
    }),

    Bookmark.countDocuments({
      owner: userId,
    }),

    Note.countDocuments({
      owner: userId,
      isPinned: true,
    }),

    Snippet.countDocuments({
      owner: userId,
      isFavorite: true,
    }),

    Bookmark.countDocuments({
      owner: userId,
      isFavorite: true,
    }),

    Project.countDocuments({
      owner: userId,
      status: "Completed",
    }),

    Project.countDocuments({
      owner: userId,
      status: "In Progress",
    }),
  ]);

  return {
    totalNotes,
    totalProjects,
    totalSnippets,
    totalBookmarks,
    pinnedNotes,
    favoriteSnippets,
    favoriteBookmarks,
    completedProjects,
    inProgressProjects,
  };
};