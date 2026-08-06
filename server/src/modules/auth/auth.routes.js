import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  updateMyProfile,
  changePassword,
} from "./auth.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateMyProfile);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.post("/logout", logout);

export default router;