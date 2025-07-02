import { cn } from "~/client/lib/utils";
import loadable from "@loadable/component";

const InstagramEmbed = loadable(
  () =>
    import("react-social-media-embed").then((mod) => ({
      default: mod.InstagramEmbed,
    })),
  {
    ssr: false,
  },
);

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
