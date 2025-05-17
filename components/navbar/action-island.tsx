"use client";
import Link from "next/link";
import { FaXTwitter, FaGithub, FaAddressBook, FaDiceD6 } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

type ActionItem = {
  icon: React.ReactElement;
  link: string;
  name: string;
  target: string;
};

const actionItems: ActionItem[] = [
  {
    link: "/spaces",
    icon: <FaDiceD6 className="text-primary/70" />,
    name: "spaces",
    target: "",
  },
  {
    link: "/story",
    icon: <FaAddressBook className="text-primary/70" />,
    name: "story",
    target: "",
  },
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
];

export function ActionIsland({ className }: { className?: string }) {
  const segment = useSelectedLayoutSegment();
  if (segment === "(spaces)" || segment === "story") {
    return null;
  }

  return (
    <ul className={cn(className)}>
      {actionItems.map((action) => (
        <Button size="icon" variant="ghost" key={action.name}>
          <Link
            href={action.link}
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target={action.target}
          >
            {action.icon}
          </Link>
        </Button>
      ))}
    </ul>
  );
}
