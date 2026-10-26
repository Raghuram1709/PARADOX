import memory from "../memory/conversation.js";
import { llm, titleGenerateLLm } from "../ai/llm.js";

export const chatService = async (conversationId, message) => {
  try {
    memory.addMessage(conversationId, "user", message);

const messages = memory.getMessages(conversationId);
const conversation = memory.getConversation(conversationId);
console.log("conversation:", messages);
console.log("conversation:", messages.length);
console.log("conversation:", conversation.title);


if (messages.length >= 5 && conversation.title === "New Conversation") {
  try {
    const title = await titleGenerateLLm(messages);
    memory.updateTitle(conversationId, title);
  } catch (error) {
    console.error("Title generation failed:", error);
  }
}

// Generate AI response
const response = await llm(messages);

memory.addMessage(conversationId, "assistant", response);

return memory.getAllConversations();
;
  } catch (error) {
    console.error("Chat service error:", error);

throw error;
;
  }
};
