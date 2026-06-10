"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const material_routes_1 = __importDefault(require("./routes/material.routes"));
const opportunity_routes_1 = __importDefault(require("./routes/opportunity.routes"));
const portfolio_routes_1 = __importDefault(require("./routes/portfolio.routes"));
const path_1 = __importDefault(require("path"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const announcement_routes_1 = __importDefault(require("./routes/announcement.routes"));
const lecture_routes_1 = __importDefault(require("./routes/lecture.routes"));
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const submission_routes_1 = __importDefault(require("./routes/submission.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const studyRoom_routes_1 = __importDefault(require("./routes/studyRoom.routes"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const studyRoom_controller_1 = require("./controllers/studyRoom.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
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
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin)
            return callback(null, true);
        const isAllowed = allowedOrigins.some((allowed) => allowed instanceof RegExp ? allowed.test(origin) : allowed === origin);
        if (isAllowed)
            return callback(null, true);
        return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/courses", course_routes_1.default);
app.use("/api/materials", material_routes_1.default);
app.use("/api/opportunities", opportunity_routes_1.default);
app.use("/api/portfolio", portfolio_routes_1.default);
app.use("/api/ai", ai_routes_1.default);
app.use("/api/announcements", announcement_routes_1.default);
app.use("/api/lectures", lecture_routes_1.default);
app.use("/api/assignments", assignment_routes_1.default);
app.use("/api/submissions", submission_routes_1.default);
app.use("/api/notifications", notification_routes_1.default);
app.use("/api/study-rooms", studyRoom_routes_1.default);
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});
// Global error handler
app.use((err, _req, res, _next) => {
    console.error("Global error:", err);
    res.status(500).json({ success: false, message: err.message || "Internal server error" });
});
// Database connection
// Database connection and server startup
const PORT = process.env.PORT || 5000;
io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);
    socket.on("join-room", (courseId) => {
        socket.join(courseId);
        console.log(`Joined room ${courseId}`);
    });
    socket.on("send-message", async (data) => {
        const { courseId, senderId, senderName, message, } = data;
        await (0, studyRoom_controller_1.saveMessage)(courseId, senderId, senderName, message);
        io.to(courseId).emit("receive-message", {
            senderId,
            senderName,
            message,
            createdAt: new Date(),
        });
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => {
    console.log("✅ Connected to MongoDB");
    server.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=app.js.map