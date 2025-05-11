import { cn } from "@/lib/utils";
import { XEmbed } from "react-social-media-embed";

export function PostEmbed_X({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <XEmbed
      url={href}
      width={"90%"}
      className={cn("mx-auto py-2", className)}
    />
  );
}
