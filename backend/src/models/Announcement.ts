import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  title: string;
  content: string;
  courseId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const announcementSchema =
  new Schema<IAnnouncement>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      content: {
        type: String,
        required: true,
        trim: true,
      },

      courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export const Announcement =
  mongoose.model<IAnnouncement>(
    "Announcement",
    announcementSchema
  );