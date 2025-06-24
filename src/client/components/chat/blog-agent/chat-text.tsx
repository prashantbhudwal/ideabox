import { Prose } from "../../blog/custom/prose.v2";

export function ChatMarkdown({
  markdown,
  className,
}: {
  markdown: string;
  className?: string;
}) {
  return <Prose content={markdown} type="markdown" className={className} />;
}
