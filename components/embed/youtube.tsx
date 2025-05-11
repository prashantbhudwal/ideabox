import { cn } from "@/lib/utils";
import { YouTubeEmbed } from "react-social-media-embed";

export function PostEmbed_Youtube({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <YouTubeEmbed
      url={href}
      width={"90%"}
      className={cn("mx-auto py-2", className)}
    />
  );
}
