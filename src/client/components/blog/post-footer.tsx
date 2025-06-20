import { link } from "~/client/lib/link";
import { C } from "~/common/constants";
import { Separator } from "~/client/components/ui/separator";
import { Button } from "~/client/components/ui/button";
import { Link } from "@tanstack/react-router";

export const PostFooter = ({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) => {
  const postUrl = link.url.internal.post({ slug });
  const tweetText = `\n\nRead "${title}" by ${C.xHandle}\n${postUrl}`;
  const whatsAppText = `\n\nRead "${title}" by ${C.firstName}\n${postUrl}`;
  return (
    <>
      <Separator className="mb-4" />
      <SupportMe />
      <div className="font-sm mt-8 flex space-x-4 space-y-2 text-neutral-600 md:flex-row dark:text-neutral-300 flex-col text-center">
        <Link
          to={
            `https://github.com/prashantbhudwal/ideabox/edit/main/content/posts/` +
            slug +
            `/` +
            slug +
            ".mdx"
          }
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Improve on Github
        </Link>
        <Link
          to={
            "https://x.com/intent/tweet?text=" + encodeURIComponent(tweetText)
          }
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on X
        </Link>
        <Link
          to={"https://wa.me/?text=" + encodeURIComponent(whatsAppText)}
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Share on WhatsApp
        </Link>
      </div>
    </>
  );
};

const SupportMe = () => {
  return (
    <div className="flex flex-col space-y-4 items-center">
      <Button size={"lg"}>
        <Link to={link.url.external.authorProfile.buyMeACoffee}>Pay ₹100</Link>
      </Button>
      <div className="text-muted-foreground text-sm font-semibold max-w-xs md:max-w-prose text-center">
        Support my writing by paying for this post
      </div>
    </div>
  );
};
