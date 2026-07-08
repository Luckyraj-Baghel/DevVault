import Bookmark from "./bookmark.model.js";

export const createBookmark = async (
  bookmarkData,
  userId
) => {
  const {
    title,
    url,
    type,
    description,
    tags,
    isFavorite,
  } = bookmarkData;

  if (!title || !url) {
    throw new Error("Title and URL are required");
  }

  const bookmark = await Bookmark.create({
    title,
    url,
    type,
    description,
    tags,
    isFavorite,
    owner: userId,
  });

  return bookmark;
};

export const getAllBookmarks = async (userId, search = "") => {
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
        description: {
          $regex: search,
          $options: "i",
        },
      },
      {
        url: {
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
      {
        type: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  return await Bookmark.find(query).sort({
    isFavorite: -1,
    createdAt: -1,
  });
};

export const getBookmarkById = async (bookmarkId, userId) => {
  const bookmark = await Bookmark.findOne({
    _id: bookmarkId,
    owner: userId,
  });

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  return bookmark;
};

export const updateBookmark = async (
  bookmarkId,
  userId,
  updateData
) => {
  const bookmark = await Bookmark.findOneAndUpdate(
    {
      _id: bookmarkId,
      owner: userId,
    },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  return bookmark;
};

export const deleteBookmark = async (
  bookmarkId,
  userId
) => {
  const bookmark = await Bookmark.findOneAndDelete({
    _id: bookmarkId,
    owner: userId,
  });

  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  return bookmark;
};