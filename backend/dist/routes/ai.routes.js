"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ai_controller_1 = require("../controllers/ai.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const aiUpload_middleware_1 = require("../middlewares/aiUpload.middleware");
const router = express_1.default.Router();
router.post("/summarize", auth_middleware_1.authenticate, aiUpload_middleware_1.aiUpload.single("pdf"), ai_controller_1.summarizeNotes);
exports.default = router;
//# sourceMappingURL=ai.routes.js.map