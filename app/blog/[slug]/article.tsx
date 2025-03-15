"use client"

import { Markdown } from "@/components/markdown-parser";
import { Post } from "@/lib/posts";
import { motion } from "motion/react";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export function Article({ post }: { post: Post }) {
  const searchParams = useSearchParams();
  const fromPosition = searchParams.get('from');
  
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
        mass: 0.8
      }}
      className="max-w-3xl py-6 sm:py-10"
    >
      <header className="mb-6 sm:mb-8">
        <motion.div
          layoutId={`container-${post.slug}`}
          className="flex flex-col"
        >
          <motion.h1 
            layoutId={`title-${post.slug}`}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1
            }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3 text-gray-900 dark:text-gray-100 leading-tight"
          >
            {post.metadata.title}
          </motion.h1>
          <motion.time 
            layoutId={`date-${post.slug}`}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              mass: 1
            }}
            className="text-sm sm:text-base text-gray-600 dark:text-gray-400"
          >
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
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
          delay: 0.2
        }}
        className="prose prose-lg dark:prose-invert"
        suppressHydrationWarning
      >
        <Markdown>{post.content}</Markdown>
      </motion.div>
    </motion.article>
  );
}
