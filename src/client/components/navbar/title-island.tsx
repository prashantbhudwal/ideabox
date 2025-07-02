import { Link } from "@tanstack/react-router";
import { cn } from "~/client/lib/utils";
import { motion } from "motion/react";
import { usePathInfo } from "~/client/hooks/use-path-info";
import loadable from "@loadable/component";

type TTitleIslandProps = {
  className?: string;
};

function SiteName() {
  return (
    <h1
      key="siteName"
      className="font-mono text-2xl font-bold md:text-3xl 2xl:text-4xl"
    >
      pr
      <span className="decoration-primary underline decoration-1 underline-offset-3 md:underline-offset-4 2xl:underline-offset-5">
        ashant
      </span>
    </h1>
  );
}

type TSegmentTitleProps = {
  segment: string;
  isSpace: boolean;
  spaceShortTitle?: string | null;
  className?: string;
};

const SegmentTitle = ({
  segment,
  isSpace,
  spaceShortTitle,
  className,
}: TSegmentTitleProps) => (
  <motion.div
    key={segment}
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -10 }}
    transition={{ duration: 0.2 }}
    className={cn(
      "flex flex-row items-baseline gap-1 font-mono text-2xl font-bold md:gap-1.5 md:text-3xl xl:gap-2 2xl:text-4xl",
      className,
    )}
  >
    <div
      className={cn("text-primary", {
        "text-primary/50 text-2xl font-normal md:text-3xl 2xl:text-4xl":
          spaceShortTitle,
        "text-2xl font-bold md:text-3xl 2xl:text-4xl": !spaceShortTitle,
      })}
    >
      {isSpace ? "spaces" : segment}
    </div>
    {spaceShortTitle && (
      <>
        <span className="text-primary/50">/</span>
        <span className="text-primary">{spaceShortTitle}</span>
      </>
    )}
  </motion.div>
);

const AnimatePresence = loadable(
  () =>
    import("motion/react").then((mod) => ({ default: mod.AnimatePresence })),
  {
    ssr: false,
    fallback: <SiteName />,
  },
);
export function TitleIsland({ className }: TTitleIslandProps) {
  const { segment, backLink, showSiteName, spaceInfo, isSpace } = usePathInfo();
  const spaceShortTitle = spaceInfo?.spaceShortTitle;

  return (
    <Link to={backLink}>
      <div
        className={cn(
          "flex flex-row items-baseline gap-1 font-mono text-2xl font-bold md:gap-1.5 md:text-3xl xl:gap-2 2xl:text-4xl",
          className,
        )}
      >
        <div className="relative top-[0.25em]">
          <img
            src="/icon-new.webp"
            alt="icon"
            width="36"
            height="36"
            className="h-7 w-7 md:h-9 md:w-9 2xl:h-11 2xl:w-11"
          />
        </div>
        <AnimatePresence mode="wait">
          {showSiteName ? (
            <SiteName />
          ) : segment ? (
            <SegmentTitle
              segment={segment}
              isSpace={isSpace}
              spaceShortTitle={spaceShortTitle}
              className={className}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </Link>
  );
}
