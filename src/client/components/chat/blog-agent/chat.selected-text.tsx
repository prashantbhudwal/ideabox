import { useStore } from "../../../store";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import React from "react";

export function SelectedText() {
  const selectedText = useStore((s) => s.selectedText);
  const setSelectedText = useStore((s) => s.setSelectedText);
  const [isDismissing, setIsDismissing] = React.useState(false);
  const [isAppearing, setIsAppearing] = React.useState(true);

  // Trigger entry animation when component mounts
  React.useEffect(() => {
    if (!selectedText) return;

    const timer = setTimeout(() => {
      setIsAppearing(false);
    }, 50); // Small delay to ensure smooth entry

    return () => clearTimeout(timer);
  }, [selectedText]);

  if (!selectedText) return null;

  // Helper function to format text as "first few chars...ending chars"
  const formatSelectedText = (text: string, maxLength: number = 20) => {
    if (text.length <= maxLength) return text;

    const startChars = Math.floor((maxLength - 3) / 2); // Account for "..."
    const endChars = maxLength - 3 - startChars;

    return `${text.slice(0, startChars)}...${text.slice(-endChars)}`;
  };

  const handleDismiss = () => {
    setIsDismissing(true);
    window.getSelection()?.removeAllRanges();
    // Delay clearing the state until animation completes
    setTimeout(() => {
      setSelectedText("");
      setIsDismissing(false);
    }, 300); // Match the animation duration
  };

  //Show a snippet of the selected text
  return (
    <Card
      className={`w-42 relative transition-all duration-300 ease-in-out outline outline-primary ${
        isDismissing
          ? "opacity-0 scale-95 translate-y-2"
          : isAppearing
            ? "opacity-0 scale-95 translate-y-2"
            : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-5 w-5 rounded-full hover:bg-muted/50 z-10"
        onClick={handleDismiss}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Clear selected text</span>
      </Button>
      <CardContent className="text-sm pr-8 whitespace-nowrap flex items-center justify-center">
        <div className="break-all">{formatSelectedText(selectedText)}</div>
      </CardContent>
    </Card>
  );
}
