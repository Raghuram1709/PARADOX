
class ChatMemory {
  constructor() {
    // sessionId -> { conversations: Map }
    this.sessions = new Map();
  }

  // Create a session if it doesn't exist.
  createSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        conversations: new Map(),
      });
    }

    return this.sessions.get(sessionId);
  }

  // Create a conversation inside a session.
  createConversation(sessionId, conversationId) {
    const session = this.createSession(sessionId);

    if (!session.conversations.has(conversationId)) {
      session.conversations.set(conversationId, {
        title: "New Conversation",
        messages: [],
      });
    }

    return session.conversations.get(conversationId);
  }

  // Add a message to a specific conversation.
  addMessage(sessionId, conversationId, role, content) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      throw new Error("Session not found");
    }

    const conversation = session.conversations.get(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    conversation.messages.push({
      role,
      content,
    });
  }

  // Get messages from a specific conversation.
  getMessages(sessionId, conversationId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return [];
    }

    return (
      session.conversations.get(conversationId)?.messages || []
    );
  }

  // Get one conversation.
  getConversation(sessionId, conversationId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return null;
    }

    return session.conversations.get(conversationId) || null;
  }

  // Get all conversations belonging to one session.
  getAllConversations(sessionId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return {};
    }

    return Object.fromEntries(session.conversations);
  }

  // Update a conversation title.
  updateTitle(sessionId, conversationId, newTitle) {
    const conversation = this.getConversation(
      sessionId,
      conversationId
    );

    if (conversation) {
      conversation.title = newTitle;
    }
  }
}

const memory = new ChatMemory();

export default memory;
;
