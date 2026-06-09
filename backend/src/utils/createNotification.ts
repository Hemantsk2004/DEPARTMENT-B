import { Notification }
from "../models/Notification";

export const createNotification =
  async (
    userId: string,
    title: string,
    message: string,
    type: string
  ) => {

    await Notification.create({
      userId,
      title,
      message,
      type,
    });

};