import { cn } from "~/client/lib/utils";
import { ActionIsland } from "./action-island";
import { TitleIsland } from "./title-island";

export function Navbar({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        "flex w-full flex-row items-center tracking-tight md:space-x-12",
        "bg-background/50 sticky top-0 z-50 backdrop-blur-sm",
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
