import { Request, Response } from "express";
import Groq from "groq-sdk";
import pdfParse from "pdf-parse";

export const summarizeNotes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY || "",
    });

    let text = req.body.text || "";

    // PDF uploaded
    if (req.file) {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    }

    if (!text.trim()) {
      res.status(400).json({
        success: false,
        message:
          "Please provide notes text or upload a PDF",
      });
      return;
    }

    const completion =
      await groq.chat.completions.create({
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

    const result =
      completion.choices?.[0]?.message
        ?.content || "No response generated";

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error(
      "AI ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "AI processing failed",
    });
  }
};