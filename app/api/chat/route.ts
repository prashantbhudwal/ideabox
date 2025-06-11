import { getAgentResponse } from "@/server/chat";

export async function POST(req: Request) {
  const { messages } = await req.json();
  // TODO: Validate messages
  return getAgentResponse({ messages });
}
