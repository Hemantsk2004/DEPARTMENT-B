"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnnouncements = exports.createAnnouncement = void 0;
const Announcement_1 = require("../models/Announcement");
const createAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement_1.Announcement.create({
            ...req.body,
            createdBy: req.user?.userId,
        });
        res.status(201).json({
            success: true,
            data: announcement,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create announcement",
        });
    }
};
exports.createAnnouncement = createAnnouncement;
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement_1.Announcement.find({
            courseId: req.params.courseId,
        }).sort({
            createdAt: -1,
        });
        res.status(200).json({
            success: true,
            data: announcements,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch announcements",
        });
    }
};
exports.getAnnouncements = getAnnouncements;
//# sourceMappingURL=announcement.controller.js.map