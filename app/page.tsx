import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import { Separator } from "@/components/ui/separator";

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );

  // Group posts by year
  const postsByYear = posts.reduce<{ [key: string]: typeof posts }>(
    (acc, post) => {
      const year = new Date(post.metadata.date).getFullYear().toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {}
  );

  return (
    <div className="p-4">
      {Object.keys(postsByYear)
        .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
        .map((year) => (
          <div key={year} className="mb-8">
            <h2 className="text-2xl font-semibold pb-2">{year}</h2>
            <Separator className="mb-4" />
            <PostList posts={postsByYear[year]} />
          </div>
        ))}
    </div>
  );
}
