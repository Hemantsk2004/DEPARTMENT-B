import { Request, Response } from "express";
import Lecture from "../models/Lecture";
import { User } from "../models/User";
import { createNotification } from "../utils/createNotification";

export const createLecture =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lecture =
        await Lecture.create({
          ...req.body,
          createdBy:
            req.user?.userId,
        });

        const students =
          await User.find({
            role: "student",
          });

        for (const student of students) {
          await createNotification(
            student._id.toString(),
            "New Lecture",
            lecture.title,
            "lecture"
          );
        } 

      res.status(201).json({
        success: true,
        data: lecture,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create lecture",
      });
    }
  };

export const getLectures =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lectures =
        await Lecture.find({
          courseId:
            req.params.courseId,
        }).sort({
          createdAt: -1,
        });  

      res.status(200).json({
        success: true,
        data: lectures,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch lectures",
      });
    }
  };