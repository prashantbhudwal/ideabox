"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { FaCopy } from "react-icons/fa6";
import { useAtom, useAtomValue } from "jotai";
import { chatPanelAtom } from "./chat/blog-agent/chat-panel.atom";
import { chatSidebarAtom } from "./chat/chat-sidebar/chat-sidebar.atom";
import { useStore } from "../store";
import { useRouter } from "@tanstack/react-router";
import { isDev } from "~/client/lib/utils/isDev";
import { useIsMobile } from "~/client/hooks/use-mobile";

export function SelectionToolbar() {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const chatPanelOpen = useAtomValue(chatPanelAtom);
  const [sidebarOpen, setSidebarOpen] = useAtom(chatSidebarAtom);
  const setSelectedText = useStore((s) => s.setSelectedText);
  const router = useRouter();
  const isMobile = useIsMobile();

  /* Track selection end */
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) {
        const range = sel.getRangeAt(0);
        const rects = range.getClientRects();
        const lastRect = rects[rects.length - 1];
        if (lastRect) {
          setTimeout(() => {
            setRect(lastRect);
            setSelectedText(sel.toString()); // Only update when there is a new selection

            // Auto-open sidebar if on blog page, not mobile, and in dev mode
            const isPostPage =
              router.state.location.pathname.startsWith("/blog/");
            if (isPostPage && !isMobile && isDev && !sidebarOpen) {
              setSidebarOpen(true);
            }
          }, 200);
        }
      } else {
        setRect(null); // Hide the pill, but do NOT clear selectedText
        // Do not call setSelectedText("") here!
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [
    setSelectedText,
    router.state.location.pathname,
    isMobile,
    sidebarOpen,
    setSidebarOpen,
  ]);

  if (!rect) return null;

  /* Position the pill directly under the text selection end */
  const style = {
    top: rect.bottom + window.scrollY + 2,
    left: rect.right + window.scrollX,
  } as const;

  if (!chatPanelOpen) return null;
  return createPortal(
    <Button
      variant="secondary"
      size="icon"
      onMouseDown={(e) => e.preventDefault()} /* keep highlight */
      onClick={() => {
        const text = window.getSelection()?.toString() ?? "";
        navigator.clipboard.writeText(text);
        window.getSelection()?.removeAllRanges();
        setRect(null);
        setSelectedText(""); // Clear selectedText only when copying
      }}
      style={style}
      className="
        fixed z-50 rounded-3xl
        animate-in fade-in duration-25
      "
    >
      <FaCopy className="text-primary" />
    </Button>,
    document.body,
  );
}
