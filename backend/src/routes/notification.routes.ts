import express from "express";

import {getMyNotifications,markAsRead} from "../controllers/notification.controller";

import {authenticate} from "../middlewares/auth.middleware";


const router =
  express.Router();

router.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "Notification route works",
  });
});  

router.get(
  "/",
  authenticate,
  getMyNotifications
);

router.put(
  "/:id",
  authenticate,
  markAsRead
);

export default router;