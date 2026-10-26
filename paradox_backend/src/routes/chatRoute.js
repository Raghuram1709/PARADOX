import { Router } from "express";
import { chatService } from "../service/chatService.js";
const router = Router();

router.post("/chat", async (req, res) => {
  try {
    const { conversationID, message } = req.body;

    if (!conversationID || !message) {
      return res.status(400).json({
        success: false,
        message: "conversationId and message are required.",
      });
    }

    const conversations = await chatService(conversationID, message);

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again.",
    });
  }
});

export default router;