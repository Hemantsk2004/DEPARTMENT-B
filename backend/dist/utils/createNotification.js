"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNotification = void 0;
const Notification_1 = require("../models/Notification");
const createNotification = async (userId, title, message, type) => {
    await Notification_1.Notification.create({
        userId,
        title,
        message,
        type,
    });
};
exports.createNotification = createNotification;
//# sourceMappingURL=createNotification.js.map