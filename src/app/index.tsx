import { createFileRoute, Link } from "@tanstack/react-router";
import PostList from "~/client/components/blog/post-list";
import { Separator } from "~/client/components/ui/separator";
import { Button } from "~/client/components/ui/button";
import { getWeekOfLife } from "~/common/utils/date";
import { seo } from "~/client/lib/utils/seo";
import { C } from "~/common/constants";
import { type TPost } from "~/common/types/content.types";
import { getPostsServerFn } from "~/server/modules/post/get-all-posts.server";
import { formatDate } from "~/client/helpers/format-date";

type TPostsByYear = {
  year: string;
  posts: TPost[];
};

export const Route = createFileRoute("/")({
  head: () => {
    const imagePath = `${C.url}/og-ashant.png`;
    return {
      title: "prashant",
      meta: seo({
        title: "prashant",
        description: `Notes on the world, software and life. Week ${getWeekOfLife()}.`,
        keywords: "prashant, blog, notes, software, life",
        image: imagePath,
        imageType: "image/png",
      }),
      links: [
        { rel: "canonical", href: C.url }, // absolute URL

        {
          rel: "alternate",
          type: "application/rss+xml",
          href: `${C.url}/api/feed`,
        },
      ],
    };
  },
  loader: async () => {
    const posts = await getPostsServerFn();

    const sorted = [...posts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const byYear = sorted.reduce<Record<string, TPost[]>>((acc, post) => {
      const dateObj = new Date(post.createdAt);
      const year = dateObj.getFullYear().toString();

      const formattedPost = {
        ...post,
        createdAt: formatDate(post.createdAt),
      };

      (acc[year] ||= []).push(formattedPost);
      return acc;
    }, {});

    const postsByYear: TPostsByYear[] = Object.entries(byYear)
      .map(([year, posts]) => ({ year, posts }))
      .sort((a, b) => +b.year - +a.year);

    return { postsByYear };
  },
  component: () => {
    const { postsByYear } = Route.useLoaderData();
    return <Posts postsByYear={postsByYear} />;
  },
});

function Posts({ postsByYear }: { postsByYear: TPostsByYear[] }) {
  return (
    <div className="max-w-xl mx-auto flex flex-col space-y-16 pt-10">
      {postsByYear.map(({ year, posts }) => (
        <div key={year} className="px-1 flex flex-col space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary">
            {year}
          </h2>
          <Separator className="mb-4" />
          <PostList posts={posts} />
        </div>
      ))}
      <div className="flex flex-col space-y-10 pb-10 md:items-center">
        <Separator />
        <Link to="/story">
          <Button variant="link">About Me</Button>
        </Link>
      </div>
    </div>
  );
}
