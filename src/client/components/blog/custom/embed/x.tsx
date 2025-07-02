import { cn } from "~/client/lib/utils";
import { ClientOnly } from "@tanstack/react-router";
import loadable from "@loadable/component";

const Tweet = loadable(
  () => import("react-tweet").then((mod) => ({ default: mod.Tweet })),
  {
    ssr: false,
  },
);

export function PostEmbed_X({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <ClientOnly fallback={<div>loading</div>}>
      <Component id={id} className={className} />
    </ClientOnly>
  );
}

const Component = function ({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <Tweet id={id} />
    </div>
  );
};
