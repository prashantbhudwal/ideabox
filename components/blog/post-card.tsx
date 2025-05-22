import Link from "next/link";
import { TPost } from "@/types/post";
import { url } from "@/app/url";

export function PostCard({ post }: { post: TPost }) {
  return (
    <Link href={url.post({ slug: post.slug })} prefetch>
      <div className="flex flex-col group">
        <h3 className="text-xl font-bold text-foreground/80 md:text-xl md:font-bold md:mb-1 mb-2 group-hover:text-slate-100 transition duration-400 max-w-lg">
          {post.metadata.title}
        </h3>
        <time className="text-sm text-muted-foreground md:text-base group-hover:text-slate-200 transition duration-400">
          {new Date(post.metadata.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </Link>
  );
}
