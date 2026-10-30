export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface Conversation {
  title: string;
  messages: Message[];
}

export interface ConversationState {
  conversations: Record<string, Conversation>;
  activeConversationId: null | string;
  sessionId: null | string;
  isLoading: boolean;
  error: null | string;
}

export interface SendMessageResponse {
  success: boolean;
  data: {
    sessionId: string;
    conversationId: string;
    conversations: Record<string, Conversation>;
  };
}

export interface ConversationHistoryResponse {
  success: boolean;
  data: Record<string, Conversation>;
}
