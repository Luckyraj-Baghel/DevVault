import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import notesRoutes from "../modules/notes/notes.routes.js";
import projectRoutes from "../modules/projects/project.routes.js";
import snippetRoutes from "../modules/snippets/snippet.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);
router.use("/projects", projectRoutes);
router.use("/snippets", snippetRoutes);

export default router;