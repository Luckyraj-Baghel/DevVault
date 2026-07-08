import {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
} from "./snippet.service.js";

export const create = async (req, res) => {
  try {
    const snippet = await createSnippet(
      req.body,
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Snippet created successfully",
      data: snippet,
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
    const snippets = await getAllSnippets(
      req.user.id,
      req.query.search
    );

    res.status(200).json({
      success: true,
      data: snippets,
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
    const snippet = await getSnippetById(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      data: snippet,
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
    const snippet = await updateSnippet(
      req.params.id,
      req.user.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Snippet updated successfully",
      data: snippet,
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
    await deleteSnippet(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Snippet deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};