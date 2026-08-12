import express from "express";
import { testAI } from "./ai.controller.js";

const router = express.Router();

router.post("/test", testAI);

export default router;