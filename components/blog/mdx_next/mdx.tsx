"use client";

import { MDXClient as MDXRemoteClient } from "next-mdx-remote-client";
import type { SerializeResult } from "next-mdx-remote-client/serialize";
import { postComponents } from "../mdx/post-components";
import React from "react";
import { Prose } from "../mdx/prose";
import Image from "next/image";
import Link from "next/link";
import { CodeBlock } from "../mdx/code-block";

type MdxScope = Record<string, unknown>;

interface MdxClientWrapperProps {
  mdxSource: SerializeResult<Record<string, unknown>, MdxScope>;
}

/**
 * A wrapper component for MDXClient that provides all the necessary components
 * for rendering MDX content with proper styling
 */
export function Mdx({ mdxSource }: MdxClientWrapperProps): React.ReactElement {
  // Check if there was an error during MDX compilation
  if ("error" in mdxSource) {
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        <h3 className="font-bold">Error rendering MDX content</h3>
        <p>{String(mdxSource.error)}</p>
      </div>
    );
  }

  // Provide all the components needed for MDX rendering
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
        className="text-foreground hover:underline underline-offset-1 decoration-primary font-semibold"
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
    Image: (props: any) => (
      <Image {...props} className="rounded shadow mx-auto" />
    ),
    ...postComponents,
  };

  // Use error boundary pattern to catch runtime errors
  try {
    return (
      <Prose>
        <MDXRemoteClient
          compiledSource={mdxSource.compiledSource}
          frontmatter={mdxSource.frontmatter}
          scope={mdxSource.scope}
          components={components}
        />
      </Prose>
    );
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        <h3 className="font-bold">Error rendering MDX content</h3>
        <p>{error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}
