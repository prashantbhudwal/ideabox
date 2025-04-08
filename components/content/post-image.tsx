import Image from "next/image";

type PostImageVariants = "square" | "landscape" | "portrait";

export function PostImage({
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
      ? { width: 500, height: 500 }
      : variant === "landscape"
        ? { width: 800, height: 600 }
        : { width: 600, height: 750 }; // portrait

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      className="rounded shadow mx-auto object-cover"
    />
  );
}
