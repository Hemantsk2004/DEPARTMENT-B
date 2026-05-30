"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.getAllUsers = void 0;
const User_1 = require("../models/User");
const responseHandler_1 = require("../utils/responseHandler");
const getAllUsers = async (_req, res) => {
    try {
        const users = await User_1.User.find().select("-password").sort({ createdAt: -1 });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Users fetched successfully", users);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch users", null);
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select("-password");
        if (!user) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "User not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "User fetched successfully", user);
    }
    catch {
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch user", null);
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    const { id } = req.params;
    const requestingUserId = req.user?.userId;
    const requestingUserRole = req.user?.role;
    // Only allow self-update or admin
    if (requestingUserRole !== "admin" && requestingUserId !== id) {
        (0, responseHandler_1.sendResponse)(res, 403, false, "You can only update your own profile", null);
        return;
    }
    try {
        const { name, email } = req.body;
        // Only admin can change roles
        const updateData = { name, email };
        if (requestingUserRole === "admin" && req.body.role) {
            updateData.role = req.body.role;
        }
        const updatedUser = await User_1.User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
        if (!updatedUser) {
            (0, responseHandler_1.sendResponse)(res, 404, false, "User not found", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 200, true, "Profile updated successfully", updatedUser);
    }
    catch (error) {
        if (error.code === 11000) {
            (0, responseHandler_1.sendResponse)(res, 400, false, "Email already in use", null);
            return;
        }
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to update user", null);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map