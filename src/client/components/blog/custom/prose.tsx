import { cn } from "~/client/lib/utils";

/**
 * @deprecated Use Prose from prose.v2.tsx instead
 * @description Prose V2 has a in-built markdown parser
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose wrap-break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
