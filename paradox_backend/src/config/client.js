import OpenAI from "openai";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1";

export const groq_client = new OpenAI({
  baseURL: GROQ_BASE_URL,
  apiKey: process.env.GROQ_API_KEY, 
});
