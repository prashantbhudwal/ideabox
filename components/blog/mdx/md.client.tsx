import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prose } from "../custom/prose";
export function Markdown({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <Prose className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  );
}
