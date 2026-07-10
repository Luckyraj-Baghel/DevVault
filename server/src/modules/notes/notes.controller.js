import {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    togglePinNote,
} from "./notes.service.js";

export const create = async (req, res) => {
    try {
        const note = await createNote(req.body, req.user.id);

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: note,
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
        const notes = await getAllNotes(
            req.user.id,
            req.query.search
        );

        res.status(200).json({
            success: true,
            data: notes,
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
        const note = await getNoteById(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            data: note,
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
        const note = await updateNote(
            req.params.id,
            req.user.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: note,
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
        await deleteNote(req.params.id, req.user.id);

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const togglePin = async (req, res) => {
  try {
    const note = await togglePinNote(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: note.isPinned
        ? "Note pinned successfully"
        : "Note unpinned successfully",
      data: note,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};