"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const announcement_controller_1 = require("../controllers/announcement.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "lecturer"]), announcement_controller_1.createAnnouncement);
router.get("/:courseId", auth_middleware_1.authenticate, announcement_controller_1.getAnnouncements);
exports.default = router;
//# sourceMappingURL=announcement.routes.js.map