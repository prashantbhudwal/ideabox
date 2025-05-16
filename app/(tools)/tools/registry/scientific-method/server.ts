"use server";

import { createOpenRouter, openrouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";

export async function testLLM() {
  const model = openrouter("google/gemini-2.5-pro-exp-03-25:free");

  const { text } = await generateText({
    model,
    prompt: "Write a vegetarian lasagna recipe for 4 people.",
  });

  return text;
}
