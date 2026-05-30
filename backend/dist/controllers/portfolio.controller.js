"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicPortfolio = exports.updatePortfolio = exports.getMyPortfolio = void 0;
const User_1 = require("../models/User");
const getMyPortfolio = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user?.userId).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch portfolio",
        });
    }
};
exports.getMyPortfolio = getMyPortfolio;
const updatePortfolio = async (req, res) => {
    try {
        const updateData = {
            ...req.body,
        };
        // Convert FormData strings back to arrays
        if (req.body.skills) {
            updateData.skills = JSON.parse(req.body.skills);
        }
        if (req.body.projects) {
            updateData.projects = JSON.parse(req.body.projects);
        }
        if (req.file) {
            updateData.avatar =
                `http://localhost:5000/uploads/avatars/${req.file.filename}`;
        }
        const updatedUser = await User_1.User.findByIdAndUpdate(req.user?.userId, updateData, {
            new: true,
            runValidators: true,
        }).select("-password");
        res.status(200).json({
            success: true,
            message: "Portfolio updated successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to update portfolio",
        });
    }
};
exports.updatePortfolio = updatePortfolio;
const getPublicPortfolio = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select("-password");
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch public portfolio",
        });
    }
};
exports.getPublicPortfolio = getPublicPortfolio;
//# sourceMappingURL=portfolio.controller.js.map