import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.metadata.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
