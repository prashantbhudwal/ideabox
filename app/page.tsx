import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/blog/post-list";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function currentWeekOfLife(
  birthYear: number = 1993,
  birthMonth: number = 2, // March (0-indexed: 0 = January)
  birthDay: number = 1,
): number {
  // Create the birth date
  const birthDate = new Date(birthYear, birthMonth, birthDay);
  const today = new Date();

  // Check if the birth date is in the future
  if (today < birthDate) {
    throw new Error("Your birth date is in the future!");
  }

  // Calculate the difference in milliseconds
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffMs = today.getTime() - birthDate.getTime();

  // Calculate the number of days elapsed since birth
  const daysElapsed = Math.floor(diffMs / msPerDay);

  // Compute the week of life:
  // Each week has 7 days. The integer division of the elapsed days by 7
  // plus one (to count the first week as week 1) gives the current week number.
  const weekNumber = Math.floor(daysElapsed / 7) + 1;

  return weekNumber;
}

export async function generateMetadata(): Promise<Metadata> {
  const week = currentWeekOfLife();
  const baseUrl = "https://www.ashant.in";

  return {
    title: `prashant`,
    description: `Notes on the world, software and life. Week ${week}.`,
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
      description: `Notes on the world, software and life. Week ${week}.`,
      url: baseUrl,
      siteName: "ashant.in",
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "prashant",
      description: `Notes on the world, software and life. Week ${week}.`,
    },
  };
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  // Sort posts by date in descending order
  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
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
    {},
  );

  return (
    <div className="max-w-xl mx-auto flex flex-col space-y-16 pt-10">
      <div className="flex flex-col space-y-24 ">
        {Object.keys(postsByYear)
          .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
          .map((year) => (
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
        <Link href={"/story"}>
          <Button variant={"link"}>About Me</Button>
        </Link>
      </div>
    </div>
  );
}
