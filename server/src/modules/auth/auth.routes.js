import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "./auth.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

export default router;