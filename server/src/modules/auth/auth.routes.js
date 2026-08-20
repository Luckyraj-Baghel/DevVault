import express from "express";
import rateLimit from "express-rate-limit";
import {
  register,
  login,
  logout,
  getMe,
  updateMyProfile,
  changePassword,
  forgotPasswordController,
  resetPasswordController,
} from "./auth.controller.js";

import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many requests, please try again after 15 minutes.",
  },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", authMiddleware, getMe);
router.put("/profile", authMiddleware, updateMyProfile);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.post(
  "/forgot-password",
  authLimiter,
  forgotPasswordController
);
router.put(
  "/reset-password",
  resetPasswordController
);
router.post("/logout", logout);

export default router;