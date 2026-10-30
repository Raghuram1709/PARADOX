class ChatMemory {
  constructor() {
    this.sessions = new Map();

    this.SESSION_TTL = 24 * 60 * 60 * 1000;

    this.sessionTimers = new Map();
  }

  isExpired(session) {
    return Date.now() >= session.expiresAt;
  }

  createSession(sessionId) {
    const existingSession = this.getSession(sessionId);

    if (existingSession) {
      return existingSession;
    }

    const now = Date.now();

    const session = {
      createdAt: now,
      expiresAt: now + this.SESSION_TTL,
      conversations: new Map(),
    };

    this.sessions.set(sessionId, session);

    const timer = setTimeout(() => {
      this.clearSession(sessionId);
    }, this.SESSION_TTL);

    timer.unref();

    this.sessionTimers.set(sessionId, timer);

    return session;
  }

  getSession(sessionId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return null;
    }

    if (this.isExpired(session)) {
      this.clearSession(sessionId);
      return null;
    }

    return session;
  }

  clearSession(sessionId) {
    const timer = this.sessionTimers.get(sessionId);

    if (timer) {
      clearTimeout(timer);
      this.sessionTimers.delete(sessionId);
    }

    this.sessions.delete(sessionId);
  }

  createConversation(sessionId, conversationId) {
    const session =
      this.getSession(sessionId) || this.createSession(sessionId);

    if (!session.conversations.has(conversationId)) {
      session.conversations.set(conversationId, {
        title: "New Conversation",
        messages: [],
      });
    }

    return session.conversations.get(conversationId);
  }

  addMessage(sessionId, conversationId, role, content) {
    const session = this.getSession(sessionId);

    if (!session) {
      throw new Error("Session not found or expired");
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

  getMessages(sessionId, conversationId) {
    const session = this.getSession(sessionId);

    if (!session) {
      return [];
    }

    return (
      session.conversations.get(conversationId)?.messages || []
    );
  }

  getAllConversations(sessionId) {
    const session = this.getSession(sessionId);

    if (!session) {
      return {};
    }

    return Object.fromEntries(session.conversations);
  }

  getConversation(sessionId, conversationId) {
    const session = this.getSession(sessionId);

    if (!session) {
      return null;
    }

    return session.conversations.get(conversationId) || null;
  }

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

