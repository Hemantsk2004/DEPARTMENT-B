import mongoose, { Schema, Document } from "mongoose";

export interface IMaterial extends Document {
  title: string;
  fileUrl: string;
  courseId: Schema.Types.ObjectId;
  uploadedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const materialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true, trim: true },
    fileUrl: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Material = mongoose.model<IMaterial>("Material", materialSchema);