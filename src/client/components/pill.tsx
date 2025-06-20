"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { FaCopy } from "react-icons/fa6";
import { useAtomValue } from "jotai";
import { chatPanelAtom } from "./chat/blog-agent/chat-panel.atom";

export function SelectionToolbar() {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const chatPanelOpen = useAtomValue(chatPanelAtom);

  /* Track selection end */
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return setRect(null);

      const range = sel.getRangeAt(0);
      const rects = range.getClientRects();
      const lastRect = rects[rects.length - 1];
      if (lastRect) {
        // Add 200ms delay before showing the pill
        setTimeout(() => {
          setRect(lastRect);
        }, 200);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

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
