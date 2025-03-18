import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/post-list";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

function currentWeekOfLife(
  birthYear: number = 1993,
  birthMonth: number = 2, // March (0-indexed: 0 = January)
  birthDay: number = 1
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

  return {
    title: `prashant`,
    description: `Notes on the world, software and life. Week ${week}.`,
  };
}

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
    <div className="px-1 flex flex-col space-y-16">
      {Object.keys(postsByYear)
        .sort((a, b) => parseInt(b) - parseInt(a)) // Sort years in descending order
        .map((year) => (
          <div key={year}>
            <h2 className="text-2xl font-semibold pb-2 text-primary">{year}</h2>
            <Separator className="mb-4" />
            <PostList posts={postsByYear[year]} />
          </div>
        ))}
    </div>
  );
}
