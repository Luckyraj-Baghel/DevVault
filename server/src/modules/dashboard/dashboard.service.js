import Note from "../notes/notes.model.js";
import Project from "../projects/project.model.js";
import Snippet from "../snippets/snippet.model.js";
import Bookmark from "../bookmarks/bookmark.model.js";

export const getDashboardStats = async (userId) => {
  const [
    recentNotes,
    recentProjects,
    recentSnippets,
    recentBookmarks,
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
    Note.find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title category createdAt"),

    Project.find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title status createdAt"),

    Snippet.find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title language createdAt"),

    Bookmark.find({ owner: userId })
      .sort({ createdAt: -1 })
      .limit(3)
      .select("title type createdAt"),

    Note.countDocuments({ owner: userId }),

    Project.countDocuments({ owner: userId }),

    Snippet.countDocuments({ owner: userId }),

    Bookmark.countDocuments({ owner: userId }),

    Note.countDocuments({ owner: userId, isPinned: true }),

    Snippet.countDocuments({ owner: userId, isFavorite: true }),

    Bookmark.countDocuments({ owner: userId, isFavorite: true }),

    Project.countDocuments({ owner: userId, status: "Completed" }),

    Project.countDocuments({ owner: userId, status: "In Progress" }),
  ]);

  return {
    stats: {
      totalNotes,
      totalProjects,
      totalSnippets,
      totalBookmarks,
      pinnedNotes,
      favoriteSnippets,
      favoriteBookmarks,
      completedProjects,
      inProgressProjects,
    },

    recentNotes,
    recentProjects,
    recentSnippets,
    recentBookmarks,
  };
};