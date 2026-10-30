import type { AppDispatch, RootState } from "../../store/store";

import {sendMessageAPI, getConversationsAPI} from "./chatAPI";

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

export const sendMessage = (text: string) => async (dispatch: AppDispatch, getState: () => RootState): Promise<string | undefined> => {
    let conversationId = getState().conversation.activeConversationId;

    const sessionId = getState().conversation.sessionId;

    if (!sessionId) {
      dispatch(setError("Session not initialized."));
      return undefined;
    }

    if (!conversationId) {
      conversationId = crypto.randomUUID();
    }

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

      dispatch(setConversations(data.conversations));

      return conversationId;
    } catch (error: unknown) {
      dispatch(setError(getErrorMessage(error)));

      return undefined;
    } finally {
      dispatch(setIsLoading(false));
    }
  };


export const loadConversation = (sessionId: string, conversationId: string) =>
    async (dispatch: AppDispatch) => {
      
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
    let sessionId = localStorage.getItem("sessionId");
  
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("sessionId", sessionId);
    }

    dispatch(setSessionId(sessionId));

    return sessionId;
  };
;

