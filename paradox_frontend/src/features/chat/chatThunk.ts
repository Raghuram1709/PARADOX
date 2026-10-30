import type { AppDispatch, RootState } from "../../store/store";

import {
  sendMessageAPI,
  getConversationsAPI,
} from "./chatAPI";

import {
  setActiveConversation,
  setConversations,
  addUserMessage,
  setIsLoading,
  setError,
  setSessionId,
} from "./conversationSlice";

const getErrorMessage = (error: unknown): string => {
  return error instanceof Error
    ? error.message
    : "Something went wrong.";
};

// Send a message.
export const sendMessage =
  (text: string) =>
  async (
    dispatch: AppDispatch,
    getState: () => RootState,
  ): Promise<string | undefined> => {
    let conversationId =
      getState().conversation.activeConversationId;

    const sessionId = getState().conversation.sessionId;

    // Validate the session.
    if (!sessionId) {
      dispatch(setError("Session not initialized."));
      return undefined;
    }

    // Create a conversation ID if needed.
    if (!conversationId) {
      conversationId = crypto.randomUUID();
    }

    // Add the user's message immediately.
    dispatch(
      addUserMessage({
        conversationId,
        message: {
          role: "user",
          content: text,
        },
      }),
    );

    dispatch(setActiveConversation(conversationId));

    try {
      dispatch(setIsLoading(true));
      dispatch(setError(null));

      const data = await sendMessageAPI(
        sessionId,
        conversationId,
        text,
      );

      // Replace the local conversation data with server data.
      dispatch(setConversations(data.conversations));

      return conversationId;
    } catch (error: unknown) {
      dispatch(setError(getErrorMessage(error)));

      return undefined;
    } finally {
      dispatch(setIsLoading(false));
    }
  };

// Load all conversations belonging to a session.
export const loadConversation =
  (sessionId: string, conversationId: string) =>
    async (dispatch: AppDispatch) => {
    
      console.log("inside the loadConversation");
      
    dispatch(setActiveConversation(conversationId));
    dispatch(setSessionId(sessionId));

    try {
      dispatch(setIsLoading(true));
      dispatch(setError(null));

      const data = await getConversationsAPI(sessionId);

      dispatch(setConversations(data));
    } catch (error: unknown) {
      dispatch(setError(getErrorMessage(error)));
    } finally {
      dispatch(setIsLoading(false));
    }
  };


export const initiateSessionId = () => (dispatch: AppDispatch) => {
  console.log("inside the session fn");
  
    let sessionId = sessionStorage.getItem("sessionId");
    console.log("sessionid from sessions", sessionId);
    
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem("sessionId", sessionId);
    }

    dispatch(setSessionId(sessionId));

    return sessionId;
  };
;

