"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("../controllers/lecture.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "lecturer"]), lecture_controller_1.createLecture);
router.get("/:courseId", auth_middleware_1.authenticate, lecture_controller_1.getLectures);
exports.default = router;
//# sourceMappingURL=lecture.routes.js.map