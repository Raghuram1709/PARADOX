import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Conversation, ConversationState, Message } from "./chatTypes";

const initialState: ConversationState = {
  conversations: {},
  activeConversationId: null,
  isLoading: false,
  error: null
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,

  reducers: {
    setConversations(
      state,
      action: PayloadAction<Record<string, Conversation>>
    ) {
      state.conversations = action.payload;
    },

    setActiveConversation(
      state,
      action: PayloadAction<string | null>
    ) {
      state.activeConversationId = action.payload;
    },

    addUserMessage(
      state,
      action: PayloadAction<{
        conversationId: string;
        message: Message;
      }>
    ) {
      const { conversationId, message } = action.payload;

      if (!state.conversations[conversationId]) {
        state.conversations[conversationId] = {
          title: "New Conversation",
          messages: [],
        };
      }

      state.conversations[conversationId].messages.push(message);
    },
    clearActiveConversationId(state) {
      state.activeConversationId = null
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
});

export const {
  setConversations,
  setActiveConversation,
  addUserMessage,
  clearActiveConversationId,
  setIsLoading,
  setError
} = conversationSlice.actions;

export default conversationSlice.reducer;
;
