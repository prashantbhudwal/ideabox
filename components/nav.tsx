import Link from "next/link";
import { WIP } from "./wip";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  return (
    <aside className="mb-8 tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav className="flex flex-row justify-between" id="nav">
          <Link href="/">
            <h1 className="text-3xl font-bold  font-mono">Ideabox</h1>
          </Link>
          <WIP className="text-sm md:text-base" />
        </nav>
      </div>
    </aside>
  );
}

const NavItems = function () {
  return (
    <div className="flex flex-row space-x-0 pr-10">
      {Object.entries(navItems).map(([path, { name }]) => {
        return (
          <Link
            key={path}
            href={path}
            className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
          >
            {name}
          </Link>
        );
      })}
    </div>
  );
};
