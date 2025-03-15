"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Post } from "@/lib/posts";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-8.5">
      {posts.map((post) => (
        <motion.li
          key={post.slug}
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.02 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 40,
            mass: 0.8,
          }}
        >
          <Link href={`/blog/${post.slug}`}>
            <motion.div
              layoutId={`container-${post.slug}`}
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 35,
                mass: 0.8,
              }}
              className="flex flex-col"
            >
              <motion.h3
                layoutId={`title-${post.slug}`}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  mass: 1,
                }}
                className="text-lg font-medium mb-1"
              >
                {post.metadata.title}
              </motion.h3>
              <motion.time
                layoutId={`date-${post.slug}`}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  mass: 1,
                }}
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </motion.time>
            </motion.div>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}
