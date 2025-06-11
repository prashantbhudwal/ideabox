import { mastra } from "../mastra";

export async function getAgentResponse({
  messages,
}: {
  messages: any;
}): Promise<Response> {
  const myAgent = mastra.getAgent("researchOrchestratorAgent");
  const stream = await myAgent.stream(messages);

  return stream.toDataStreamResponse();
}
