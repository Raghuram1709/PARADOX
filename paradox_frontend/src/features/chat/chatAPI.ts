const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const sendMessageAPI = async (
  conversationid: string,
  message: string,
) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      conversationID: conversationid,
      message: message,
    }),
  });
  const data = await response.json();
  return data.data;
};
