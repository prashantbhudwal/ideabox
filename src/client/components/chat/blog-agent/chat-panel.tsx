import { Message, useChat } from "@ai-sdk/react";
import { Button } from "~/client/components/ui/button";
import { Input } from "~/client/components/ui/input";
import { ScrollArea } from "~/client/components/ui/scroll-area";
import { link } from "~/client/lib/link";
import { cn } from "~/client/lib/utils";
import { type TBlogAgentBody } from "~/common/types/agent.types";
import { type TPost } from "~/common/types/content.types";
import { Thought } from "./thought";
import { dummyMessageParts } from "./thoughts.data";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { isDev } from "~/client/lib/utils/isDev";
import { Prose } from "../../blog/custom/prose.v2";
import { useAgentStore } from "./agent.store";
import { SelectedText } from "./chat.selected-text";
import dedent from "dedent";

const CHAT_API = "/api/chat/blog";
const BOTTOM_PADDING_PERCENTAGE = 0.9;

const getRequestBody = (post: TPost): TBlogAgentBody => {
  return {
    data: {
      routeName: link.url.internal.post({ slug: post.slug }),
      contentType: "blog-page",
      content: post.content,
    },
  };
};

const getLastUserMessage = (messages: Message[]) => {
  return messages.findLast((m) => m.role === "user");
};

export function ChatPanel({ post }: { readonly post: TPost }) {
  const setChatStatus = useAgentStore((state) => state.setChatStatus);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastUserRef = useRef<HTMLDivElement | null>(null);
  const [bottomPadding, setBottomPadding] = useState(0);

  const selectedText = useAgentStore((s) => s.selectedText);
  const setSelectedText = useAgentStore((s) => s.setSelectedText);

  const { messages, input, handleInputChange, setInput, append, status } =
    useChat({
      api: CHAT_API,
      body: getRequestBody(post),
    });

  useEffect(() => {
    setChatStatus(status);
  }, [status, setChatStatus]);

  // "scroll newest user bubble to the top"
  useLayoutEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") return;
    // only scroll when a new user message is added

    lastUserRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [messages]);

  // "keep bottom padding equal to 90 % of the current viewport height"
  useLayoutEffect(() => {
    const updatePadding = () => {
      if (scrollAreaRef.current) {
        setBottomPadding(
          scrollAreaRef.current.offsetHeight * BOTTOM_PADDING_PERCENTAGE,
        );
      }
    };

    updatePadding();

    const resizeObserver = new ResizeObserver(updatePadding);
    if (scrollAreaRef.current) {
      resizeObserver.observe(scrollAreaRef.current);
    }

    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updatePadding);
      resizeObserver.disconnect();
    };
  }, []);

  // Replace the form's onSubmit handler to prepend selected text
  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let message = input;
    if (selectedText) {
      message = dedent`> ${selectedText}\n\n
      ${input}`;
    }
    if (message.trim() === "") return;
    await append({ role: "user", content: message });
    setInput("");

    // Clear selected text immediately after sending
    if (selectedText) {
      console.log("Clearing selectedText from submit");
      setSelectedText("");
    }
  };

  // Find the last user message's id so we can attach the ref

  return (
    <>
      <ScrollArea
        ref={scrollAreaRef}
        className="flex-1 h-0 overflow-y-auto p-4 w-full"
      >
        <div
          className="flex flex-col gap-2 w-full"
          style={{ paddingBottom: `${bottomPadding}px` }}
        >
          {/*  Add dummy message parts for development */}
          {messages.length === 0 && isDev && (
            <Thought messageParts={dummyMessageParts} />
          )}
          {messages.map((message) => {
            return (
              <div
                key={message.id}
                ref={
                  message.role === "user" &&
                  message.id === getLastUserMessage(messages)?.id
                    ? lastUserRef
                    : undefined
                }
                className={cn(
                  "rounded-lg px-3 py-2 text-sm ",
                  message.role === "user"
                    ? "bg-secondary text-secondary-foreground ml-auto"
                    : "bg-card",
                )}
              >
                {message.role === "assistant" && (
                  <Thought messageParts={message.parts} />
                )}

                <Prose
                  content={message.content}
                  type="markdown"
                  className={cn(
                    "prose",
                    message.role === "user"
                      ? "text-secondary-foreground"
                      : "text-card-foreground",
                  )}
                />
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <SelectedText />
      <form onSubmit={handleCustomSubmit} className="flex gap-2 border-t p-4">
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

//             const annotations = message.annotations;
// {
//   annotations && annotations.length > 0 && (
//     <div className="mb-2 flex flex-col gap-2">
//       {(annotations as TAgentAnnotation[] | undefined)?.map((a) => (
//         <div
//           key={`${a.type}-${a.stepName}`}
//           className="mb-1 py-1 text-xs text-muted-foreground flex flex-col gap-1"
//         >
//           <span className="font-semibold mr-1 capitalize text-primary/90">
//             {a.stepName}
//           </span>
//           <span>{a.message}</span>
//         </div>
//       ))}
//       {message.content.length > 1 && <Separator />}
//     </div>
//   );
// }
