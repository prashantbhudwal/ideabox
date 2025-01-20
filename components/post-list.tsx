import { Post } from "@/lib/posts";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <li
          key={post.slug}
          className="bg-card p-3 rounded-md shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-102 select-none"
        >
          <Link href={`/blog/${post.slug}`} className="text-base font-medium">
            {post.metadata.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
