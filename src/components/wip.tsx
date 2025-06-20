import { cn } from "~/lib/utils";
import { TbShovel } from "react-icons/tb";

export async function WIP({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-muted-foreground/60 rounded py-4 flex items-center space-x-2 italic",
        className,
      )}
    >
      <TbShovel />
      <span className="sm:hidden">WIP</span>
    </div>
  );
}
