import { memo } from "react";
import { cn } from "~/client/lib/utils";
import { UIMessage } from "ai";
import { Thought } from "./thought";
import { ChatMarkdown } from "./chat.markdown";

export const ChatMessage = memo(function ChatMessage({
  message,
}: {
  message: UIMessage;
}) {
  return (
    <div
      className={cn(
        "rounded-lg px-3 py-2 text-sm ",
        message.role === "user"
          ? "bg-secondary text-secondary-foreground ml-auto"
          : "bg-card",
      )}
    >
      {message.role === "assistant" && <Thought messageParts={message.parts} />}

      <ChatMarkdown
        markdown={message.content}
        className={cn(
          message.role === "user"
            ? "text-secondary-foreground"
            : "text-card-foreground",
        )}
      />
    </div>
  );
});
