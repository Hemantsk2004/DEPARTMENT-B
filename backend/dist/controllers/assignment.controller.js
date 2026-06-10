"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignmentsByCourse = exports.createAssignment = void 0;
const Assignment_1 = require("../models/Assignment");
const Course_1 = require("../models/Course");
const createNotification_1 = require("../utils/createNotification");
const User_1 = require("../models/User");
const createAssignment = async (req, res) => {
    try {
        const assignment = await Assignment_1.Assignment.create({
            ...req.body,
            createdBy: req.user?.userId,
        });
        await Course_1.Course.findByIdAndUpdate(req.body.courseId, {
            $push: {
                assignments: assignment._id,
            },
        });
        const students = await User_1.User.find({
            role: "student",
        });
        for (const student of students) {
            await (0, createNotification_1.createNotification)(student._id.toString(), "New Assignment", `${assignment.title} has been posted`, "assignment");
        }
        res.status(201).json({
            success: true,
            message: "Assignment created successfully",
            data: assignment,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create assignment",
        });
    }
};
exports.createAssignment = createAssignment;
const getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment_1.Assignment.find({
            courseId: req.params.courseId,
        }).sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            data: assignments,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch assignments",
        });
    }
};
exports.getAssignmentsByCourse = getAssignmentsByCourse;
//# sourceMappingURL=assignment.controller.js.map