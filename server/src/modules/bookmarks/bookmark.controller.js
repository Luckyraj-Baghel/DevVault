import {
  createBookmark,
  getAllBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
} from "./bookmark.service.js";

export const create = async (req, res) => {
  try {
    const bookmark = await createBookmark(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Bookmark created successfully",
      data: bookmark,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const bookmarks = await getAllBookmarks(
      req.user.id,
      req.query.search
    );

    res.status(200).json({
      success: true,
      data: bookmarks,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const bookmark = await getBookmarkById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: bookmark,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const bookmark = await updateBookmark(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Bookmark updated successfully",
      data: bookmark,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteBookmark(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Bookmark deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};