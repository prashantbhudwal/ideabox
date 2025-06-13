import React from "react";
import PostList from "@/components/blog/post-list";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { calculateWeekOfLife } from "@/lib/date";
import { getAllPosts } from "@/server/modules/post/get-all-posts";
import { BlogSearch } from "@/components/search/blog-search";

// Force static rendering at build time
export const dynamic = "force-static";

// Set revalidation time (optional)
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const week = calculateWeekOfLife();
  const baseUrl = "https://www.ashant.in";
  const description = `Notes on the world, software and life. Week ${week}.`;

  return {
    title: "prashant",
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": `${baseUrl}/api/feed`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: "prashant",
      description,
      url: baseUrl,
      siteName: "ashant.in",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "prashant",
      description,
    },
  };
}

interface PostsByYear {
  [year: string]: Awaited<ReturnType<typeof getAllPosts>>;
}

export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getAllPosts();

  // Sort posts by date in descending order
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  // Group posts by year
  const postsByYear = sortedPosts.reduce<PostsByYear>((acc, post) => {
    const year = new Date(post.createdAt).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(post);
    return acc;
  }, {});

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  return (
    <div className="max-w-xl mx-auto flex flex-col space-y-16 pt-10">
      <div className="flex flex-col space-y-24">
        {sortedYears.map((year) => (
          <div key={year} className="px-1 flex flex-col space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-primary">
              {year}
            </h2>
            <Separator className="mb-4" />
            <PostList posts={postsByYear[year]} />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-10 pb-10 md:items-center">
        <Separator />
        <Link href="/story">
          <Button variant="link">About Me</Button>
        </Link>
      </div>
      {/* <BlogSearch /> */}
      <BlogSearch />
    </div>
  );
}
