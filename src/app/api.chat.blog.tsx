import { createServerFileRoute } from "@tanstack/react-start/server";
import { getBlogAgentResponse } from "~/server/chat/get-blog-agent-response";

export const ServerRoute = createServerFileRoute("/api/chat/blog").methods({
  POST: async ({ request }) => {
    const payloadJson = await request.json();

    console.log("body", payloadJson);

    const response = await getBlogAgentResponse({
      payload: payloadJson,
    });

    return response;
  },
});
