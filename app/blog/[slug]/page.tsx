import { server } from "@/server/routers";
import { notFound } from "next/navigation";
import { Post } from "../../../components/blog/post";
import { serializeMdx } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";
import { PostFooter } from "../../../components/blog/post-footer";
import { RecommendedPosts } from "@/components/blog/recommended-posts";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await server.post.getBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.metadata.title;
  const description = post.metadata.description
    ? post.metadata.description
    : "by prashant";
  const imagePath = post.metadata.heroImage
    ? "/blog/" + slug + "/" + post.metadata.heroImage + ".webp"
    : "";
  console.log(imagePath);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.metadata.date,
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
  const slugs = await server.post.getSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const post = await server.post.getBySlug(slug);
  const mdxSource = await serializeMdx(post.content);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Post post={post} mdxSource={mdxSource} />
      <RecommendedPosts currentPost={post} />
      <PostFooter slug={post.slug} metadata={post.metadata} />
    </div>
  );
}
