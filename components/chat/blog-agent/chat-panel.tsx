"use client";
import { useChat } from "@ai-sdk/react";

import { TPost } from "@/lib/types/content.types";
import { cn } from "@/lib/utils";
import { TBlogAgentBody } from "@/lib/types/agent.types";
import { MemoizedMarkdown } from "./memo-markdown";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TAgentAnnotation } from "@/server/chat/get-blog-agent-response";
import { Separator } from "@/components/ui/separator";
import { Markdown } from "@/components/blog/mdx/md.client";

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
          {messages.map((message, index) => {
            const annotations = message.annotations;
            return (
              <div
                key={message.id}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm ",
                  message.role === "user"
                    ? "bg-primary/80 text-primary-foreground ml-auto"
                    : "bg-card",
                )}
              >
                {annotations && annotations.length > 0 && (
                  <div className="mb-2 flex flex-col gap-2">
                    {(annotations as TAgentAnnotation[] | undefined)?.map(
                      (a) => (
                        <div
                          key={`${a.type}-${a.stepName}`}
                          className="mb-1 py-1 text-xs text-muted-foreground flex flex-col gap-1"
                        >
                          <span className="font-semibold mr-1 capitalize text-primary/90">
                            {a.stepName}
                          </span>
                          <span>{a.message}</span>
                        </div>
                      ),
                    )}
                    {message.content.length > 1 && <Separator />}
                  </div>
                )}
                {/* <MemoizedMarkdown id={message.id} content={message.content} /> */}
                <Markdown
                  content={message.content}
                  className={cn(
                    "prose-sm",
                    message.role === "user"
                      ? "text-primary-foreground"
                      : "text-card-foreground",
                  )}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="ask anything"
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
