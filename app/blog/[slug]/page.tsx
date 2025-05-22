import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Article } from "./article";
import { serializeMdx } from "@/lib/mdx";
import { Metadata, ResolvingMetadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { url, xHandle } from "@/app/url";
import { Button } from "@/components/ui/button";
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

  const postUrl = url.share.post({ slug: slug });
  const tweetText = `\n\nRead "${post.metadata.title}" by ${xHandle}\n${postUrl}`;
  const whatsAppText = `\n\nRead "${post.metadata.title}" by prashant \n${postUrl}`;

  return (
    <div className="md:flex md:flex-col items-center">
      <Article post={{ ...post, mdxSource }} />{" "}
      <div className="flex flex-col space-y-2 items-center mb-4">
        <Button className="rounded-3xl" size={"lg"}>
          <Link href={"https://buymeacoffee.com/ashant"}>
            Pay for this Post
          </Link>
        </Button>
        <div className="text-muted-foreground text-sm">
          Support my writing with a small, one-time donation
        </div>
      </div>
      <Separator className="mb-4" />
      <div className="font-sm mt-8 flex space-x-4 space-y-2 text-neutral-600 md:flex-row dark:text-neutral-300 flex-col text-center">
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
        <Link
          href={`https://wa.me/?text=${encodeURIComponent(whatsAppText)}`}
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on WhatsApp
        </Link>
      </div>
    </div>
  );
}
