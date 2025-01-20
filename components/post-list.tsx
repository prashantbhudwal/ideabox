import { Post } from "@/lib/posts";
import Link from "next/link";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <Link
          href={`/blog/${post.slug}`}
          className="text-base font-medium"
          key={post.slug}
        >
          <li className="p-3 rounded-md shadow-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 transform hover:scale-102 select-none">
            <span className="text-base font-medium">{post.metadata.title}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
