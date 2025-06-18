/**
 * # Define Agents
 *  - WikiSearchAgent
 *  - ReportAgent
 *
 */
import dotenv from "dotenv";
dotenv.config();
import { Agent, run } from "@openai/agents";
import { setOpenAIAPI, setDefaultOpenAIClient } from "@openai/agents";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

setDefaultOpenAIClient(client);
setOpenAIAPI("chat_completions");

const wikiSearchAgent = new Agent({
  name: "report_generation_agent",
  instructions: "Generate a 100 word report.",
  model: "gemini-2.0-flash",
});

async function runAgent() {
  const result = await run(wikiSearchAgent, "What is AI?");
  console.log(result.finalOutput);
}

if (require.main === module) {
  runAgent();
}
