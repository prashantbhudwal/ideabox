import { cn } from "~/lib/utils";
import { InstagramEmbed } from "react-social-media-embed";

export function PostEmbed_Instagram({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <InstagramEmbed
      url={href}
      width={"90%"}
      className={cn("mx-auto py-2", className)}
    />
  );
}
