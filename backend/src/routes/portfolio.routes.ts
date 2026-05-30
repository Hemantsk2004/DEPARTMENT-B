import express from "express";

import {
  getMyPortfolio,
  updatePortfolio,
  getPublicPortfolio,
} from "../controllers/portfolio.controller";

import {
  authenticate,
} from "../middlewares/auth.middleware";

import { avatarUpload } from "../middlewares/avatarUpload.middleware";

const router = express.Router();

router.get(
  "/me",
  authenticate,
  getMyPortfolio
);

router.put(
  "/me",
  authenticate,
  avatarUpload.single("avatar"),
  updatePortfolio
);

router.get(
  "/:id",
  getPublicPortfolio
);

export default router;