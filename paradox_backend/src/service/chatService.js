
import memory from "../memory/conversation.js";
import { llm, titleGenerateLLm } from "../ai/llm.js";

export const chatService = async (
  sessionId,
  conversationId,
  message
) => {
  try {
    // 1. Ensure the session exists.
    memory.createSession(sessionId);

    // 2. Ensure the conversation exists in this session.
    memory.createConversation(sessionId, conversationId);

    // 3. Store the user's message.
    memory.addMessage(
      sessionId,
      conversationId,
      "user",
      message
    );

    // 4. Retrieve this conversation's messages.
    const messages = memory.getMessages(
      sessionId,
      conversationId
    );

    const conversation = memory.getConversation(
      sessionId,
      conversationId
    );

    console.log("Messages:", messages);
    console.log("Message count:", messages.length);
    console.log("Title:", conversation.title);

    // 5. Generate a title after enough messages.
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

    // 6. Generate the AI response.
    const response = await llm(messages);

    // 7. Store the assistant's response.
    memory.addMessage(
      sessionId,
      conversationId,
      "assistant",
      response
    );

    // 8. Return only this session's conversations.
    
    return {
      sessionId,
      conversationId,
      conversations: memory.getAllConversations(sessionId),
    };
  } catch (error) {
    console.error("Chat service error:", error);
    throw error;
  }
};
;
