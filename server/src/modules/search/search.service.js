import Note from "../notes/notes.model.js";
import Project from "../projects/project.model.js";
import Snippet from "../snippets/snippet.model.js";
import Bookmark from "../bookmarks/bookmark.model.js";

export const universalSearch = async (userId, query) => {
  if (!query) {
    return {
      notes: [],
      projects: [],
      snippets: [],
      bookmarks: [],
    };
  }

  const searchQuery = {
    $regex: query,
    $options: "i",
  };

  const [notes, projects, snippets, bookmarks] = await Promise.all([
    Note.find({
      owner: userId,
      $or: [
        { title: searchQuery },
        { content: searchQuery },
        { tags: { $elemMatch: searchQuery } },
      ],
    }),

    Project.find({
      owner: userId,
      $or: [
        { title: searchQuery },
        { description: searchQuery },
        { techStack: { $elemMatch: searchQuery } },
        { features: { $elemMatch: searchQuery } },
      ],
    }),

    Snippet.find({
      owner: userId,
      $or: [
        { title: searchQuery },
        { code: searchQuery },
        { language: searchQuery },
        { tags: { $elemMatch: searchQuery } },
      ],
    }),

    Bookmark.find({
      owner: userId,
      $or: [
        { title: searchQuery },
        { description: searchQuery },
        { url: searchQuery },
        { type: searchQuery },
        { tags: { $elemMatch: searchQuery } },
      ],
    }),
  ]);

  return {
    notes,
    projects,
    snippets,
    bookmarks,
  };
};