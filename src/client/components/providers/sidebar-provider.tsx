import { useAtom } from "jotai";
import { SidebarProvider, SidebarInset } from "~/client/components/ui/sidebar";
import { chatSidebarAtom } from "../chat/chat-sidebar/chat-sidebar.atom";
import { ChatSidebar } from "../chat/chat-sidebar";
import { useRouter } from "@tanstack/react-router";
import { useIsMobile } from "~/client/hooks/use-mobile";
import { isDev } from "~/client/lib/utils/isDev";

export function GlobalSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();
  if (isMobile || !isDev) return children;

  const [open, setOpen] = useAtom(chatSidebarAtom);
  const router = useRouter();

  const isPostPage = router.state.location.pathname.startsWith("/blog/");
  const post = (router.state as any)?.matches?.[1]?.loaderData?.post;

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {isPostPage && post ? <ChatSidebar post={post} /> : null}
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
