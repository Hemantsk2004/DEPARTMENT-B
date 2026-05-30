"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeNotes = void 0;
const groq_sdk_1 = __importDefault(require("groq-sdk"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const summarizeNotes = async (req, res) => {
    try {
        const groq = new groq_sdk_1.default({
            apiKey: process.env.GROQ_API_KEY || "",
        });
        let text = req.body.text || "";
        // PDF uploaded
        if (req.file) {
            const pdfData = await (0, pdf_parse_1.default)(req.file.buffer);
            text = pdfData.text;
        }
        if (!text.trim()) {
            res.status(400).json({
                success: false,
                message: "Please provide notes text or upload a PDF",
            });
            return;
        }
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `
You are an expert university professor.

Analyze these study notes.

Return EXACTLY:

SUMMARY:
Provide a detailed explanation of the topic in 3-5 paragraphs.

KEY POINTS:
At least 8 important bullet points.

REVISION NOTES:
At least 8 quick revision bullets.

POSSIBLE EXAM QUESTIONS:
1.
2.
3.
4.
5.

NOTES:

${text}
`,
                },
            ],
        });
        const result = completion.choices?.[0]?.message
            ?.content || "No response generated";
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.error("AI ERROR:", error);
        res.status(500).json({
            success: false,
            message: error?.message ||
                "AI processing failed",
        });
    }
};
exports.summarizeNotes = summarizeNotes;
//# sourceMappingURL=ai.controller.js.map