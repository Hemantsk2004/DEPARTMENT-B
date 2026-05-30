"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const opportunity_controller_1 = require("../controllers/opportunity.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.authenticate, opportunity_controller_1.getAllOpportunities);
router.post("/", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "lecturer"]), opportunity_controller_1.createOpportunity);
router.delete("/:id", auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)(["admin", "lecturer"]), opportunity_controller_1.deleteOpportunity);
router.post("/save/:id", auth_middleware_1.authenticate, opportunity_controller_1.saveOpportunity);
exports.default = router;
//# sourceMappingURL=opportunity.routes.js.map