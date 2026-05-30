"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolio_controller_1 = require("../controllers/portfolio.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const avatarUpload_middleware_1 = require("../middlewares/avatarUpload.middleware");
const router = express_1.default.Router();
router.get("/me", auth_middleware_1.authenticate, portfolio_controller_1.getMyPortfolio);
router.put("/me", auth_middleware_1.authenticate, avatarUpload_middleware_1.avatarUpload.single("avatar"), portfolio_controller_1.updatePortfolio);
router.get("/:id", portfolio_controller_1.getPublicPortfolio);
exports.default = router;
//# sourceMappingURL=portfolio.routes.js.map