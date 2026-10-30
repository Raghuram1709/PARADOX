import type { SendMessageResponse, ConversationHistoryResponse, Conversation } from "./chatTypes";


const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const getErrorMessage = async (
  response: Response,
): Promise<string> => {
  const errorBody = await response.text();

  if (!errorBody) {
    return `Request failed: ${response.status} ${response.statusText}`;
  }

  try {
    const parsed = JSON.parse(errorBody);

    return (
      parsed.message ??
      parsed.detail ??
      `Request failed: ${response.status} ${response.statusText}`
    );
  } catch {
    return errorBody;
  }
};

// Send a message to a conversation.
export const sendMessageAPI = async (
  sessionId: string,
  conversationId: string,
  message: string,
): Promise<SendMessageResponse["data"]> => {
  const response = await fetch(`${API_BASE_URL}/conversation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sessionId,
      conversationId,
      message,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Chat API failed: ${response.status} - ${errorBody}`);
  }

  const result: SendMessageResponse = await response.json();

  if (!result.success) {
    throw new Error("Failed to send message.");
  }

  return result.data;
};



// Get all conversations belonging to a session.
export const getConversationsAPI = async (
  sessionId: string,
): Promise<Record<string, Conversation>> => {
  const response = await fetch(
    `${API_BASE_URL}/conversations/${encodeURIComponent(sessionId)}`,
    {
      method: "GET",
    },
  );
  
  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result: ConversationHistoryResponse =
    await response.json();

  if (!result.success) {
    throw new Error("Failed to load conversations.");
  }
  console.log(">>> result from serve:", result.data);
  
  return result.data;
};

// Get one conversation and its messages.
export const getConversationAPI = async (
  sessionId: string,
  conversationId: string,
) => {
  const response = await fetch(
    `${API_BASE_URL}/conversation/${encodeURIComponent(sessionId)}/${encodeURIComponent(conversationId)}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Failed to load conversation.");
  }

  return result.data;
};
