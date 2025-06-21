// // A wrapper component for img

// export function Image({
//   src,
//   alt,
//   className,
//   width,
//   height,
// }: {
//   src: string;
//   alt: string;
//   width: number;
//   height: number;
//   className?: string;
// }) {
//   return (
//     <img
//       src={src}
//       alt={alt}
//       className={className}
//       width={width}
//       height={height}
//     />
//   );
// }

// simple-image.tsx
import React, { useMemo, useState } from "react";

export type StaticRequire = { default: StaticImageData };
export interface StaticImageData {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

type PlaceholderValue = "blur" | "empty";

export interface SimpleImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    "src" | "width" | "height"
  > {
  /** URL string or static import  */
  src: string | StaticRequire | StaticImageData;
  /** Intrinsic dimensions (ignored when `fill` is true) */
  width?: number;
  height?: number;
  /** Make the image fill its parent (position: absolute) */
  fill?: boolean;
  /** <img sizes> attr – forwarded unchanged */
  sizes?: string;
  /** Preload the image (maps to loading="eager") */
  priority?: boolean;
  /** Blur-up placeholder behaviour */
  placeholder?: PlaceholderValue;
  blurDataURL?: string;
  /** Ignored – exists only to keep parity with next/image */
  quality?: number;
  /** Ignored – parity flag */
  unoptimized?: true;
}

/* -------------------------------------------------
   Component
-------------------------------------------------- */
export const Image: React.FC<SimpleImageProps> = ({
  src,
  width,
  height,
  fill = false,
  sizes,
  priority,
  placeholder = "empty",
  blurDataURL,
  style,
  className,
  onLoad,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  /** Resolve <StaticImageData | string> into a uniform object */
  const resolved = useMemo(() => {
    if (typeof src === "string") {
      return { url: src, w: width, h: height, blur: blurDataURL };
    }
    const data: StaticImageData = "default" in src ? src.default : src;
    return {
      url: data.src,
      w: width ?? data.width,
      h: height ?? data.height,
      blur: blurDataURL ?? data.blurDataURL,
    };
  }, [src, width, height, blurDataURL]);

  /* ------- styles that mimic next/image -------- */
  const computedStyle: React.CSSProperties = {
    ...style,
    ...(fill && {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: style?.objectFit ?? "cover",
    }),
    ...(placeholder === "blur" &&
      !loaded && {
        filter: "blur(20px)",
        backgroundSize: "cover",
        backgroundImage: resolved.blur ? `url("${resolved.blur}")` : undefined,
      }),
  };

  /* --------------------------------------------- */
  return (
    <img
      {...rest}
      src={resolved.url}
      width={fill ? undefined : resolved.w}
      height={fill ? undefined : resolved.h}
      sizes={sizes}
      loading={priority ? "eager" : (rest.loading ?? "lazy")}
      style={computedStyle}
      className={className}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      alt={rest.alt ?? ""}
    />
  );
};
