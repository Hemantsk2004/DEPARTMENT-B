import { RequestHandler } from "express";
import { Course } from "../models/Course";
import { sendResponse } from "../utils/responseHandler";

export const createCourse: RequestHandler = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    await course.populate("lecturer", "name email");
    sendResponse(res, 201, true, "Course created successfully", course);
  } catch (error: any) {
    if (error.code === 11000) {
      sendResponse(res, 400, false, "Course code already exists", null);
      return;
    }
    sendResponse(res, 500, false, "Failed to create course", null);
  }
};

export const getCourses: RequestHandler = async (_req, res) => {
  try {
    const courses = await Course.find()
      .populate("lecturer", "name email")
      .sort({ createdAt: -1 });
    sendResponse(res, 200, true, "Courses fetched successfully", courses);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch courses", null);
  }
};

export const getLecturerCourses: RequestHandler = async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const courses = await Course.find({ lecturer: lecturerId })
      .populate("lecturer", "name email")
      .populate("materials")
      .sort({ createdAt: -1 });

    sendResponse(res, 200, true, "Lecturer courses fetched successfully", courses);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch lecturer courses", null);
  }
};

export const getCourseById: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("lecturer", "name email")
      .populate("materials");
    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Course fetched successfully", course);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch course", null);
  }
};

export const updateCourse: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("lecturer", "name email");

    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Course updated successfully", course);
  } catch (error: any) {
    if (error.code === 11000) {
      sendResponse(res, 400, false, "Course code already exists", null);
      return;
    }
    sendResponse(res, 500, false, "Failed to update course", null);
  }
};

export const deleteCourse: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Course deleted successfully", null);
  } catch {
    sendResponse(res, 500, false, "Failed to delete course", null);
  }
};

export const getStudentsByCourse: RequestHandler = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "students",
      "name email role"
    );
    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Students fetched successfully", course.students);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch students", null);
  }
};

export const fetchStudentCourses: RequestHandler = async (req, res) => {
  const studentId = req.user?.userId;
  if (!studentId) {
    sendResponse(res, 401, false, "Unauthorized", null);
    return;
  }

  try {
    const enrolledCourses = await Course.find({ students: studentId })
      .populate("lecturer", "name email")
      .sort({ createdAt: -1 })
      .lean();

    // Fix: return empty array instead of 404 when no courses
    sendResponse(res, 200, true, "Student courses fetched successfully", enrolledCourses);
  } catch {
    sendResponse(res, 500, false, "Failed to fetch student courses", null);
  }
};

export const enrollStudent: RequestHandler = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user?.userId;

  if (!studentId) {
    sendResponse(res, 401, false, "Unauthorized", null);
    return;
  }

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } },
      { new: true }
    ).populate("lecturer", "name email");

    if (!course) {
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Enrolled successfully", course);
  } catch {
    sendResponse(res, 500, false, "Failed to enroll", null);
  }
};

export const disenrollStudent: RequestHandler = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user?.userId;

  if (!studentId) {
    sendResponse(res, 401, false, "Unauthorized", null);
    return;
  }

  try {
    const course = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: studentId } },
      { new: true }
    ).populate("lecturer", "name email");

    if (!course) {
      // Fix: was incorrectly passing true for success on error
      sendResponse(res, 404, false, "Course not found", null);
      return;
    }
    sendResponse(res, 200, true, "Disenrolled successfully", course);
  } catch {
    sendResponse(res, 500, false, "Failed to disenroll", null);
  }
};