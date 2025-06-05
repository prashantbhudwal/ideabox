import { Agent, run } from "@openai/agents";

// Import the adapter
import { aisdk } from "@openai/agents-extensions";
import { gemini, models } from "@/lib/models";
import dotenv from "dotenv";
dotenv.config();
// Create a model instance to be used by the agent

// Create an agent with the model
const agent = new Agent({
  name: "My Agent",
  instructions: "You are a helpful assistant.",
  model: aisdk(models.gpt41Mini),
});

// Run the agent with the new model

const runAgent = async () => {
  const result = await run(agent, "What is the capital of Germany?");
  console.log(result.finalOutput);
};

if (require.main === module) {
  runAgent();
}
