import { RequestHandler } from "express";
import { Material } from "../models/Material";
import { Course } from "../models/Course";
import { sendResponse } from "../utils/responseHandler";
import fs from "fs";

export const uploadMaterial: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const file = req.file;

    if (!file) {
      sendResponse(res, 400, false, "No file uploaded", null);
      return;
    }

    if (!req.body.title) {
      sendResponse(res, 400, false, "Material title is required", null);
      return;
    }

    const course = await Course.findById(courseId);
    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }

    const material = new Material({
      title: req.body.title,

      fileUrl: `${process.env.BASE_URL}/uploads/${file.filename}`,

      courseId,
      uploadedBy: req.user?.userId,
    });

    await material.save();

    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { materials: material._id },
    });

    sendResponse(res, 201, true, "Material uploaded successfully", material);
  } catch {
    sendResponse(res, 500, false, "Failed to upload material", null);
  }
};

export const getMaterialsByCourse: RequestHandler = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await Material.find({ courseId })
      .populate("uploadedBy", "name")
      .sort({ createdAt: -1 });
    sendResponse(res, 200, true, "Materials fetched successfully", materials);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch materials", null);
  }
};

export const deleteMaterial: RequestHandler = async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id);
    if (!material) {
      sendResponse(res, 404, false, "Material not found", null);
      return;
    }

    // Remove file from disk
    if (material.fileUrl && fs.existsSync(material.fileUrl)) {
      fs.unlinkSync(material.fileUrl);
    }

    // Remove from course
    await Course.findByIdAndUpdate(material.courseId, {
      $pull: { materials: material._id },
    });

    sendResponse(res, 200, true, "Material deleted successfully", null);
  } catch {
    sendResponse(res, 500, false, "Failed to delete material", null);
  }
};