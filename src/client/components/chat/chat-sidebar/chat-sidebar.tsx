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
import { Chat } from "../blog-agent/chat";
import { type TPost } from "~/common/types/content.types";

export function ChatSidebar({ post }: { readonly post: TPost }) {
  const [open, setOpen] = useAtom(chatSidebarAtom);

  useHotkeys(
    "meta+shift+i, ctrl+shift+i",
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {
      enableOnFormTags: ["INPUT", "TEXTAREA"],
      enableOnContentEditable: true,
      preventDefault: true,
      scopes: ["chat-sidebar"],
    },
    [setOpen],
  );

  if (!isDev) return null;

  return (
    <Sidebar side="left" variant="inset">
      <SidebarHeader className="border-b px-4 py-2">
        <h2 className="text-lg font-semibold">ask ashant</h2>
        <p className="text-sm text-muted-foreground">
          {post.title.toLowerCase()}
        </p>
      </SidebarHeader>
      <SidebarContent className="flex flex-col p-0">
        <Chat post={post} />
      </SidebarContent>
    </Sidebar>
  );
}
