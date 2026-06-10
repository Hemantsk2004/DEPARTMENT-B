"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudentSubmission = exports.gradeSubmission = exports.getAssignmentSubmissions = exports.submitAssignment = void 0;
const Submission_1 = require("../models/Submission");
const responseHandler_1 = require("../utils/responseHandler");
const submitAssignment = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "No file uploaded", null);
            return;
        }
        const existingSubmission = await Submission_1.Submission.findOne({
            assignmentId: req.params.assignmentId,
            studentId: req.user?.userId,
        });
        if (existingSubmission) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Assignment already submitted", null);
            return;
        }
        const submission = await Submission_1.Submission.create({
            assignmentId: req.params.assignmentId,
            studentId: req.user?.userId,
            fileUrl: `${process.env.BASE_URL}/uploads/${file.filename}`,
        });
        (0, responseHandler_1.sendResponse)(res, 201, true, "Assignment submitted successfully", submission);
    }
    catch (error) {
        console.error(error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to submit assignment", null);
    }
};
exports.submitAssignment = submitAssignment;
const getAssignmentSubmissions = async (req, res) => {
    try {
        const submissions = await Submission_1.Submission.find({
            assignmentId: req.params.assignmentId,
        })
            .populate("studentId", "name email")
            .sort({
            createdAt: -1,
        });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Submissions fetched", submissions);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch submissions", null);
    }
};
exports.getAssignmentSubmissions = getAssignmentSubmissions;
const gradeSubmission = async (req, res) => {
    try {
        const submission = await Submission_1.Submission.findById(req.params.submissionId);
        if (!submission) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Submission not found", null);
            return;
        }
        submission.marks = req.body.marks;
        submission.feedback = req.body.feedback;
        await submission.save();
        (0, responseHandler_1.sendResponse)(res, 200, true, "Submission graded successfully", submission);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to grade submission", null);
    }
};
exports.gradeSubmission = gradeSubmission;
const getStudentSubmission = async (req, res) => {
    try {
        console.log("Assignment ID:", req.params.assignmentId);
        console.log("Logged In Student:", req.user?.userId);
        const submission = await Submission_1.Submission.findOne({
            assignmentId: req.params.assignmentId,
            studentId: req.user?.userId,
        });
        console.log("Submission Found:", submission);
        if (!submission) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Submission not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Submission fetched", submission);
    }
    catch (error) {
        console.error(error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch submission", null);
    }
};
exports.getStudentSubmission = getStudentSubmission;
//# sourceMappingURL=submission.controller.js.map