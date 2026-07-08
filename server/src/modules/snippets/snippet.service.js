import Snippet from "./snippet.model.js";

export const createSnippet = async (snippetData, userId) => {
  const {
    title,
    code,
    language,
    description,
    tags,
    isFavorite,
  } = snippetData;

  if (!title || !code || !language) {
    throw new Error("Title, code and language are required");
  }

  const snippet = await Snippet.create({
    title,
    code,
    language,
    description,
    tags,
    isFavorite,
    owner: userId,
  });

  return snippet;
};

export const getAllSnippets = async (userId, search = "") => {
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
        code: {
          $regex: search,
          $options: "i",
        },
      },
      {
        language: {
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

  return await Snippet.find(query).sort({
    isFavorite: -1,
    createdAt: -1,
  });
};

export const getSnippetById = async (snippetId, userId) => {
  const snippet = await Snippet.findOne({
    _id: snippetId,
    owner: userId,
  });

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  return snippet;
};

export const updateSnippet = async (
  snippetId,
  userId,
  updateData
) => {
  const snippet = await Snippet.findOneAndUpdate(
    {
      _id: snippetId,
      owner: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  return snippet;
};

export const deleteSnippet = async (
  snippetId,
  userId
) => {
  const snippet = await Snippet.findOneAndDelete({
    _id: snippetId,
    owner: userId,
  });

  if (!snippet) {
    throw new Error("Snippet not found");
  }

  return snippet;
};