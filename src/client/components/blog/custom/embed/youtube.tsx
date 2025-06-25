import { cn } from "~/client/lib/utils";

function getYouTubeId(url: string): string | null {
  // Handle youtu.be format
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtuBeMatch) {
    return youtuBeMatch[1];
  }

  // Handle youtube.com/watch format
  const youtubeMatch = url.match(
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  );
  if (youtubeMatch) {
    return youtubeMatch[1];
  }

  // Handle youtube.com/embed format
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) {
    return embedMatch[1];
  }

  return null;
}

export function PostEmbed_Youtube({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  const videoId = getYouTubeId(href);

  if (!videoId) {
    return <div className="text-red-500">Invalid YouTube URL</div>;
  }

  return (
    <div className={cn("py-2 aspect-video mx-auto", className)}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        width="90%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="mx-auto rounded-lg"
        loading="lazy"
        title="YouTube video player"
      />
    </div>
  );
}
