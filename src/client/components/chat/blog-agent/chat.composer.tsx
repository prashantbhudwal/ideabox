import { Button } from "~/client/components/ui/button";
import { Input } from "~/client/components/ui/input";
import { useAgentStore } from "./agent.store";
import { useRef, useEffect } from "react";
import { SelectedText } from "./chat.selected-text";

export function Composer({
  handleCustomSubmit,
  input,
  handleInputChange,
}: {
  handleCustomSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const selectedText = useAgentStore((s) => s.selectedText);
  const setSelectedText = useAgentStore((s) => s.setSelectedText);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedText &&
        formRef.current &&
        !formRef.current.contains(event.target as Node)
      ) {
        setSelectedText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedText, setSelectedText]);
  return (
    <>
      <SelectedText />
      <form
        ref={formRef}
        onSubmit={handleCustomSubmit}
        className="flex gap-2 border-t p-4"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="ask anything"
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </>
  );
}
