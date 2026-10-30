import { Router } from "express";

import { chatService } from "../service/chatService.js";
import memory from "../memory/conversation.js";

const router = Router();

// Send a message to a conversation.
router.post("/conversation", async (req, res) => {
  try {
    const { sessionId, conversationId, message } = req.body;

    if (
      !sessionId ||
      !conversationId ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "sessionId, conversationId, and a valid message are required.",
      });
    }

    const conversation = await chatService(
      sessionId,
      conversationId,
      message
    );
    console.log(conversation);
    
    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again.",
    });
  }
});

// Get all conversations belonging to a session.
router.get("/conversations/:sessionId", (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "sessionId is required.",
      });
    }

    const conversations = memory.getAllConversations(sessionId);

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error("Chat history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load conversations. Please try again.",
    });
  }
});

// Get one conversation and its messages.
router.get(
  "/conversation/:sessionId/:conversationId",
  (req, res) => {
    try {
      const { sessionId, conversationId } = req.params;

      const conversation = memory.getConversation(
        sessionId,
        conversationId
      );

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          sessionId,
          conversationId,
          conversation,
        },
      });
    } catch (error) {
      console.error("Chat history error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to load conversation. Please try again.",
      });
    }
  }
);

export default router;
;
