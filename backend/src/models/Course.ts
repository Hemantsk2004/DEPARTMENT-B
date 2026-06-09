import mongoose, { Schema, Document } from "mongoose";

export interface ICourse extends Document {
  title: string;
  courseCode: string;
  description: string;

  lecturer: Schema.Types.ObjectId;

  students: Schema.Types.ObjectId[];

  materials: Schema.Types.ObjectId[];

  lectures: Schema.Types.ObjectId[];

  announcements: Schema.Types.ObjectId[];

  assignments: Schema.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },
    courseCode: { type: String, required: true, unique: true, trim: true, uppercase: true },
    description: { type: String, required: true, trim: true },
    lecturer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    students: [{ type: Schema.Types.ObjectId, ref: "User" }],
    materials: [{ type: Schema.Types.ObjectId, ref: "Material" }],
    lectures: [{type: Schema.Types.ObjectId,ref: "Lecture"}],
    announcements: [{type: Schema.Types.ObjectId,ref: "Announcement"}],
    assignments: [{type: Schema.Types.ObjectId,ref: "Assignment"}],
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);