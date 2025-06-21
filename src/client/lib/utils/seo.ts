import { C } from "~/common/constants";
export const seo = ({
  title,
  description,
  keywords,
  image,
  type = "website",
  imageType = "image/png",
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
  type?: "website" | "article";
  imageType?: "image/webp" | "image/png" | "image/jpeg";
}) => {
  const tags = [
    // Basic
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },

    // Twitter
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: C.xHandle },
    { name: "twitter:site", content: C.xHandle },

    // OpenGraph / Article (must use `property` for FB & LinkedIn)
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "article:author", content: C.firstName },
    { property: "og:url", content: C.base },
    { property: "og:site_name", content: "ashant.in" },
    { property: "og:locale", content: "en_US" },

    // Robots directives
    { name: "robots", content: "index,follow" },
    {
      name: "googlebot",
      content:
        "index,follow,max-video-preview:-1,max-image-preview:large,max-snippet:-1",
    },

    // Social image (adds only if `image` provided)
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { property: "og:image", content: image },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { property: "og:image:alt", content: title },
          { property: "og:image:type", content: imageType },
        ]
      : []),
  ];

  return tags;
};
