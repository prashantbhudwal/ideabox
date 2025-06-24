import { useAtom } from "jotai";
import { useHotkeys } from "react-hotkeys-hook";
import { chatSidebarAtom } from "./chat-sidebar.atom";
import { useIsMobile } from "~/client/hooks/use-mobile";
import { isDev } from "~/client/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "~/client/components/ui/sidebar";
import { ChatPanel } from "../blog-agent/chat-panel";
import { type TPost } from "~/common/types/content.types";

export function ChatSidebar({ post }: { readonly post: TPost }) {
  const [open, setOpen] = useAtom(chatSidebarAtom);
  const isMobile = useIsMobile();

  useHotkeys(
    "meta+shift+i, ctrl+shift+i",
    (event) => {
      event.preventDefault();
      if (!isMobile) {
        setOpen((prev) => !prev);
      }
    },
    {
      enableOnFormTags: ["INPUT", "TEXTAREA"],
      enableOnContentEditable: true,
      preventDefault: true,
      scopes: ["chat-sidebar"],
    },
    [setOpen, isMobile],
  );

  // Only show chat in dev and not on mobile
  if (!isDev || isMobile) return null;

  return (
    <Sidebar side="left" variant="inset">
      <SidebarHeader className="border-b px-4 py-2">
        <h2 className="text-lg font-semibold">ask ashant</h2>
        <p className="text-sm text-muted-foreground">
          {post.title.toLowerCase()}
        </p>
      </SidebarHeader>
      <SidebarContent className="flex flex-col p-0">
        <ChatPanel post={post} />
      </SidebarContent>
    </Sidebar>
  );
}
