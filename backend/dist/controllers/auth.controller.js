"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const User_1 = require("../models/User");
const auth_1 = require("../utils/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responseHandler_1 = require("../utils/responseHandler");
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Name, email and password are required", null);
            return;
        }
        // Prevent registering as admin via API
        const safeRole = role === "admin" ? "student" : role || "student";
        const existingUser = await User_1.User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "An account with this email already exists", null);
            return;
        }
        const hashedPassword = await (0, auth_1.hashPassword)(password);
        const newUser = new User_1.User({ name, email: email.toLowerCase(), password: hashedPassword, role: safeRole });
        await newUser.save();
        (0, responseHandler_1.sendResponse)(res, 201, true, "Account created successfully. Please login.", null);
    }
    catch (error) {
        console.error("Register error:", error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Registration failed", null);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Email and password are required", null);
            return;
        }
        // Fix: explicitly select password since it's select:false in schema
        const user = await User_1.User.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) {
            (0, responseHandler_1.sendResponse)(res, 401, false, "Invalid email or password", null);
            return;
        }
        const isMatch = await (0, auth_1.comparePassword)(password, user.password);
        if (!isMatch) {
            (0, responseHandler_1.sendResponse)(res, 401, false, "Invalid email or password", null);
            return;
        }
        const userObject = user.toObject();
        delete userObject.password;
        const token = (0, auth_1.generateToken)(userObject);
        (0, responseHandler_1.sendResponse)(res, 200, true, "Login successful", { user: userObject, token });
    }
    catch (error) {
        console.error("Login error:", error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Login failed", null);
    }
};
exports.loginUser = loginUser;
const verifyToken = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        (0, responseHandler_1.sendResponse)(res, 401, false, "No token provided", null);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_1.User.findById(decoded.userId).select("-password");
        if (!user) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "User not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Token valid", user);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 401, false, "Invalid or expired token", null);
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.controller.js.map