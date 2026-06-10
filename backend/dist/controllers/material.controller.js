"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMaterial = exports.getMaterialsByCourse = exports.uploadMaterial = void 0;
const Material_1 = require("../models/Material");
const Course_1 = require("../models/Course");
const responseHandler_1 = require("../utils/responseHandler");
const fs_1 = __importDefault(require("fs"));
const createNotification_1 = require("../utils/createNotification");
const User_1 = require("../models/User");
const uploadMaterial = async (req, res) => {
    try {
        const { courseId } = req.params;
        const file = req.file;
        if (!file) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "No file uploaded", null);
            return;
        }
        if (!req.body.title) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Material title is required", null);
            return;
        }
        const course = await Course_1.Course.findById(courseId);
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        const material = new Material_1.Material({
            title: req.body.title,
            fileUrl: `${process.env.BASE_URL}/uploads/${file.filename}`,
            courseId,
            uploadedBy: req.user?.userId,
        });
        await material.save();
        const students = await User_1.User.find({
            role: "student",
        });
        for (const student of students) {
            await (0, createNotification_1.createNotification)(student._id.toString(), "New Material", `${material.title} uploaded`, "material");
        }
        await Course_1.Course.findByIdAndUpdate(courseId, {
            $addToSet: { materials: material._id },
        });
        (0, responseHandler_1.sendResponse)(res, 201, true, "Material uploaded successfully", material);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to upload material", null);
    }
};
exports.uploadMaterial = uploadMaterial;
const getMaterialsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const materials = await Material_1.Material.find({ courseId })
            .populate("uploadedBy", "name")
            .sort({ createdAt: -1 });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Materials fetched successfully", materials);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch materials", null);
    }
};
exports.getMaterialsByCourse = getMaterialsByCourse;
const deleteMaterial = async (req, res) => {
    try {
        const material = await Material_1.Material.findByIdAndDelete(req.params.id);
        if (!material) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Material not found", null);
            return;
        }
        // Remove file from disk
        if (material.fileUrl && fs_1.default.existsSync(material.fileUrl)) {
            fs_1.default.unlinkSync(material.fileUrl);
        }
        // Remove from course
        await Course_1.Course.findByIdAndUpdate(material.courseId, {
            $pull: { materials: material._id },
        });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Material deleted successfully", null);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to delete material", null);
    }
};
exports.deleteMaterial = deleteMaterial;
//# sourceMappingURL=material.controller.js.map