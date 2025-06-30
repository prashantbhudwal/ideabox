import { createFileRoute } from "@tanstack/react-router";
import { PostFooter } from "~/client/components/blog/post-footer";
import { RecommendedPosts } from "~/client/components/blog/recommended-posts";
import { Post } from "~/client/components/blog/post";
import { type TPost } from "~/common/types/content.types";
import { seo } from "~/client/lib/utils/seo";
import { C } from "~/common/constants";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getPostBySlug } from "~/server/modules/post/get-post-by-slug";

const getPostServerFn = createServerFn({ type: "static" })
  .validator(
    z.object({
      slug: z.string(),
    }),
  )
  .handler(async ({ data: { slug } }) => {
    console.log("🔥 STATIC SERVER FUNCTION CALLED AT BUILD TIME");
    const post = await getPostBySlug(slug);
    return post;
  });

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const post = await getPostServerFn({
      data: { slug: params.slug },
    });

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
    </div>
  );
}
