import type { AppDispatch, RootState } from "../../store/store";
import { sendMessageAPI } from "./chatAPI";
import {
  setActiveConversation,
  setConversations,
  addUserMessage,
  setIsLoading,
  setError,
} from "./conversationSlice";

export const sendMessage =
  (text: string) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    let conversationId = getState().conversation.activeConversationId;

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
      })
    );
    
    dispatch(setActiveConversation(conversationId));
    try {
      dispatch(setIsLoading(true));

      const data = await sendMessageAPI(conversationId, text);

      dispatch(setConversations(data));
      
      setTimeout(() => {
        dispatch(setIsLoading(false))
      }, 3000);

    } catch (error) {
      dispatch(setError(error))
    }
  };
;
