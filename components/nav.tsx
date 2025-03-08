import Link from "next/link";

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
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <Link href="/">
            <h1 className="text-3xl font-bold mb-4 md:mb-0 font-mono">Ideabox</h1>
          </Link>
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
