"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveOpportunity = exports.deleteOpportunity = exports.getAllOpportunities = exports.createOpportunity = void 0;
const Opportunity_1 = __importDefault(require("../models/Opportunity"));
const createOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity_1.default.create({
            ...req.body,
            createdBy: req.user?.userId,
        });
        res.status(201).json({
            success: true,
            message: "Opportunity created successfully",
            data: opportunity,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create opportunity",
        });
    }
};
exports.createOpportunity = createOpportunity;
const getAllOpportunities = async (req, res) => {
    try {
        const opportunities = await Opportunity_1.default.find()
            .sort({ createdAt: -1 })
            .populate("createdBy", "name email");
        res.status(200).json({
            success: true,
            data: opportunities,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch opportunities",
        });
    }
};
exports.getAllOpportunities = getAllOpportunities;
const deleteOpportunity = async (req, res) => {
    try {
        const deletedOpportunity = await Opportunity_1.default.findByIdAndDelete(req.params.id);
        if (!deletedOpportunity) {
            res.status(404).json({
                success: false,
                message: "Opportunity not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Opportunity deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete opportunity",
        });
    }
};
exports.deleteOpportunity = deleteOpportunity;
const saveOpportunity = async (req, res) => {
    try {
        const opportunity = await Opportunity_1.default.findById(req.params.id);
        if (!opportunity) {
            res.status(404).json({
                success: false,
                message: "Opportunity not found",
            });
            return;
        }
        const userId = req.user?.userId;
        const alreadySaved = opportunity.savedBy.some((id) => id.toString() === userId);
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized user",
            });
            return;
        }
        if (!alreadySaved) {
            opportunity.savedBy.push(userId);
            await opportunity.save();
        }
        res.status(200).json({
            success: true,
            message: "Opportunity saved successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to save opportunity",
        });
    }
};
exports.saveOpportunity = saveOpportunity;
//# sourceMappingURL=opportunity.controller.js.map