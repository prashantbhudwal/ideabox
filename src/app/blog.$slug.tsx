import { createFileRoute } from "@tanstack/react-router";
import { PostFooter } from "~/components/blog/post-footer";
import { RecommendedPosts } from "~/components/blog/recommended-posts";
import { SelectionToolbar } from "~/components/pill";
import { Post } from "~/components/blog/post";
import { createServerFn } from "@tanstack/react-start";
import { getPostBySlug } from "~/server/modules/post/get-post-by-slug";
import { processMdxContent } from "~/components/blog/mdx/mdx.server";

const getPosts = createServerFn({
  type: "static",
  method: "GET",
})
  .validator((data: string) => {
    if (typeof data !== "string") {
      throw new Error("Invalid slug");
    }
    return data;
  })
  .handler(async ({ data }) => {
    const post = await getPostBySlug(data);
    const mdxSource = await processMdxContent({ data: post.content });
    return { post, mdxSource };
  });

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getPosts({ data: params.slug });
  },
});

function RouteComponent() {
  console.log("🔴", Route.useLoaderData());
  const { post, mdxSource } = Route.useLoaderData();
  return (
    <div className="flex flex-col items-center gap-8">
      {/* <Chat post={post} /> */}
      <Post post={post} mdxSource={mdxSource} />
      {/* Refactor from rsc to tanstack */}
      {/* <RecommendedPosts currentPost={post} /> */}
      <PostFooter slug={post.slug} title={post.title} />
      <SelectionToolbar />
    </div>
  );
}
