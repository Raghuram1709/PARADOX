import OpenAI from "openai";
export const op_client = new OpenAI({
  baseURL: process.env.OR_BASE_URL,
  apiKey: process.env.OR_API_KEY,
});

export const groq_client = new OpenAI({
  baseURL: process.env.GROQ_BASE_URL,
  apiKey: process.env.GROQ_API_KEY,
});

// async function listModels() {
//   // 1. Await the response from the API
//   const models = await groq_client.models.list();

//   // 2. Use for...of to iterate through the data array directly
//   for (const model of models.data) {
//     console.log(model.id); // Prints the string ID (e.g., 'llama3-8b-8192')
//   }
// }

// listModels().catch(console.error);