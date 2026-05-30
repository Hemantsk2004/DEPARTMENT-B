import { Router } from "express";
import { registerUser, loginUser, verifyToken } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { sendResponse } from "../utils/responseHandler";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/verify", verifyToken);
router.post("/logout", authenticate, (_req, res) => {
  sendResponse(res, 200, true, "Logged out successfully", null);
});

export default router;