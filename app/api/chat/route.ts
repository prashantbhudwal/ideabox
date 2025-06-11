import { mastra } from "@/server/mastra";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const myAgent = mastra.getAgent("researchOrchestratorAgent");
  const stream = await myAgent.stream(messages);

  return stream.toDataStreamResponse();
}
