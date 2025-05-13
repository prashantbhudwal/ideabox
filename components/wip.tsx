import { cn } from "@/lib/utils";
import { TbShovel } from "react-icons/tb";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { isProdWorking } from "@/convex/tasks";

export async function WIP({ className }: { className?: string }) {
  const isWorking = await fetchQuery(api.tasks.isProdWorking);
  if (isWorking) return;
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
