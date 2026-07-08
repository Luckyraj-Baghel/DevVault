import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { getStats } from "./dashboard.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, getStats);

export default router;