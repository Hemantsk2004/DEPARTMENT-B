import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  assignmentId: Schema.Types.ObjectId;

  studentId: Schema.Types.ObjectId;

  fileUrl: string;

  marks?: number;

  feedback?: string;

  submittedAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

const submissionSchema =
  new Schema<ISubmission>(
    {
      assignmentId: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
      },

      studentId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      fileUrl: {
        type: String,
        required: true,
      },

      marks: {
        type: Number,
        default: null,
      },

      feedback: {
        type: String,
        default: "",
      },

      submittedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export const Submission =
  mongoose.model<ISubmission>(
    "Submission",
    submissionSchema
  );