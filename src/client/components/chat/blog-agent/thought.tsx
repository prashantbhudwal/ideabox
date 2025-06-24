import type { UIMessage } from "ai";
import { JsonViewer } from "../../json-viewer";
import {
  StepStartPart,
  ToolInvocationPart,
  TextPart,
  ReasoningPart,
  SourcePart,
  FilePart,
  DefaultPart,
} from "./thought.parts";
import { isDev } from "~/client/lib/utils/isDev";

type TMessagePart = UIMessage["parts"][number];

export function MessagePart({ part }: { part: TMessagePart }) {
  switch (part.type) {
    case "step-start":
      return <StepStartPart part={part} />;
    case "tool-invocation":
      return <ToolInvocationPart part={part} />;
    case "text":
      return;
    case "reasoning":
      return <ReasoningPart part={part} />;
    case "source":
      return <SourcePart part={part} />;
    case "file":
      return <FilePart part={part} />;
    default: {
      // This handles any part types that are not explicitly handled above.
      // It's a good practice for robust UI rendering.
      const unknownPart = part as { type: string };
      return <DefaultPart partType={unknownPart.type} />;
    }
  }
}

export function Thought({ messageParts }: { messageParts: TMessagePart[] }) {
  return (
    <div className="space-y-2 w-full">
      {isDev && (
        <details className="mb-4">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            Raw Data (Debug)
          </summary>
          <div className="mt-2 p-2 bg-muted rounded text-xs">
            <JsonViewer src={messageParts} />
          </div>
        </details>
      )}
      <div className="space-y-2">
        {messageParts.map((part, index) => (
          <MessagePart key={index} part={part} />
        ))}
      </div>
    </div>
  );
}
