import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "~/client/components/ui/scroll-area";
import { link } from "~/client/lib/link";
import { type TBlogAgentBody } from "~/common/types/agent.types";
import { type TPost } from "~/common/types/content.types";
import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
  useDeferredValue,
} from "react";
import { useStore } from "../../../store";
import dedent from "dedent";
import { Composer } from "./chat.composer";
import { ChatMessageList } from "./chat.message-list";

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

export function Chat({ post }: { readonly post: TPost }) {
  const setChatStatus = useStore((state) => state.setChatStatus);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastUserRef = useRef<HTMLDivElement | null>(null);
  const [bottomPadding, setBottomPadding] = useState(0);
  const body = useMemo(() => getRequestBody(post), [post.id]);

  const selectedText = useStore((s) => s.selectedText);
  const setSelectedText = useStore((s) => s.setSelectedText);

  const {
    messages,
    input: realInput,
    handleInputChange,
    setInput,
    append,
    status,
  } = useChat({
    api: CHAT_API,
    body,
  });

  const input = useDeferredValue(realInput);

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
    setInput("");
    let message = input;
    if (selectedText) {
      message = dedent`> ${selectedText}\n\n
      ${input}`;
    }
    if (message.trim() === "") return;
    await append({ role: "user", content: message });

    // Clear selected text immediately after sending
    if (selectedText) {
      setSelectedText("");
    }
  };

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
          <ChatMessageList messages={messages} lastUserRef={lastUserRef} />
        </div>
      </ScrollArea>

      <Composer
        handleCustomSubmit={handleCustomSubmit}
        input={input}
        handleInputChange={handleInputChange}
      />
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
