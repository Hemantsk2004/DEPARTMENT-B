import { Request, Response } from "express";
import { Assignment } from "../models/Assignment";
import { Course } from "../models/Course";
import { createNotification } from "../utils/createNotification";
import { User } from "../models/User";

export const createAssignment = async (
  req: Request,
  res: Response
) => {
  try {
    const assignment =
      await Assignment.create({
        ...req.body,
        createdBy: req.user?.userId,
      });

    await Course.findByIdAndUpdate(
      req.body.courseId,
      {
        $push: {
          assignments: assignment._id,
        },
      }
    );

    const students =
  await User.find({
    role: "student",
  });

for (const student of students) {

  await createNotification(
    student._id.toString(),

    "New Assignment",

    `${assignment.title} has been posted`,

    "assignment"
  );

}


    res.status(201).json({
      success: true,
      message:
        "Assignment created successfully",
      data: assignment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to create assignment",
    });
  }
};

export const getAssignmentsByCourse =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const assignments =
        await Assignment.find({
          courseId:
            req.params.courseId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        data: assignments,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch assignments",
      });
    }
  };