import express from "express";

import {
  createAssignment,
  getAssignmentsByCourse,
} from "../controllers/assignment.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(["admin", "lecturer"]),
  createAssignment
);

router.get(
  "/:courseId",
  authenticate,
  getAssignmentsByCourse
);

export default router;