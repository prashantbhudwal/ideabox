import { type TPost } from "~/common/types/content.types";
import { PostCard } from "./post-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";
import { useTRPC } from "~/client/trpc/react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "~/client/helpers/format-date";

// TODO refactor the logic, looks like a mess
export function RecommendedPosts({ currentPostId }: { currentPostId: string }) {
  const trpc = useTRPC();
  const { data: similarPostIds, isLoading } = useQuery(
    trpc.post.getSimilarPosts.queryOptions({ id: currentPostId }),
  );

  const { data: allPosts, isLoading: allPostsLoading } = useQuery(
    trpc.post.getAll.queryOptions(),
  );

  if (isLoading || allPostsLoading) {
    return <RecommendedPostsLoading />;
  }

  if (!similarPostIds || !allPosts) {
    return null;
  }

  return (
    <RecommendedPostsContent
      similarPostIds={similarPostIds}
      allPosts={allPosts}
    />
  );
}

function RecommendedPostsContent({
  similarPostIds,
  allPosts,
}: {
  similarPostIds: string[];
  allPosts: TPost[];
}) {
  const similarPosts = allPosts.filter((post) =>
    similarPostIds.includes(post.id),
  );

  const threeRandomPosts = allPosts.sort(() => Math.random() - 0.5).slice(0, 3);

  const postToShow =
    similarPosts.length === 0
      ? threeRandomPosts
      : similarPosts.length < 3
        ? [
            ...similarPosts,
            ...threeRandomPosts.slice(0, 3 - similarPosts.length),
          ]
        : similarPosts;

  const postsWithFormattedDate = postToShow.map((post) => {
    return {
      ...post,
      createdAt: formatDate(post.createdAt),
    };
  });

  return (
    <Card className="mb-6 w-full max-w-prose">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 text-primary">
          Keep Reading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10 max-w-11/12 mx-auto">
          {postsWithFormattedDate.map((post) => {
            const isSimilar = similarPosts.some(
              (similarPost) => similarPost.id === post.id,
            );
            return (
              <PostCard post={post} key={post.slug} isSimilar={isSimilar} />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function RecommendedPostsLoading() {
  return (
    <Card className="mb-6 w-full max-w-prose animate-pulse">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 text-primary">
          Keep Reading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10 max-w-11/12 mx-auto">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-48 bg-muted rounded-lg" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
