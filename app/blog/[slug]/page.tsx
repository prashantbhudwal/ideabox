import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Article } from "./article";
import { serializeMdx } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { url, xHandle } from "@/app/url";
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

async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const mdxSource = await serializeMdx(post.content);

  const postUrl = url.blog({ slug: slug });
  const tweetText = `\n\n${post.metadata.title} by ${xHandle}\n${postUrl}`;

  return (
    <div className="md:flex md:flex-col items-center">
      <Article post={{ ...post, mdxSource }} />
      <Separator className="mb-4" />
      <div className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <Link
          href={
            `https://github.com/prashantbhudwal/ideabox/edit/main/content/posts/` +
            slug +
            `/` +
            slug +
            ".mdx"
          }
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Improve on Github
        </Link>
        <Link
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            tweetText,
          )}`}
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on X
        </Link>
      </div>
    </div>
  );
}
