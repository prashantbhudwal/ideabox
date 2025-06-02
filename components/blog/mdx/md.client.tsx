import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      className="inline prose dark:prose-invert"
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
}
