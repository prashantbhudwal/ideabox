import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

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
  return (
    <article>
      <h1>{post.metadata.title}</h1>
      <p>{post.metadata.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}
