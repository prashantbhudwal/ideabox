import Link from "next/link";
import {
  FaXTwitter,
  FaGithubAlt,
  FaGithub,
  FaCircleInfo,
  FaAddressBook,
} from "react-icons/fa6";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";

type MenuItems = Array<{
  label: string;
  route: string;
  isActive: boolean;
}>;

const menuItems: MenuItems = [
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

type ActionItems = {
  icon: React.ReactElement;
  link: string;
  name: string;
  target: string;
};

const actionItems: Array<ActionItems> = [
  {
    link: "https://x.com/prashant_hq",
    icon: <FaXTwitter className="text-primary/70" />,
    name: "x",
    target: "_blank",
  },
  {
    link: "https://github.com/prashantbhudwal",
    icon: <FaGithub className="text-primary/70" />,
    name: "github",
    target: "_blank",
  },
  {
    link: "/story",
    icon: <FaAddressBook className="text-primary/70" />,
    name: "story",
    target: "",
  },
];
export function Navbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "flex flex-row md:space-x-12 tracking-tight w-full items-baseline",
        className,
      )}
    >
      <Link
        href="/"
        className="flex flex-row gap-1 md:gap-1.5 xl:gap-2 items-baseline text-2xl md:text-3xl 2xl:text-4xl font-bold font-mono"
      >
        <div className="relative top-[0.25em]">
          <Image
            src={`/icon-new.webp`}
            alt={"icon"}
            width="36"
            height="36"
            className="w-7 h-7 md:w-9 md:h-9 2xl:w-11 2xl:h-11"
          />
        </div>
        <h1>
          pr
          <span className="underline underline-offset-3 md:underline-offset-4 2xl:underline-offset-5 decoration-1 decoration-primary">
            ashant
          </span>
        </h1>
      </Link>
      {/* Temp div, replace after placing the menubar */}
      <div className="flex flex-grow"></div>

      {/* <MenuBar className="flex flex-grow items-baseline" /> */}
      <ActionBar className="items-baseline" />
    </header>
  );
}

const MenuBar = function ({ className }: { className?: string }) {
  return (
    <nav className={cn("my-4 md:my-0", className)}>
      <ul className="flex flex-row space-x-2 md:space-x-8 items-baseline">
        {menuItems.map(({ isActive, label, route }) => {
          return (
            <li key={label}>
              <Link
                href={route}
                className={cn(
                  "font-mono flex items-center h-8 md:h-9 rounded-md transition-all relative",
                  "bg-clip-text",
                  {
                    "text-primary font-medium": isActive,
                    "hover:text-foreground": !isActive,
                    "text-muted-foreground": !isActive,
                  },
                )}
              >
                <span
                  className={cn(
                    "mx-2 md:mx-3 relative",
                    !isActive &&
                      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-foreground before:to-foreground before:bg-clip-text before:-z-10",
                    !isActive &&
                      "before:translate-x-[-100%] hover:before:translate-x-0 before:transition-transform before:duration-300 before:ease-in-out",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const ActionBar = function ({ className }: { className?: string }) {
  return (
    <ul className={cn(className)}>
      {actionItems.map((action) => {
        return (
          <Button size={"icon"} variant={"ghost"} key={action.name}>
            <Link
              href={action.link}
              className="flex items-center transition-all"
              rel="noopener noreferrer"
              target={action.target}
            >
              {action.icon}
            </Link>
          </Button>
        );
      })}
    </ul>
  );
};
