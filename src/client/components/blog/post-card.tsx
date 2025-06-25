import { type TPost } from "~/common/types/content.types";
import { cn } from "~/client/lib/utils";
import { link } from "~/client/lib/link";
import { Link } from "@tanstack/react-router";

export function PostCard({
  post,
  isSimilar = false,
}: {
  post: TPost;
  isSimilar?: boolean;
}) {
  return (
    <Link to={link.path.post({ slug: post.slug })}>
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
          {post.createdAt}
        </time>
      </div>
    </Link>
  );
}
