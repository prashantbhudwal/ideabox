export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-lg">
      {children}
    </div>
  );
}
