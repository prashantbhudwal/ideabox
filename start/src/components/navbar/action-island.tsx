"use client";
import { Link } from "@tanstack/react-router";
import { FaXTwitter, FaGithub, FaAddressBook, FaDiceD6 } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { useAtom, useSetAtom } from "jotai";
import { SearchModalAtom } from "../search/search-modal-atom";

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
            to={action.link}
            className="flex items-center transition-all"
            rel="noopener noreferrer"
            target={action.target}
          >
            {action.icon}
          </Link>
        </Button>
      ))}
      {/* <ActionIslandButtons /> */}
    </ul>
  );
}

export function ActionIslandButtons({ className }: { className?: string }) {
  const setSearchModalOpen = useSetAtom(SearchModalAtom);

  const buttons = [
    {
      action: () => setSearchModalOpen(true),
      name: "search",
      icon: <FaSearch className="text-primary/70" />,
    },
  ];

  return (
    <>
      {buttons.map((button) => (
        <Button
          size="icon"
          variant="ghost"
          key={button.name}
          onClick={button.action}
        >
          {button.icon}
        </Button>
      ))}
    </>
  );
}
