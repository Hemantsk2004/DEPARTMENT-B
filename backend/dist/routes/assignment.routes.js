"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignment_controller_1 = require("../controllers/assignment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "lecturer"]), assignment_controller_1.createAssignment);
router.get("/:courseId", auth_middleware_1.authenticate, assignment_controller_1.getAssignmentsByCourse);
exports.default = router;
//# sourceMappingURL=assignment.routes.js.map