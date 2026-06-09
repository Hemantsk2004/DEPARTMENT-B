import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import materialRoutes from "./routes/material.routes";
import opportunityRoutes from "./routes/opportunity.routes";
import portfolioRoutes from "./routes/portfolio.routes";
import path from "path";
import aiRoutes from "./routes/ai.routes";
import announcementRoutes from "./routes/announcement.routes";
import lectureRoutes from "./routes/lecture.routes";
import assignmentRoutes from "./routes/assignment.routes";
import submissionRoutes from "./routes/submission.routes";
import notificationRoutes from "./routes/notification.routes";


dotenv.config();
const app = express();

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to CampusLink X Backend API",
    version: "1.0.0",
    status: "running",
  });
});

// CORS
const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  process.env.FRONTEND_URL || "https://campuslink-x.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((allowed) =>
        allowed instanceof RegExp ? allowed.test(origin) : allowed === origin
      );
      if (isAllowed) return callback(null, true);
      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads",express.static(path.join(__dirname, "../uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/materials", materialRoutes);
app.use("/api/opportunities", opportunityRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/announcements",announcementRoutes);
app.use("/api/lectures",lectureRoutes);
app.use("/api/assignments",assignmentRoutes);
app.use("/api/submissions",submissionRoutes);
app.use("/api/notifications",notificationRoutes);


// 404 handler
app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Global error:", err);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

// Database connection
// Database connection and server startup
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

export default app;