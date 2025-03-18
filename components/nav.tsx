import Link from "next/link";
import { WIP } from "./wip";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";

type NavItems = Array<{
  label: string;
  route: string;
  isActive: boolean;
}>;

const navItems: NavItems = [
  {
    label: "writings",
    route: "/",
    isActive: true,
  },
  {
    label: "story",
    route: "",
    isActive: false,
  },
  {
    label: "tools",
    route: "",
    isActive: false,
  },
];

export function Navbar() {
  return (
    <aside className="mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20 flex flex-col space-y-2">
        <header className="flex flex-row justify-between items-end" id="nav">
          <Link href="/" className="flex flex-row gap-1.5">
            <Image src={`/icon.png`} alt={"icon"} width="36" height="36" />
            <h1 className="text-3xl font-bold font-mono">
              pr
              <span className="underline underline-offset-4 decoration-1 decoration-primary">
                ashant
              </span>
            </h1>
          </Link>
          <WIP className="text-sm md:text-base" />
        </header>
        <MenuBar />
      </div>
    </aside>
  );
}

const MenuBar = function () {
  return (
    <div className="flex flex-row space-x-0 pr-10 items-end">
      {navItems.map(({ isActive, label, route }) => {
        return (
          <Link
            key={label}
            href={route}
            className={cn(
              "font-mono transition-all flex align-middle relative py-1 pr-2 m-1",
              {
                "hover:text-neutral-800 dark:hover:text-neutral-200": isActive,
                "text-muted-foreground/60": !isActive,
              }
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};
