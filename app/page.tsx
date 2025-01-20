import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  return (
    <div className="p-4">
      <PostList posts={posts} />
    </div>
  );
}
