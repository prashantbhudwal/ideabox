import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Article } from "./article";
import { serializeMdx } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.metadata.title;
  const description = "by prashant";

  return {
    title,
    description: `Read ${title}`,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.metadata.date,
      authors: "prashant",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// This function generates all possible slug values at build time
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default function Page({ params }: any) {
  return <BlogPost params={params} />;
}

async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const mdxSource = await serializeMdx(post.content);

  return <Article post={{ ...post, mdxSource }} />;
}
