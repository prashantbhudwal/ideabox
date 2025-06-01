import { TPost } from "@/lib/types/content.types";
import { PostCard } from "./post-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { getAllPosts } from "@/server/modules/post/get-all-posts";
import { getSimilarPosts } from "@/server/modules/post/get-similar-posts";

export function RecommendedPosts({ currentPost }: { currentPost: TPost }) {
  return (
    <Suspense fallback={<RecommendedPostsLoading />}>
      <RecommendedPostsContent currentPost={currentPost} />
    </Suspense>
  );
}
async function RecommendedPostsContent({
  currentPost,
}: {
  currentPost: TPost;
}) {
  const allPosts = await getAllPosts();

  const similarPostIds = await getSimilarPosts({ id: currentPost.id });
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

  return (
    <Card className="mb-6 w-full max-w-prose">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 text-primary">
          Keep Reading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10 max-w-11/12 mx-auto">
          {postToShow.map((post) => {
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
