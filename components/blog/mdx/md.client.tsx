import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prose } from "../custom/prose";
export function Markdown({ content }: { content: string }) {
  return (
    <Prose>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Prose>
  );
}
