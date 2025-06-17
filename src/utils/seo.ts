import { C } from "~/lib/constants";
export const seo = ({
  title,
  description,
  keywords,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
  keywords?: string;
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: C.xHandle },
    { name: "twitter:site", content: C.xHandle },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
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
        ]
      : []),
  ];

  return tags;
};
