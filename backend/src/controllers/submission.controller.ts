import { RequestHandler } from "express";
import { Submission } from "../models/Submission";
import { sendResponse } from "../utils/responseHandler";

export const submitAssignment:  RequestHandler = async (req,res) => {
  try {
    const file = req.file;

    if (!file) {
      sendResponse(
        res,
        400,
        false,
        "No file uploaded",
        null
      );
      return;
    }

    const existingSubmission =
      await Submission.findOne({
        assignmentId:
          req.params.assignmentId,
        studentId:
          req.user?.userId,
      });

    if (existingSubmission) {
      sendResponse(
        res,
        400,
        false,
        "Assignment already submitted",
        null
      );
      return;
    }

    const submission =
      await Submission.create({
        assignmentId:
          req.params.assignmentId,

        studentId:
          req.user?.userId,

        fileUrl:
          `${process.env.BASE_URL}/uploads/${file.filename}`,
      });

    sendResponse(
      res,
      201,
      true,
      "Assignment submitted successfully",
      submission
    );
  } catch (error) {
    console.error(error);

    sendResponse(
      res,
      500,
      false,
      "Failed to submit assignment",
      null
    );
  }
};

export const getAssignmentSubmissions:
  RequestHandler = async (
  req,
  res
) => {
  try {
    const submissions =
      await Submission.find({
        assignmentId:
          req.params.assignmentId,
      })
        .populate(
          "studentId",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    sendResponse(
      res,
      200,
      true,
      "Submissions fetched",
      submissions
    );
  } catch {
    sendResponse(
      res,
      500,
      false,
      "Failed to fetch submissions",
      null
    );
  }
};

export const gradeSubmission: RequestHandler = async (
  req,
  res
) => {
  try {
    const submission =
      await Submission.findById(
        req.params.submissionId
      );

    if (!submission) {
      sendResponse(
        res,
        404,
        false,
        "Submission not found",
        null
      );
      return;
    }

    submission.marks = req.body.marks;
    submission.feedback = req.body.feedback;

    await submission.save();

    sendResponse(
      res,
      200,
      true,
      "Submission graded successfully",
      submission
    );
  } catch {
    sendResponse(
      res,
      500,
      false,
      "Failed to grade submission",
      null
    );
  }
};


export const getStudentSubmission: RequestHandler =
  async (req, res) => {
    try {

      console.log(
        "Assignment ID:",
        req.params.assignmentId
      );

      console.log(
        "Logged In Student:",
        req.user?.userId
      );

      const submission =
        await Submission.findOne({
          assignmentId:
            req.params.assignmentId,

          studentId:
            req.user?.userId,
        });

      console.log(
        "Submission Found:",
        submission
      );

      if (!submission) {
        sendResponse(
          res,
          404,
          false,
          "Submission not found",
          null
        );
        return;
      }

      sendResponse(
        res,
        200,
        true,
        "Submission fetched",
        submission
      );
    } catch (error) {
      console.error(error);

      sendResponse(
        res,
        500,
        false,
        "Failed to fetch submission",
        null
      );
    }
  };