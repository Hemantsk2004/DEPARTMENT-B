"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./auth");
dotenv_1.default.config();
const createAdminUser = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        const hashedPassword = await (0, auth_1.hashPassword)("password");
        const adminUser = new User_1.User({
            name: "Admin",
            email: "admin@campusconnect.com",
            password: hashedPassword,
            role: "admin",
        });
        await adminUser.save();
        console.log("Admin user created successfully");
    }
    catch (error) {
        console.error("Error creating admin user:", error);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
};
createAdminUser();
//# sourceMappingURL=createAdmin.js.map