import { RequestHandler } from "express";
import { Notification } from "../models/Notification";
import { sendResponse } from "../utils/responseHandler";

export const getMyNotifications: RequestHandler = async (
  req,
  res
) => {
  try {
    const notifications = await Notification.find({
      userId: req.user?.userId,
    }).sort({
      createdAt: -1,
    });

    sendResponse(
      res,
      200,
      true,
      "Notifications fetched",
      notifications
    );
  } catch (error) {
    console.error(error);

    sendResponse(
      res,
      500,
      false,
      "Failed to fetch notifications",
      null
    );
  }
};

export const markAsRead: RequestHandler = async (
  req,
  res
) => {
  try {
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true,
      }
    );

    sendResponse(
      res,
      200,
      true,
      "Notification marked as read",
      null
    );
  } catch (error) {
    console.error(error);

    sendResponse(
      res,
      500,
      false,
      "Failed to update notification",
      null
    );
  }
};