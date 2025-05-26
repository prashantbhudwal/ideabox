"use client";

import { memo } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXContent } from "./mdx-renderer";

interface MarkdownProps {
  mdxSource: MDXRemoteSerializeResult;
}

const NonMemoizedMarkdown = ({ mdxSource }: MarkdownProps) => {
  return <MDXContent source={mdxSource} />;
};

export const Mdx = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.mdxSource === nextProps.mdxSource,
);
