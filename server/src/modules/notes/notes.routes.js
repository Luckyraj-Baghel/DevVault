import express from "express";
import {
  create,
  getAll,
  getOne,
  update,
  remove,
  togglePin,
} from "./notes.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/", authMiddleware, getAll);
router.get("/:id", authMiddleware, getOne);
router.put("/:id", authMiddleware, update);
router.patch("/:id/pin", authMiddleware, togglePin);
router.delete("/:id", authMiddleware, remove);

export default router;