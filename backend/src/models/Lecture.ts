import mongoose, {
  Schema,
  model,
} from "mongoose";

const LectureSchema =
  new Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      url: {
        type: String,
        required: true,
      },

      courseId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

export interface ILecture
  extends mongoose.Document {
  title: string;
  description: string;
  url: string;
  courseId: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export default model<ILecture>(
  "Lecture",
  LectureSchema
);