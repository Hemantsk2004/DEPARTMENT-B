import express from "express";

import {
  createAnnouncement,
  getAnnouncements,
} from "../controllers/announcement.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "lecturer"]),
  createAnnouncement
);

router.get(
  "/:courseId",
  authenticate,
  getAnnouncements
);

export default router;