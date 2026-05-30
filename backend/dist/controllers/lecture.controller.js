"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLectures = exports.createLecture = void 0;
const Lecture_1 = __importDefault(require("../models/Lecture"));
const createLecture = async (req, res) => {
    try {
        const lecture = await Lecture_1.default.create({
            ...req.body,
            createdBy: req.user?.userId,
        });
        res.status(201).json({
            success: true,
            data: lecture,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create lecture",
        });
    }
};
exports.createLecture = createLecture;
const getLectures = async (req, res) => {
    try {
        const lectures = await Lecture_1.default.find({
            courseId: req.params.courseId,
        }).sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            data: lectures,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch lectures",
        });
    }
};
exports.getLectures = getLectures;
//# sourceMappingURL=lecture.controller.js.map