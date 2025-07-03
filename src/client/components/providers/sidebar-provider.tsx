import { useAtom } from "jotai";
import { SidebarProvider, SidebarInset } from "~/client/components/ui/sidebar";
import { chatSidebarAtom } from "../chat/chat-sidebar/chat-sidebar.atom";
import { ChatSidebar } from "../chat/chat-sidebar";
import { useIsMobile } from "~/client/hooks/use-mobile";
import { isDev } from "~/client/lib/utils/isDev";

export function GlobalSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useAtom(chatSidebarAtom);
  const isMobile = useIsMobile();

  if (isMobile || !isDev)
    return (
      <SidebarProvider open={open} onOpenChange={setOpen}>
        <div className="flex w-full flex-1 flex-col">{children}</div>
      </SidebarProvider>
    );

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <ChatSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
