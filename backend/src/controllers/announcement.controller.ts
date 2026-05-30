import { Request, Response } from "express";
import {Announcement} from "../models/Announcement";

export const createAnnouncement =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const announcement =
        await Announcement.create({
          ...req.body,
          createdBy:
            req.user?.userId,
        });

      res.status(201).json({
        success: true,
        data: announcement,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to create announcement",
      });
    }
  };

export const getAnnouncements =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const announcements =
        await Announcement.find({
          courseId:
            req.params.courseId,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json({
        success: true,
        data: announcements,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch announcements",
      });
    }
  };