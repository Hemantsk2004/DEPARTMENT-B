"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = require("../models/User");
const Course_1 = require("../models/Course");
const Material_1 = require("../models/Material");
dotenv_1.default.config();
const clearDatabase = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
        console.log("Clearing Users...");
        await User_1.User.deleteMany({});
        console.log("All users cleared.");
        console.log("Clearing Courses...");
        await Course_1.Course.deleteMany({});
        console.log("All courses cleared.");
        console.log("Clearing Materials...");
        await Material_1.Material.deleteMany({});
        console.log("All materials cleared.");
        console.log("Database cleared successfully.");
    }
    catch (error) {
        console.error("Error clearing database:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
        console.log("Disconnected from MongoDB");
    }
};
clearDatabase();
//# sourceMappingURL=clearDatabase.js.map