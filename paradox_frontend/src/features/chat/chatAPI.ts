export const sendMessageAPI = async (conversationid: string, message: string,) => {
    const response = await fetch("http://localhost:5000/chat", {
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
    return data.data
}