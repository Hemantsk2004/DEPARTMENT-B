"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Course_1 = require("../models/Course");
dotenv_1.default.config();
const assignStudentsToCourses = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        // Fetch all students and courses
        const students = await User_1.User.find({ role: "student" });
        const courses = await Course_1.Course.find();
        if (students.length === 0 || courses.length === 0) {
            console.log("No students or courses found. Exiting...");
            return;
        }
        console.log("Assigning students to courses...");
        // Assign each student to a random selection of courses
        for (const student of students) {
            const randomCourses = [];
            const numberOfCourses = Math.floor(Math.random() * (courses.length / 2)) + 1; // Assign 1 to half of the courses
            while (randomCourses.length < numberOfCourses) {
                const randomIndex = Math.floor(Math.random() * courses.length);
                const courseId = courses[randomIndex]._id;
                if (!randomCourses.includes(courseId)) {
                    randomCourses.push(courseId);
                }
            }
            // Update the Course model
            await Course_1.Course.updateMany({ _id: { $in: randomCourses } }, { $addToSet: { students: student._id } });
            console.log(`Assigned ${student.name} to courses: ${randomCourses}`);
        }
        console.log("All students assigned to courses successfully.");
    }
    catch (error) {
        console.error("Error assigning students to courses:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log("Disconnected from MongoDB");
    }
};
assignStudentsToCourses();
//# sourceMappingURL=assignStudentsToCourses.js.map