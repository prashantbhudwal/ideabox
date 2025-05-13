import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";

export function PostEmbed_Youtube({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-2 aspect-video",
        "aspect-video h-64 md:h-1/3 mx-auto",
        className,
      )}
    >
      <ReactPlayer
        src={href}
        width={"90%"}
        height={"100%"}
        className="mx-auto"
      />
    </div>
  );
}
