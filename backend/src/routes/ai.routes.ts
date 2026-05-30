import express from "express";

import { summarizeNotes } from "../controllers/ai.controller";

import { authenticate } from "../middlewares/auth.middleware";

import { aiUpload } from "../middlewares/aiUpload.middleware";

const router = express.Router();

router.post(
  "/summarize",
  authenticate,
  aiUpload.single("pdf"),
  summarizeNotes
);

export default router;