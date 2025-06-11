import { getBlogAgentResponse } from "@/server/chat";

export async function POST(req: Request) {
  const payloadJson = await req.json();
  // TODO: Validate messages
  return getBlogAgentResponse({ payload: payloadJson });
}
