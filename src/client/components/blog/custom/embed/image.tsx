import { Image } from "~/client/components/image";
import { link } from "~/client/lib/link";

type PostImageVariants = "square" | "landscape" | "portrait";

export function PostEmbed_Image({
  variant,
  src,
  alt,
}: {
  variant: PostImageVariants;
  src: string;
  alt: string;
}) {
  const dimensions =
    variant === "square"
      ? { width: 400, height: 400 }
      : variant === "landscape"
        ? { width: 600, height: 400 }
        : { width: 400, height: 650 }; // portrait

  return (
    <Image
      src={link.path.images.blog({ imgName: src })}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className="rounded shadow mx-auto object-cover"
    />
  );
}
