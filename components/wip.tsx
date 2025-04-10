import { cn } from "@/lib/utils";
import { TbShovel } from "react-icons/tb";

export function WIP({
  className,
  text = "This website is still a work in progress",
}: {
  className?: string;
  text?: string;
}) {
  return (
    <div
      className={cn(
        "text-muted-foreground/60 rounded py-4 flex items-center space-x-2 italic",
        className,
      )}
    >
      <TbShovel />
      <span className="sm:inline hidden">{text}</span>
      <span className="sm:hidden">WIP</span>
    </div>
  );
}
