import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { openai } from "@ai-sdk/openai";

export const gemini = google("gemini-2.0-flash");
export const gemini25 = google("gemini-2.5-flash-preview-04-17");
const gpt41Mini = openai("gpt-4.1-mini");
const qwen32Bq2q = groq("qwen-qwq-32b");
const llama70B = groq("llama-3.3-70b-versatile");
const gptO4mini = openai("o4-mini", {
  reasoningEffort: "low",
});

export const models = {
  gemini,
  gemini25,
  gpt41Mini,
  gptO4mini,
  qwen32Bq2q,
  llama70B,
};
