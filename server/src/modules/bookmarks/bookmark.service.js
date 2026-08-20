import Bookmark from "./bookmark.model.js";
import { escapeRegex } from "../../utils/escapeRegex.js";

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
        description: {
          $regex: escapedSearch,
          $options: "i",
        },
      },
      {
        url: {
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
      {
        type: {
          $regex: escapedSearch,
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
  const { title, url, type, description, tags, isFavorite } = updateData;

  const allowedUpdates = {
    title,
    url,
    type,
    description,
    tags,
    isFavorite,
  };

  Object.keys(allowedUpdates).forEach((key) => {
    if (allowedUpdates[key] === undefined) {
      delete allowedUpdates[key];
    }
  });

  const bookmark = await Bookmark.findOneAndUpdate(
    {
      _id: bookmarkId,
      owner: userId,
    },
    allowedUpdates,
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