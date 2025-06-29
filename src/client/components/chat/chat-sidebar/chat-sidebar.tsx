import { useAtom, useSetAtom } from "jotai";
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
import { SelectionToolbar } from "../../pill";

export function ChatSidebar() {
  useSidebarShortcut();

  if (!isDev) return null;

  return (
    <Sidebar side="left" variant="inset">
      <SidebarHeader className="border-b px-4 py-2">
        <h2 className="text-lg font-semibold">ashant</h2>
        <p className="text-sm text-muted-foreground">prashant's alter ego</p>
      </SidebarHeader>
      <SidebarContent className="flex flex-col p-0">
        <Chat />
      </SidebarContent>
      <SelectionToolbar />
    </Sidebar>
  );
}

function useSidebarShortcut() {
  const setOpen = useSetAtom(chatSidebarAtom);
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
}
