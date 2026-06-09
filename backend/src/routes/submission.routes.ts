import express from "express";

import {
  submitAssignment,
  getAssignmentSubmissions,
  gradeSubmission,
  getStudentSubmission,
} from "../controllers/submission.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";



import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.post(
  "/:assignmentId",
  authenticate,
  authorize(["student"]),
  upload.single("file"),
  submitAssignment
);

router.get(
  "/student/:assignmentId",
  authenticate,
  authorize(["student"]),
  getStudentSubmission
);

router.get(
  "/:assignmentId",
  authenticate,
  authorize([
    "admin",
    "lecturer",
  ]),
  getAssignmentSubmissions
);

router.put(
  "/grade/:submissionId",
  authenticate,
  authorize([
    "admin",
    "lecturer",
  ]),
  gradeSubmission
);

export default router;