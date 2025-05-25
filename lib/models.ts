import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";

export const gemini = google("gemini-2.0-flash");
export const gpt41Mini = openai("gpt-4.1-mini");
export const qwen32Bq2q = groq("qwen-qwq-32b");
export const llama70B = groq("llama-3.3-70b-versatile");

export const models = {
  gemini,
  gpt41Mini,
  qwen32Bq2q,
  llama70B,
};
