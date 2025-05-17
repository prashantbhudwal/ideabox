"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

const segmentMap = [
  {
    segment: "(spaces)",
    title: "spaces",
  },
  {
    segment: "story",
    title: "story",
  },
];

const findSegment = (segment: string) => {
  const found = segmentMap.find((s) => s.segment === segment);
  if (!found) return null;
  return found.title;
};

export function TitleIsland({ className }: { className?: string }) {
  const segment = useSelectedLayoutSegment();
  const isRoot = segment === null;
  const isBlog = segment === "blog";
  const showSiteName = isRoot || isBlog;

  return (
    <Link href="/">
      <div
        className={cn(
          "flex flex-row gap-1 md:gap-1.5 xl:gap-2 items-baseline text-2xl md:text-3xl 2xl:text-4xl font-bold font-mono",
          className,
        )}
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
        <AnimatePresence mode="wait">
          {showSiteName ? (
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
          ) : segment ? (
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
              <span className="text-primary">{findSegment(segment)}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </Link>
  );
}
