import { createServerFileRoute } from "@tanstack/react-start/server";
import { getBlogAgentResponse } from "~/server/chat/get-blog-agent-response";
import { ZChatAPIPayload } from "~/common/types/agent.types";
import { createServerFn } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute("/api/chat/blog").methods({
  POST: async ({ request }) => {
    const payload = ZChatAPIPayload.safeParse(await request.json());

    if (!payload.success) {
      console.log("🟢 payload error", payload.error);
      return new Response(JSON.stringify(payload.error), {
        status: 400,
      });
    }
    console.log("🟢 payload", payload.data.messages);
    console.log("🟢 Called On route", payload.data.data.routeName);
    console.log("🟢 With data", payload.data.data.content.slice(0, 1000));

    const response = await getBlogAgentResponse({
      messages: payload.data.messages,
      data: payload.data.data,
    });

    return response;
  },
});

// server function for chat using streaming api
const chatServerFunction = createServerFn({
  method: "POST",
  response: "raw",
})
  .validator((input) => {
    const payload = ZChatAPIPayload.safeParse(input);
    if (!payload.success) {
      throw new Error(payload.error.message);
    }
    return payload.data;
  })
  .handler(async ({ data }) => {
    const stream = await getBlogAgentResponse({
      messages: data.messages,
      data: data.data,
    });
    return new Response(stream.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  });
