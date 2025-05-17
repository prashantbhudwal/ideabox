import { cn } from "@/lib/utils";
import { ActionIsland } from "./action-island";
import { TitleIsland } from "./title-island";

export function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "flex flex-row md:space-x-12 tracking-tight w-full items-baseline",
        className,
      )}
    >
      <TitleIsland />
      <div className="flex flex-grow"></div>
      {/* <MenuBar className="flex flex-grow items-baseline" /> */}
      <ActionIsland className="items-baseline" />
    </nav>
  );
}
