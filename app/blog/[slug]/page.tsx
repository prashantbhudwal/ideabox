import { notFound } from "next/navigation";
import { Post } from "../../../components/blog/post";
import { Metadata, ResolvingMetadata } from "next";
import { PostFooter } from "../../../components/blog/post-footer";
import { RecommendedPosts } from "@/components/blog/recommended-posts";
import { getAllPosts } from "@/server/modules/post/get-all-posts";
import { getPostBySlug } from "@/server/modules/post/get-post-by-slug";
import { processMdx } from "@/components/blog/mdx/mdx.server";
import { Chat } from "@/components/chat/blog-agent/chat";
// Force static rendering at build time
export const dynamic = "force-static";

// Set revalidation time (optional)
export const revalidate = false;
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.title;
  const description = post.description ? post.description : "by prashant";
  const imagePath = post.heroImage
    ? "/blog/" + slug + "/" + post.heroImage + ".webp"
    : "";
  console.log(imagePath);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.createdAt,
      authors: "prashant",
      images: [imagePath],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imagePath],
      creator: "prashant",
    },
  };
}

// This function generates all possible slug values at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Process MDX content using next-mdx-remote-client
  const mdxSource = await processMdx(post.content);

  return (
    <div className="flex flex-col items-center gap-8">
      <Chat post={post} />
      <Post post={post} mdxSource={mdxSource} />
      <RecommendedPosts currentPost={post} />
      <PostFooter slug={post.slug} title={post.title} />
    </div>
  );
}
