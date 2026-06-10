"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_controller_1 = require("../controllers/notification.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/test", (_req, res) => {
    res.json({
        success: true,
        message: "Notification route works",
    });
});
router.get("/", auth_middleware_1.authenticate, notification_controller_1.getMyNotifications);
router.put("/:id", auth_middleware_1.authenticate, notification_controller_1.markAsRead);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map