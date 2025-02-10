import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { Article } from "./article";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
  return slugs;
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return <Article post={post} />;
}
