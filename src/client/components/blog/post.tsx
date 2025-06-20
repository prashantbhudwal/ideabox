import { TPost } from "~/common/types/content.types";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Mdx } from "./mdx/mdx.client";

export function Post({ mdxCode, post }: { mdxCode: string; post: TPost }) {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}
      className="max-w-3xl py-6 sm:py-10"
    >
      <header className="mb-6 sm:mb-8">
        <motion.div layoutId={`container-${mdxCode}`} className="flex flex-col">
          <motion.h1
            layoutId={`title-${mdxCode}`}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1,
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 leading-tight"
          >
            {post.title}
          </motion.h1>
          <motion.time
            layoutId={`date-${post.slug}`}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1,
            }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
          >
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </motion.time>
        </motion.div>
      </header>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
          delay: 0.2,
        }}
        suppressHydrationWarning
      >
        <Mdx mdxCode={mdxCode} />
      </motion.div>
    </motion.article>
  );
}
