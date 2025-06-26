import { memo } from "react";
import { Prose } from "../../blog/custom/prose.v2";

export const ChatMarkdown = memo(function ({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return <Prose content={markdown} type="markdown" className={className} />;
});
