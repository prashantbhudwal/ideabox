import { createFileRoute } from "@tanstack/react-router";
import { PostFooter } from "~/components/blog/post-footer";
import { RecommendedPosts } from "~/components/blog/recommended-posts";
import { SelectionToolbar } from "~/components/pill";
import { Post } from "~/components/blog/post";
import { allPosts } from "content-collections";
import { TPost } from "~/lib/types/content.types";
import { Chat } from "~/components/chat/blog-agent/chat";
import { seo } from "~/utils/seo";
import { C } from "~/lib/constants";

export const Route = createFileRoute("/blog/$slug")({
  component: RouteComponent,

  beforeLoad: () => ({
    allPosts,
  }),
  loader: async ({ params, context: { allPosts } }) => {
    const slug = params.slug;
    const post = allPosts.find((post) => post.slug === slug);
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
      links: [{ rel: "canonical", href: `${C.base}/blog/${post.slug}` }],
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
      <Chat post={post} />
      <Post mdxCode={mdx} post={post} />
      <RecommendedPosts currentPostId={post.id} />
      <PostFooter slug={post.slug} title={post.title} />
      <SelectionToolbar />
    </div>
  );
}
