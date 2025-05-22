import { TPostMetadata } from "@/types/post";
import { url, xHandle } from "@/app/url";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const PostFooter = ({
  slug,
  metadata,
}: {
  slug: string;
  metadata: TPostMetadata;
}) => {
  const postUrl = url.share.post({ slug });
  const tweetText = `\n\nRead "${metadata.title}" by ${xHandle}\n${postUrl}`;
  const whatsAppText = `\n\nRead "${metadata.title}" by prashant \n${postUrl}`;
  return (
    <>
      <Separator className="mb-4" />
      <SupportMe />
      <div className="font-sm mt-8 flex space-x-4 space-y-2 text-neutral-600 md:flex-row dark:text-neutral-300 flex-col text-center">
        <Link
          href={
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
          href={`https://x.com/intent/tweet?text=${encodeURIComponent(
            tweetText,
          )}`}
          className="pb-6 underline underline-offset-2 text-muted-foreground/50 font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on X
        </Link>
        <Link
          href={`https://wa.me/?text=${encodeURIComponent(whatsAppText)}`}
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
        <Link href={"https://buymeacoffee.com/ashant"}>Pay ₹100</Link>
      </Button>
      <div className="text-muted-foreground text-sm font-semibold max-w-xs md:max-w-prose text-center">
        Support my writing by paying for this post
      </div>
    </div>
  );
};
