import { cn } from "~/client/lib/utils";
import { Tweet } from "react-tweet";
import { ClientOnly } from "@tanstack/react-router";

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
