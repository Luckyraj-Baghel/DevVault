import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { search } from "./search.controller.js";

const router = express.Router();

router.get("/", authMiddleware, search);

export default router;