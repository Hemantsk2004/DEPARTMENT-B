import express from "express";
import {
  uploadMaterial,
  getMaterialsByCourse,
  deleteMaterial,
} from "../controllers/material.controller";
import { authenticate, authorize } from "../middlewares/auth.middleware";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get("/:courseId", authenticate, getMaterialsByCourse);
router.post(
  "/:courseId",
  authenticate,
  authorize(["lecturer", "admin"]), // Fix: admin can upload too
  upload.single("file"),
  uploadMaterial
);
router.delete(
  "/:id",
  authenticate,
  authorize(["lecturer", "admin"]),
  deleteMaterial
);

export default router;