"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
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
}, { _id: false });
const UserSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=User.js.map