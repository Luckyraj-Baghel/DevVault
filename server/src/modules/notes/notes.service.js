import Note from "./notes.model.js";
import { generateSummary } from "../../utils/ai.js";
import { escapeRegex } from "../../utils/escapeRegex.js";

export const createNote = async (noteData, userId) => {
  const { title, content, tags, category, isPinned } = noteData;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const note = await Note.create({
    title,
    content,
    tags,
    category,
    isPinned,
    owner: userId,
  });

  return note;
};

export const getAllNotes = async (userId, search = "") => {

  const escapedSearch = escapeRegex(search);

  const query = {
    owner: userId,
  };

  if (search) {
    query.$or = [
      {
        title: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        content: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        tags: {
          $elemMatch: {
            $regex: escapedSearch,
            $options: "i",
          },
        },
      },
    ];
  }

  const notes = await Note.find(query).sort({
    isPinned: -1,
    createdAt: -1,
  });

  return notes;
};

export const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    owner: userId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

export const updateNote = async (noteId, userId, updateData) => {
  const {
    title,
    content,
    tags,
    category,
    isPinned,
  } = updateData;

  const allowedUpdates = {
    title,
    content,
    tags,
    category,
    isPinned,
  };

  // Remove undefined fields
  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) {
      delete allowedUpdates[key];
    }
  });

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
    },
    allowedUpdates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

export const deleteNote = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    owner: userId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};

export const togglePinNote = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    owner: userId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  note.isPinned = !note.isPinned;

  await note.save();

  return note;
};

export const summarizeNote = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    owner: userId,
  });

  if (!note) {
    throw new Error("Note not found");
  }

  if (!note.content || !note.content.trim()) {
    throw new Error("Note content is empty");
  }

  const summary = await generateSummary(note.content);

  note.summary = summary;

  await note.save();

  return note;
};

export const removeNoteSummary = async (noteId, userId) => {
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
    },
    {
      $unset: {
        summary: 1,
      },
    },
    {
      new: true,
    }
  );

  if (!note) {
    throw new Error("Note not found");
  }

  return note;
};