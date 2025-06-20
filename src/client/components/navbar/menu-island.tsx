import { Link } from "@tanstack/react-router";
import { cn } from "~/client/lib/utils";

type MenuItem = {
  label: string;
  route: string;
  isActive: boolean;
};

const menuItems: MenuItem[] = [
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

export function MenuIsland({ className }: { className?: string }) {
  return (
    <nav className={cn("my-4 md:my-0", className)}>
      <ul className="flex flex-row space-x-2 md:space-x-8 items-baseline">
        {menuItems.map(({ isActive, label, route }) => (
          <li key={label}>
            <Link
              to={route}
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
        ))}
      </ul>
    </nav>
  );
}
