"use client";
import React, { useState } from "react";
import { cn, isDev } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Chat({ className }: { readonly className?: string }) {
  const [open, setOpen] = useState<boolean>(false);
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
      <ChatPanel />
    </Sheet>
  );
}

function ChatPanel() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <SheetContent side="right" className="flex w-80 flex-col p-0">
      <SheetHeader className="border-b px-4 py-2">
        <SheetTitle>Chat</SheetTitle>
      </SheetHeader>
      {/* Make the message list take available space and scroll */}
      <ScrollArea className="flex-1 h-0 overflow-y-auto p-4">
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "rounded-lg px-3 py-2 text-sm",
                m.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted",
              )}
            >
              {m.content}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="flex gap-2 border-t p-4">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </SheetContent>
  );
}
