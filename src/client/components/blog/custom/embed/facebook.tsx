import { cn } from "~/client/lib/utils";
import loadable from "@loadable/component";

const FacebookEmbed = loadable(
  () =>
    import("react-social-media-embed").then((mod) => ({
      default: mod.FacebookEmbed,
    })),
  {
    ssr: false,
  },
);

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
