"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Post } from "@/lib/posts";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-12 md:space-y-16">
      {posts.map((post) => (
        <li>
          <Link href={`/blog/${post.slug}`} prefetch>
            <div className="flex flex-col group">
              <h3 className="text-xl font-extrabold text-foreground/80 md:text-xl md:font-bold md:mb-1 mb-2 group-hover:text-slate-100 transition duration-400">
                {post.metadata.title}
              </h3>
              <time className="text-sm text-muted-foreground md:text-base group-hover:text-slate-200 transition duration-400">
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
