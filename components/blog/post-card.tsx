import Link from "next/link";
import { TPost } from "@/lib/types/content.types";
import { link } from "@/lib/link";
import { BsStars } from "react-icons/bs";
import { cn } from "@/lib/utils";

export function PostCard({
  post,
  isSimilar = false,
}: {
  post: TPost;
  isSimilar?: boolean;
}) {
  return (
    <Link href={link.path.post({ slug: post.slug })} prefetch>
      <div className="flex flex-col group">
        <h3
          className={cn(
            "text-xl font-bold text-foreground/80 md:text-xl md:font-bold md:mb-1 mb-2 group-hover:text-slate-100 transition duration-400 max-w-lg flex items-center gap-1",
            isSimilar && "text-foreground",
          )}
        >
          {post.title}
        </h3>
        <time className="text-sm text-muted-foreground md:text-base group-hover:text-slate-200 transition duration-400">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </div>
    </Link>
  );
}
