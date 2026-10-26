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
  isLoading: boolean
  error: null | string
}
