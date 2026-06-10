"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const submission_controller_1 = require("../controllers/submission.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const uploadMiddleware_1 = __importDefault(require("../middlewares/uploadMiddleware"));
const router = express_1.default.Router();
router.post("/:assignmentId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["student"]), uploadMiddleware_1.default.single("file"), submission_controller_1.submitAssignment);
router.get("/student/:assignmentId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["student"]), submission_controller_1.getStudentSubmission);
router.get("/:assignmentId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([
    "admin",
    "lecturer",
]), submission_controller_1.getAssignmentSubmissions);
router.put("/grade/:submissionId", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)([
    "admin",
    "lecturer",
]), submission_controller_1.gradeSubmission);
exports.default = router;
//# sourceMappingURL=submission.routes.js.map