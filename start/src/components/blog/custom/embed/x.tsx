import { cn } from "~/lib/utils";
import { Tweet } from "react-tweet";

export function PostEmbed_X({
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
}
