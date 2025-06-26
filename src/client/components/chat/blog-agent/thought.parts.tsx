import type {
  FileUIPart,
  ReasoningUIPart,
  SourceUIPart,
  StepStartUIPart,
  TextUIPart,
  ToolInvocationUIPart,
} from "@ai-sdk/ui-utils";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { ChatMarkdown } from "./chat.markdown";
import { useAgentStore } from "./agent.store";
import { cn } from "~/client/lib/utils";
import { Separator } from "../../ui/separator";
export function ThinkingTopic({ topic }: { topic: string }) {
  return (
    <div className="mb-3 p-3 bg-card rounded-md border border-border">
      <div className="text-xs font-medium text-muted-foreground mb-1">
        Considering:
      </div>
      <div className="text-sm text-card-foreground italic">"{topic}"</div>
    </div>
  );
}

export function extractDisplayContent(result: unknown): string {
  if (!result) return "";

  if (typeof result === "object" && result !== null) {
    const obj = result as Record<string, any>;
    if (obj.text) return obj.text;
    if (obj.content) return obj.content;
    if (obj.message) return obj.message;

    try {
      return JSON.stringify(result, null, 2);
    } catch {
      return "[Object]";
    }
  }

  if (typeof result === "string") return result;
  if (typeof result === "number" || typeof result === "boolean")
    return String(result);
  return "[Complex Object]";
}

export function StepStartPart({ part }: { part: StepStartUIPart }) {
  const isStreaming = useAgentStore((state) => state.isStreaming);
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
      <div
        className={cn(
          "w-2 h-2 bg-primary rounded-full",
          isStreaming && "animate-pulse",
        )}
      ></div>
      <Separator />
    </div>
  );
}

export function ToolInvocationPart({ part }: { part: ToolInvocationUIPart }) {
  const { toolInvocation } = part;
  const { toolName, args } = toolInvocation;
  const result =
    toolInvocation.state === "result" ? toolInvocation.result : null;
  const displayContent = extractDisplayContent(result);
  const thinkingTopic = args?.topicToThinkAbout;

  const title = toolName === "reflectionTool" ? "Reflecting" : "Processing";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {thinkingTopic && <ThinkingTopic topic={thinkingTopic} />}
        <ChatMarkdown markdown={displayContent} />
      </CardContent>
    </Card>
  );
}
export function TextPart({ part }: { part: TextUIPart }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Response</CardTitle>
      </CardHeader>
      <CardContent>
        <ChatMarkdown markdown={part.text} />
      </CardContent>
    </Card>
  );
}

export function ReasoningPart({ part }: { part: ReasoningUIPart }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Reasoning</CardTitle>
      </CardHeader>
      <CardContent>
        <ChatMarkdown markdown={part.reasoning} />
      </CardContent>
    </Card>
  );
}

export function SourcePart({ part }: { part: SourceUIPart }) {
  return (
    <div className="w-full">
      <ChatMarkdown markdown={JSON.stringify(part.source, null, 2)} />
    </div>
  );
}

export function FilePart({ part }: { part: FileUIPart }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>File</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground mb-2">
          Type: {part.mimeType}
        </div>
        <ChatMarkdown markdown={part.data} className="wrap-anywhere" />
      </CardContent>
    </Card>
  );
}

export function DefaultPart({ partType }: { partType?: string }) {
  return (
    <div className="text-xs text-muted-foreground italic">
      {partType ? `Unknown part type: ${partType}` : "Processing step..."}
    </div>
  );
}
