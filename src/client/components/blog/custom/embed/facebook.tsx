import { cn } from "~/client/lib/utils";
import { FacebookEmbed } from "react-social-media-embed";

export function PostEmbed_Facebook({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <FacebookEmbed
      url={href}
      width={"90%"}
      className={cn("mx-auto py-2", className)}
    />
  );
}
