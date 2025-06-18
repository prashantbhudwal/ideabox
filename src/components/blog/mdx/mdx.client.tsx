import { useMDXComponent } from "@content-collections/mdx/react";
import { components } from "./components";
import { Prose } from "../custom/prose";

export function Mdx({ mdxCode }: { mdxCode: string }) {
  const Component = useMDXComponent(mdxCode);

  return (
    <Prose>
      <Component components={components} />
    </Prose>
  );
}
