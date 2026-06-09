import mongoose, { Schema, Document } from "mongoose";

export interface IAssignment extends Document {
  title: string;
  description: string;
  courseId: Schema.Types.ObjectId;
  createdBy: Schema.Types.ObjectId;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
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

    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Assignment =
  mongoose.model<IAssignment>(
    "Assignment",
    assignmentSchema
  );