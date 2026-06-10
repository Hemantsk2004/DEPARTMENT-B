"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getMyNotifications = void 0;
const Notification_1 = require("../models/Notification");
const responseHandler_1 = require("../utils/responseHandler");
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.Notification.find({
            userId: req.user?.userId,
        }).sort({
            createdAt: -1,
        });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Notifications fetched", notifications);
    }
    catch (error) {
        console.error(error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to fetch notifications", null);
    }
};
exports.getMyNotifications = getMyNotifications;
const markAsRead = async (req, res) => {
    try {
        await Notification_1.Notification.findByIdAndUpdate(req.params.id, {
            isRead: true,
        });
        (0, responseHandler_1.sendResponse)(res, 200, true, "Notification marked as read", null);
    }
    catch (error) {
        console.error(error);
        (0, responseHandler_1.sendResponse)(res, 500, false, "Failed to update notification", null);
    }
};
exports.markAsRead = markAsRead;
//# sourceMappingURL=notification.controller.js.map