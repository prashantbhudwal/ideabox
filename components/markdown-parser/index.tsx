"use client";

import { memo } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXContent } from "./mdx-renderer";

interface MarkdownProps {
  children: string;
  mdxSource: MDXRemoteSerializeResult;
}

const NonMemoizedMarkdown = ({ children, mdxSource }: MarkdownProps) => {
  return <MDXContent source={mdxSource} />;
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.mdxSource === nextProps.mdxSource
);
