import { TPost } from "@/lib/types/post.types";
import { PostCard } from "./post-card";
import { service } from "@/server/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

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
  const allPosts = await service.post.getAll();

  const threeRandomPosts = allPosts.sort(() => Math.random() - 0.5).slice(0, 3);

  return (
    <Card className="mb-6 w-full max-w-prose">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-4 text-primary">
          Keep Reading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-10 max-w-11/12 mx-auto">
          {threeRandomPosts.map((post) => (
            <PostCard post={post} key={post.slug} />
          ))}
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
