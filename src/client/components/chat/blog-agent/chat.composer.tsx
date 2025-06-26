import { Button } from "~/client/components/ui/button";
import { Input } from "~/client/components/ui/input";
import { useAgentStore } from "./agent.store";
import { useRef, useEffect } from "react";
import { SelectedText } from "./chat.selected-text";
import { ArrowUp, SendIcon } from "lucide-react";
import { Textarea } from "../../ui/textarea";

export function Composer({
  handleCustomSubmit,
  input,
  handleInputChange,
}: {
  handleCustomSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
    <div className="flex flex-col gap-2 p-4">
      <SelectedText />
      <form
        ref={formRef}
        onSubmit={handleCustomSubmit}
        className="flex flex-col gap-2 p-4 rounded-xl outline bg-secondary "
      >
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="ask anything"
          className="resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="flex justify-end">
          <Button type="submit" size={"icon"} className="rounded-full size-7">
            <ArrowUp />
          </Button>
        </div>
      </form>
    </div>
  );
}
