import { groq_client } from "../config/client.js";
import { SYSTEM_PROMPT } from "./prompts.js";
export const llm = async (conversation) => {
  console.log(">>> LLM API CALLING....");
  const response = await groq_client.chat.completions.create({
    model: "qwen/qwen3.8-27b",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...conversation,
    ],
  });
  if (response) {
    console.log("got the response waiting to share");
  }
  return response.choices[0].message.content;
};

export const titleGenerateLLm = async (conversation) => {
  console.log("enter the titlegenerationllm");
  
  const conversationText = conversation
    .map((msg) => `${msg.role}: ${msg.content}`)
    .join("\n");

  const response = await groq_client.chat.completions.create({
    model: "qwen/qwen3.8-27b",
    messages: [
      {
        role: "system",
        content:
          "Generate a 3-5 word title for the conversation. Return ONLY the title.",
      },
      {
        role: "user",
        content: conversationText,
      },
    ],
    temperature: 0,
    max_tokens: 20,
  });

  let title = response.choices[0].message.content.trim();

  title = title.replace(/^(title|new title)\s*[:\-]?\s*/i, "");

  title = title.split("\n")[0];

 
  const words = title.split(/\s+/);

  if (words.length > 5) {
    title = words.slice(0, 5).join(" ");
  }

  return title;
};