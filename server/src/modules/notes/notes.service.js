import Note from "./notes.model.js";

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
  const query = {
    owner: userId,
  };

  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        content: {
          $regex: search,
          $options: "i",
        },
      },
      {
        tags: {
          $elemMatch: {
            $regex: search,
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
  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      owner: userId,
    },
    updateData,
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