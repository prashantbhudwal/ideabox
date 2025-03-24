import { cn } from "@/lib/utils";
import { TbShovel } from "react-icons/tb";

export function WIP({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-muted-foreground/60 rounded py-1  flex items-center space-x-2 italic",
        className,
      )}
    >
      <TbShovel />
      <span className="sm:inline hidden">
        This website is still a work in progress.
      </span>
      <span className="sm:hidden">WIP</span>
    </div>
  );
}
