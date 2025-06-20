import { Link } from "@tanstack/react-router";
import { cn } from "~/client/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { usePathInfo } from "~/client/hooks/use-path-info";

type TTitleIslandProps = {
  className?: string;
};

const SiteName = () => (
  <motion.h1
    key="siteName"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.2 }}
    className="text-2xl md:text-3xl 2xl:text-4xl font-bold font-mono"
  >
    pr
    <span className="underline underline-offset-3 md:underline-offset-4 2xl:underline-offset-5 decoration-1 decoration-primary">
      ashant
    </span>
  </motion.h1>
);

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
      "flex flex-row gap-1 md:gap-1.5 xl:gap-2 items-baseline text-2xl md:text-3xl 2xl:text-4xl font-bold font-mono",
      className,
    )}
  >
    <div
      className={cn("text-primary", {
        "font-normal text-2xl md:text-3xl 2xl:text-4xl text-primary/50":
          spaceShortTitle,
        "font-bold text-2xl md:text-3xl 2xl:text-4xl": !spaceShortTitle,
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

export function TitleIsland({ className }: TTitleIslandProps) {
  const { segment, backLink, showSiteName, spaceInfo, isSpace } = usePathInfo();
  const spaceShortTitle = spaceInfo?.spaceShortTitle;

  return (
    <Link to={backLink}>
      <div
        className={cn(
          "flex flex-row gap-1 md:gap-1.5 xl:gap-2 items-baseline text-2xl md:text-3xl 2xl:text-4xl font-bold font-mono",
          className,
        )}
      >
        <div className="relative top-[0.25em]">
          <img
            src="/icon-new.webp"
            alt="icon"
            width="36"
            height="36"
            className="w-7 h-7 md:w-9 md:h-9 2xl:w-11 2xl:h-11"
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
