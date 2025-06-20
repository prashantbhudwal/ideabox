import { cn, isDev } from "~/client/lib/utils";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "~/client/components/ui/sheet";
import { Button } from "~/client/components/ui/button";
import { TPost } from "~/common/types/content.types";
import { useAtom } from "jotai";
import { chatPanelAtom } from "./chat-panel.atom";
import { ChatPanel } from "./chat-panel";

export function Chat({
  className,
  post,
}: {
  readonly className?: string;
  readonly post: TPost;
}) {
  const [open, setOpen] = useAtom(chatPanelAtom);
  useHotkeys(
    "meta+k, ctrl+k",
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {
      enableOnFormTags: ["INPUT", "TEXTAREA"], // keep working when typing
      enableOnContentEditable: true,
      preventDefault: true,
    },
    [setOpen],
  );

  // Only show chat in dev
  if (!isDev) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className={cn("fixed bottom-4 right-20 h-12 w-12 p-0", className)}
          size="icon"
          variant="secondary"
        >
          💬
          <span className="sr-only">Toggle Chat (⌘/Ctrl + K)</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col p-0">
        <SheetHeader className="border-b px-4 py-2">
          <SheetTitle>ask ashant</SheetTitle>
          <SheetDescription>{post.title.toLowerCase()}</SheetDescription>
        </SheetHeader>
        <ChatPanel post={post} />
      </SheetContent>
    </Sheet>
  );
}
