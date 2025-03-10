import { cn } from "@/lib/utils";
import { TbShovel } from "react-icons/tb";

export function WIP({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-yellow-600 outline-dashed outline-yellow-600 outline-1 rounded py-1 px-2 flex items-center space-x-2",
        className
      )}
    >
      <TbShovel />
      <span className="sm:inline hidden">Work In Progress</span>
      <span className="sm:hidden">WIP</span>
    </div>
  );
}
