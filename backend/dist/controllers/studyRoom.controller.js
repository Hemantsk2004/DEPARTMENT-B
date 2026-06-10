"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMessage = exports.getRoomMessages = void 0;
const Message_1 = require("../models/Message");
const getRoomMessages = async (req, res) => {
    try {
        const messages = await Message_1.Message.find({
            courseId: req.params.courseId,
        }).sort({
            createdAt: 1,
        });
        res.status(200).json({
            success: true,
            data: messages,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch messages",
        });
    }
};
exports.getRoomMessages = getRoomMessages;
const saveMessage = async (courseId, senderId, senderName, message) => {
    try {
        const newMessage = await Message_1.Message.create({
            courseId,
            senderId,
            senderName,
            message,
        });
        return newMessage;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
exports.saveMessage = saveMessage;
//# sourceMappingURL=studyRoom.controller.js.map