import { JSX } from "react";
import { cn } from "~/client/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Prose(props: {
  className?: string;
  type: "markdown";
  content: string;
}): JSX.Element;
export function Prose(props: {
  className?: string;
  type: "wrapper";
  children: React.ReactNode;
}): JSX.Element;
export function Prose({
  className,
  type = "wrapper",
  children,
  content,
}: {
  className?: string;
  type: "wrapper" | "markdown";
  children?: React.ReactNode;
  content?: string;
}): JSX.Element {
  return (
    <div
      className={cn(
        `prose dark:prose-invert prose-p:leading-relaxed prose-pre:p-0`,
        `wrap-break-words`,
        className,
      )}
    >
      {type === "markdown" ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      ) : (
        children
      )}
    </div>
  );
}
