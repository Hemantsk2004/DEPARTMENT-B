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
dotenv_1.default.config();
const app = (0, express_1.default)();
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
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map