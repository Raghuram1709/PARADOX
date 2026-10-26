class ChatMemory {
  constructor() {
    this.conversations = new Map();
  }

  addMessage(conversationId, role, content) {
    if (!this.conversations.has(conversationId)) {
      this.conversations.set(conversationId, {
        title: "New Conversation",
        messages: [],
      });
    }

    const conversation = this.conversations.get(conversationId);

    conversation.messages.push({
      role,
      content,
    });
  }

  getMessages(conversationId) {
    return this.conversations.get(conversationId)?.messages || [];
  }

  getConversation(conversationId) {
    return this.conversations.get(conversationId) || null;
  }

  getAllConversations() {
    return Object.fromEntries(this.conversations);
  }

  updateTitle(conversationId, newTitle) {
    const conversation = this.conversations.get(conversationId);

    if (conversation) {
      conversation.title = newTitle;
    }
  }
}

const memory = new ChatMemory();

export default memory;
