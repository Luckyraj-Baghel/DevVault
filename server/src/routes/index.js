import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import notesRoutes from "../modules/notes/notes.routes.js";
import projectRoutes from "../modules/projects/project.routes.js";
import snippetRoutes from "../modules/snippets/snippet.routes.js";
import bookmarkRoutes from "../modules/bookmarks/bookmark.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);
router.use("/projects", projectRoutes);
router.use("/snippets", snippetRoutes);
router.use("/bookmarks", bookmarkRoutes);

export default router;