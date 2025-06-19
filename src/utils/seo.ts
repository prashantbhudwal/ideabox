import { C } from "~/lib/constants";
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
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: C.xHandle },
    { name: "twitter:site", content: C.xHandle },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:type", content: type },
    { name: "article:author", content: C.firstName },
    { name: "og:url", content: C.base },
    { name: "og:site_name", content: "ashant.in" },
    { name: "og:locale", content: "en_US" },
    { name: "robots", content: "index,follow" },
    {
      name: "googlebot",
      content:
        "index,follow,max-video-preview:-1,max-image-preview:large,max-snippet:-1",
    },
    ...(image
      ? [
          { name: "twitter:image", content: image },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "og:image", content: image },
          { name: "og:image:width", content: "1200" },
          { name: "og:image:height", content: "630" },
          { name: "og:image:alt", content: title },
          { name: "og:image:type", content: imageType },
        ]
      : []),
  ];

  return tags;
};
