import { Schema, model, Document } from "mongoose";

interface IProject {
  title: string;
  description: string;
  link: string;
}

export interface IUser extends Document {
  name: string;
  avatar?: string;
  email: string;
  password: string;

  role: "student" | "lecturer" | "admin";

  bio?: string;

  skills?: string[];

  github?: string;

  linkedin?: string;

  resume?: string;

  projects?: IProject[];

  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 220,
      required: true,
    },

    link: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["student", "lecturer", "admin"],
      required: true,
      default: "student",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 300,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    resume: {
      type: String,
      default: "",
    },

    projects: [ProjectSchema],
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>(
  "User",
  UserSchema
);