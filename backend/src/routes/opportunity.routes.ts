import express from "express";

import {
  createOpportunity,
  getAllOpportunities,
  deleteOpportunity,
  saveOpportunity,
} from "../controllers/opportunity.controller";

import {
  authenticate,
  authorize,
} from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
  "/",
  authenticate,
  getAllOpportunities
);

router.post(
  "/",
  authenticate,
  authorize(["admin", "lecturer"]),
  createOpportunity
);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin", "lecturer"]),
  deleteOpportunity
);

router.post(
  "/save/:id",
  authenticate,
  saveOpportunity
);

export default router;