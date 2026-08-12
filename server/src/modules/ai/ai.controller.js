import { generateSummary } from "../../utils/ai.js";

export const testAI = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Text is required",
            });
        }

        const summary = await generateSummary(text);

        res.status(200).json({
            success: true,
            message: "AI summary generated successfully",
            data: {
                summary,
            },
        });
    } catch (error) {
        console.error("AI Test Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Failed to generate AI summary",
        });
    }
};