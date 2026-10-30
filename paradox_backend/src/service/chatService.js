import memory from "../memory/conversation.js";
import { llm, titleGenerateLLm } from "../ai/llm.js";

export const chatService = async (
  sessionId,
  conversationId,
  message
) => {
  try {

    memory.createSession(sessionId);

    memory.createConversation(sessionId, conversationId);

    memory.addMessage(
      sessionId,
      conversationId,
      "user",
      message
    );

    const messages = memory.getMessages(
      sessionId,
      conversationId
    );

    const conversation = memory.getConversation(
      sessionId,
      conversationId
    );

    if (
      messages.length >= 5 &&
      conversation.title === "New Conversation"
    ) {
      try {
        const title = await titleGenerateLLm(messages);

        memory.updateTitle(
          sessionId,
          conversationId,
          title
        );
      } catch (error) {
        console.error("Title generation failed:", error);
      }
    }

    const response = await llm(messages);

    memory.addMessage(
      sessionId,
      conversationId,
      "assistant",
      response
    );
    
    return {
      sessionId,
      conversationId,
      conversations: memory.getAllConversations(sessionId),
    };
  } catch (error) {
    throw error;
  }
};
;
