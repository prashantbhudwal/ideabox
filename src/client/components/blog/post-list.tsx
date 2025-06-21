"use client";
import { type TPost } from "~/common/types/content.types";
import { PostCard } from "./post-card";

export default function PostList({ posts }: { posts: TPost[] }) {
  return (
    <ul className="space-y-12 md:space-y-16">
      {posts.map((post) => (
        <li key={post.slug}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}
