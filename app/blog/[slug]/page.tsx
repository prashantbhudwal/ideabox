import { getPostBySlug } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Article } from "./article";
import { serializeMdx } from "@/lib/mdx";

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
