import { createFileRoute } from "@tanstack/react-router";
import PostList from "~/components/blog/post-list";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { getWeekOfLife } from "~/lib/date";
import { seo } from "~/utils/seo";
import { C } from "~/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

export const Route = createFileRoute("/")({
  head: () => {
    return {
      title: "prashant",
      meta: seo({
        title: "prashant",
        description: `Notes on the world, software and life. Week ${getWeekOfLife()}.`,
        keywords: "prashant, blog, notes, software, life",
        image: `${C.base}/og-image-home.webp`,
      }),
      links: [
        { rel: "canonical", href: "/" },

        {
          rel: "alternate",
          type: "application/rss+xml",
          href: `${C.base}/api/feed`,
        },
      ],
    };
  },
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.post.getAll.queryOptions(),
    );
  },

  component: HomePage,
});

function HomePage() {
  const trpc = useTRPC();
  const { data: posts } = useQuery(trpc.post.getAll.queryOptions());

  if (!posts) {
    return null;
  }

  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const byYear = sorted.reduce<Record<string, typeof posts>>((acc, post) => {
    const y = new Date(post.createdAt).getFullYear().toString();
    (acc[y] ||= []).push(post);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => +b - +a);

  return (
    <div className="max-w-xl mx-auto flex flex-col space-y-16 pt-10">
      {years.map((year) => (
        <div key={year} className="px-1 flex flex-col space-y-6">
          <h2 className="text-3xl md:text-4xl font-semibold text-primary">
            {year}
          </h2>
          <Separator className="mb-4" />
          <PostList posts={byYear[year]} />
        </div>
      ))}
      <div className="flex flex-col space-y-10 pb-10 md:items-center">
        <Separator />
        <a href="/story">
          <Button variant="link">About Me</Button>
        </a>
      </div>
    </div>
  );
}
