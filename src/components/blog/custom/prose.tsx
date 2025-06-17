import { cn } from "~/lib/utils";

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
        "prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-lg",
        className,
      )}
    >
      {children}
    </div>
  );
}
