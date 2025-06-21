import { Image, type SimpleImageProps } from "~/client/components/image";
import { postComponents } from "./post-components";
import { CodeBlock } from "../custom/code-block";
import { Link } from "@tanstack/react-router";

export const components = {
  // Preserve existing styling for elements
  pre: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  code: CodeBlock,
  ol: ({ children, ...props }: { children: React.ReactNode }) => (
    <ol className="list-decimal" {...props}>
      {children}
    </ol>
  ),
  ul: ({ children, ...props }: { children: React.ReactNode }) => (
    <ul className="list-outside" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: { children: React.ReactNode }) => (
    <li className="" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: { children: React.ReactNode }) => (
    <span className="font-semibold" {...props}>
      {children}
    </span>
  ),
  a: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <Link
      to={href}
      className="text-foreground hover:underline underline-offset-1 decoration-primary font-semibold"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  ),
  h1: ({ children, ...props }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children: React.ReactNode }) => (
    <h4 className="text-lg font-semibold mt-6 mb-2" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: { children: React.ReactNode }) => (
    <h5 className="text-base font-semibold mt-6 mb-2" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: { children: React.ReactNode }) => (
    <h6 className="text-sm font-semibold mt-6 mb-2" {...props}>
      {children}
    </h6>
  ),
  Image: (props: SimpleImageProps) => (
    <Image {...props} className="rounded shadow mx-auto" />
  ),
  ...postComponents,
};
