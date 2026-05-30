"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disenrollStudent = exports.enrollStudent = exports.fetchStudentCourses = exports.getStudentsByCourse = exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getLecturerCourses = exports.getCourses = exports.createCourse = void 0;
const Course_1 = require("../models/Course");
const responseHandler_1 = require("../utils/responseHandler");
const createCourse = async (req, res) => {
    try {
        const course = new Course_1.Course(req.body);
        await course.save();
        await course.populate("lecturer", "name email");
        (0, responseHandler_1.sendResponse)(res, 201, true, "Course created successfully", course);
    }
    catch (error) {
        if (error.code === 11000) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Course code already exists", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to create course", null);
    }
};
exports.createCourse = createCourse;
const getCourses = async (_req, res) => {
    try {
        const courses = await Course_1.Course.find()
            .populate("lecturer", "name email")
            .sort({ createdAt: -1 });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Courses fetched successfully", courses);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch courses", null);
    }
};
exports.getCourses = getCourses;
const getLecturerCourses = async (req, res) => {
    try {
        const { lecturerId } = req.params;
        const courses = await Course_1.Course.find({ lecturer: lecturerId })
            .populate("lecturer", "name email")
            .populate("materials")
            .sort({ createdAt: -1 });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Lecturer courses fetched successfully", courses);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch lecturer courses", null);
    }
};
exports.getLecturerCourses = getLecturerCourses;
const getCourseById = async (req, res) => {
    try {
        const course = await Course_1.Course.findById(req.params.id)
            .populate("lecturer", "name email")
            .populate("materials");
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Course fetched successfully", course);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch course", null);
    }
};
exports.getCourseById = getCourseById;
const updateCourse = async (req, res) => {
    try {
        const course = await Course_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("lecturer", "name email");
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Course updated successfully", course);
    }
    catch (error) {
        if (error.code === 11000) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Course code already exists", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to update course", null);
    }
};
exports.updateCourse = updateCourse;
const deleteCourse = async (req, res) => {
    try {
        const course = await Course_1.Course.findByIdAndDelete(req.params.id);
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Course deleted successfully", null);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to delete course", null);
    }
};
exports.deleteCourse = deleteCourse;
const getStudentsByCourse = async (req, res) => {
    try {
        const course = await Course_1.Course.findById(req.params.courseId).populate("students", "name email role");
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Students fetched successfully", course.students);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch students", null);
    }
};
exports.getStudentsByCourse = getStudentsByCourse;
const fetchStudentCourses = async (req, res) => {
    const studentId = req.user?.userId;
    if (!studentId) {
        (0, responseHandler_1.sendResponse)(res, 401, false, "Unauthorized", null);
        return;
    }
    try {
        const enrolledCourses = await Course_1.Course.find({ students: studentId })
            .populate("lecturer", "name email")
            .sort({ createdAt: -1 })
            .lean();
        // Fix: return empty array instead of 404 when no courses
        (0, responseHandler_1.sendResponse)(res, 200, true, "Student courses fetched successfully", enrolledCourses);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch student courses", null);
    }
};
exports.fetchStudentCourses = fetchStudentCourses;
const enrollStudent = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user?.userId;
    if (!studentId) {
        (0, responseHandler_1.sendResponse)(res, 401, false, "Unauthorized", null);
        return;
    }
    try {
        const course = await Course_1.Course.findByIdAndUpdate(courseId, { $addToSet: { students: studentId } }, { new: true }).populate("lecturer", "name email");
        if (!course) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Enrolled successfully", course);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to enroll", null);
    }
};
exports.enrollStudent = enrollStudent;
const disenrollStudent = async (req, res) => {
    const { courseId } = req.params;
    const studentId = req.user?.userId;
    if (!studentId) {
        (0, responseHandler_1.sendResponse)(res, 401, false, "Unauthorized", null);
        return;
    }
    try {
        const course = await Course_1.Course.findByIdAndUpdate(courseId, { $pull: { students: studentId } }, { new: true }).populate("lecturer", "name email");
        if (!course) {
            // Fix: was incorrectly passing true for success on error
            (0, responseHandler_1.sendResponse)(res, 404, false, "Course not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Disenrolled successfully", course);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to disenroll", null);
    }
};
exports.disenrollStudent = disenrollStudent;
//# sourceMappingURL=course.controller.js.map