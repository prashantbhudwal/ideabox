import { Image, type SimpleImageProps } from "~/client/components/image";
import { mdxComponents } from "./post-components";
import { Link } from "@tanstack/react-router";
import loadable from "@loadable/component";

const CodeBlock = loadable(
  () =>
    import("../custom/code-block").then((mod) => ({ default: mod.CodeBlock })),
  {
    ssr: false,
    fallback: <div>Loading...</div>,
  },
);

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
      className="text-foreground decoration-primary font-semibold underline-offset-1 hover:underline"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      {...props}
    >
      {children}
    </Link>
  ),
  h1: ({ children, ...props }: { children: React.ReactNode }) => (
    <h1 className="mt-6 mb-2 text-3xl font-semibold" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: { children: React.ReactNode }) => (
    <h2 className="mt-6 mb-2 text-2xl font-semibold" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: { children: React.ReactNode }) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: { children: React.ReactNode }) => (
    <h4 className="mt-6 mb-2 text-lg font-semibold" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: { children: React.ReactNode }) => (
    <h5 className="mt-6 mb-2 text-base font-semibold" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: { children: React.ReactNode }) => (
    <h6 className="mt-6 mb-2 text-sm font-semibold" {...props}>
      {children}
    </h6>
  ),
  Image: (props: SimpleImageProps) => (
    <Image {...props} className="mx-auto rounded shadow" />
  ),
  ...mdxComponents,
};
