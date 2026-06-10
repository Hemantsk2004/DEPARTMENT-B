import express from "express";

import {
  getRoomMessages,
} from "../controllers/studyRoom.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

const router =
  express.Router();

router.get(
  "/:courseId",
  authenticate,
  getRoomMessages
);

export default router;