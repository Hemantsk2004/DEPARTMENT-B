import { Request, Response } from "express";
import { Message } from "../models/Message";

export const getRoomMessages = async (
  req: Request,
  res: Response
) => {
  try {
    const messages = await Message.find({
      courseId: req.params.courseId,
    }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });
  }
};

export const saveMessage = async (
  courseId: string,
  senderId: string,
  senderName: string,
  message: string
) => {
  try {
    const newMessage = await Message.create({
      courseId,
      senderId,
      senderName,
      message,
    });

    return newMessage;
  } catch (error) {
    console.error(error);
    throw error;
  }
};