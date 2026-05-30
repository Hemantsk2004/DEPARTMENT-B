import mongoose, { Schema, Document } from "mongoose";

export interface IOpportunity extends Document {
  title: string;
  company: string;
  type: "internship" | "hackathon" | "placement";
  description: string;
  link: string;
  deadline: Date;
  createdBy: mongoose.Types.ObjectId;
  savedBy: mongoose.Types.ObjectId[];
}

const OpportunitySchema = new Schema<IOpportunity>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["internship", "hackathon", "placement"],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    deadline: {
      type: Date,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    savedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOpportunity>(
  "Opportunity",
  OpportunitySchema
);