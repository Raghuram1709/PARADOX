import OpenAI from "openai";

GROQ_BASE_URL="https://api.groq.com/openai/v1"
OR_BASE_URL="https://openrouter.ai/api/v1"

export const op_client = new OpenAI({
  baseURL: process.env.OR_BASE_URL,
  apiKey: OR_API_KEY,
});

export const groq_client = new OpenAI({
  baseURL: process.env.GROQ_BASE_URL,
  apiKey: GROQ_API_KEY,
});