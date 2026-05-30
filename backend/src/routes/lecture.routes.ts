import express from "express";

import {
  createLecture,
  getLectures,
} from "../controllers/lecture.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "lecturer"]),
  createLecture
);

router.get(
  "/:courseId",
  authenticate,
  getLectures
);

export default router;