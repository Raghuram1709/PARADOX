const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is missing");
}

export const sendMessageAPI = async (
  conversationid: string,
  message: string,
) => {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversationID: conversationid,
      message,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Chat API failed: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  return data.data;
};
