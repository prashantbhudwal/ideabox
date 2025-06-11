"use client";
import { useChat } from "@ai-sdk/react";

import { TPost } from "@/lib/types/content.types";
import { cn } from "@/lib/utils";
import { TBlogAgentBody } from "@/lib/types/agent.types";
import { MemoizedMarkdown } from "./memo-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function ChatPanel({ post }: { readonly post: TPost }) {
  const body: TBlogAgentBody = {
    data: {
      postContent: post.content,
    },
  };

  const { messages, input, handleInputChange, handleSubmit, setData, data } =
    useChat({
      api: "/api/chat/blog",
      body,
      experimental_throttle: 50,
    });

  return (
    <>
      <ScrollArea className="flex-1 h-0 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted",
              )}
            >
              <MemoizedMarkdown id={message.id} content={message.content} />
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
