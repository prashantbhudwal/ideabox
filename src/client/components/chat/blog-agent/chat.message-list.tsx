import { memo, useMemo } from "react";
import { ChatMessage } from "./chat.message";
import { UIMessage } from "ai";
import { Thought } from "./thought";
import { dummyMessageParts } from "./thoughts.data";
import { isDev } from "~/client/lib/utils/isDev";

const getLastUserMessage = (messages: UIMessage[]) => {
  return messages.findLast((m) => m.role === "user");
};
export const ChatMessageList = memo(function ChatMessageList({
  messages,
  lastUserRef,
}: {
  messages: UIMessage[];
  lastUserRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (messages.length === 0 && isDev) {
    return <Thought messageParts={dummyMessageParts} />;
  }

  const lastMessageId = useMemo(() => {
    const lastUserMessage = getLastUserMessage(messages);
    return lastUserMessage?.id;
  }, [messages.length]); // doesn't need to re-run when tokens are added

  return (
    <>
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            ref={
              message.role === "user" && message.id === lastMessageId
                ? lastUserRef
                : undefined
            }
          >
            <ChatMessage message={message} />
          </div>
        );
      })}
    </>
  );
});
