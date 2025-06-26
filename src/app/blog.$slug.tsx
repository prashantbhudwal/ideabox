import { createFileRoute } from "@tanstack/react-router";
import { PostFooter } from "~/client/components/blog/post-footer";
import { RecommendedPosts } from "~/client/components/blog/recommended-posts";
import { SelectionToolbar } from "~/client/components/pill";
import { Post } from "~/client/components/blog/post";
import { type TPost } from "~/common/types/content.types";
import { seo } from "~/client/lib/utils/seo";
import { C } from "~/common/constants";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ params, context: { trpc, queryClient } }) => {
    const test = trpc.post.getBySlug.queryOptions({
      slug: params.slug,
    });
    const post = await queryClient.fetchQuery(test);

    if (!post) {
      throw new Error("Post not found");
    }
    const { _meta, mdx, ...postWithoutMeta } = post;
    return {
      post: { ...postWithoutMeta } as TPost,
      mdx,
    };
  },
  head: ({ params, loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      throw new Error("Post not found");
    }
    const imagePath = post.heroImage
      ? `${C.base}blog/${params.slug}/${post.heroImage}.webp`
      : "";
    return {
      title: post.title,
      meta: seo({
        title: post.title,
        description: post.description,
        keywords: post.tags.join(", "),
        image: imagePath,
        type: "article",
        imageType: "image/webp",
      }),
      links: [{ rel: "canonical", href: `${C.base}blog/${post.slug}` }],
    };
  },
});

function RouteComponent() {
  const { post, mdx } = Route.useLoaderData();
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className="flex flex-col items-center gap-8">
      <Post mdxCode={mdx} post={post} />
      <RecommendedPosts currentPostId={post.id} />
      <PostFooter slug={post.slug} title={post.title} />
      <SelectionToolbar />
    </div>
  );
}
