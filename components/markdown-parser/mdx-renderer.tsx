"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { CodeBlock } from "./code-block";
import Link from "next/link";
import { postComponents } from "@/components/markdown-parser/post-components";
import { Tweet } from "react-tweet";
import Image from "next/image";

const components = {
  // Preserve existing styling for elements
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal" {...props}>
      {children}
    </ol>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-outside" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li className="" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: any) => (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  ),
  a: ({ href, children, ...props }: any) => (
    <Link
      href={href}
      className="text-blue-500 hover:underline"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  ),
  h1: ({ children, ...props }: any) => (
    <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: any) => (
    <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: any) => (
    <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: any) => (
    <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
      {children}
    </h6>
  ),
  ...postComponents,
  Tweet: (props: any) => (
    <div className="flex flex-col items-center">
      <Tweet {...props} />
    </div>
  ),
  Image: (props: any) => (
    <Image {...props} className="rounded shadow mx-auto" />
  ),
};

interface MDXContentProps {
  source: MDXRemoteSerializeResult;
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-lg">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
