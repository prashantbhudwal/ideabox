import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Alert } from "../../ui/alert";
import { MDocument } from "@mastra/rag";
import { createServerFn } from "@tanstack/react-start";
import { Card, CardHeader, CardContent } from "../../ui/card";
import { cn } from "~/client/lib/utils";
import { ScrollArea } from "../../ui/scroll-area";

export const ChunkerSpace = () => {
  return <Chunker />;
};

const formSchema = z.object({
  text: z.string().min(10, "Text must be at least 10 characters long."),
  chunkSize: z.coerce
    .number()
    .positive("Chunk size must be a positive number."),
});

type FormValues = z.infer<typeof formSchema>;

const chunkTextServerFn = createServerFn({
  method: "POST",
})
  .validator(formSchema)
  .type("dynamic")
  .handler(async ({ data }) => {
    const { text, chunkSize } = data;
    if (!text.trim() || chunkSize <= 0) {
      return [];
    }
    const docFromText = MDocument.fromText(text);
    const chunks = await docFromText.chunk({
      strategy: "token",
      size: chunkSize,
      overlap: 50,
    });
    return chunks.map((chunk) => chunk.text);
  });

function Chunker() {
  const [copiedChunkIndices, setCopiedChunkIndices] = useState<number[]>([]);
  const queryClient = new QueryClient();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      chunkSize: 22000,
    },
  });

  const {
    data: chunks = [],
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["chunker", form.watch("text"), form.watch("chunkSize")],
    queryFn: () => chunkTextServerFn({ data: form.getValues() }),
    enabled: false,
    retry: 2,
  });

  const handleChunk = () => {
    queryClient.setQueryData(
      ["chunker", form.getValues().text, form.getValues().chunkSize],
      [],
    );
    setCopiedChunkIndices([]);
    refetch();
  };

  const copyChunk = (chunk: string, index: number) => {
    navigator.clipboard.writeText(chunk);
    setCopiedChunkIndices((prev) => [...new Set([...prev, index])]);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10 p-4">
      <div className="space-y-2">
        <p className="text-secondary-foreground">
          Split text into easily digestible chunks for LLMs.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChunk)} className="space-y-8">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter your text here"
                    className="h-[150px] w-full resize-none scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chunkSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chunk Size</FormLabel>
                <FormControl>
                  <Input {...field} type="number" placeholder="e.g., 512" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isFetching}
          >
            {isFetching ? "Processing..." : "Chunk Text"}
          </Button>
        </form>
      </Form>

      {error && (
        <Alert variant="destructive" className="mt-4">
          {error instanceof Error
            ? error.message
            : "An error occurred while chunking the text"}
        </Alert>
      )}

      {chunks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Chunks ({chunks.length})</h2>
          <div className="space-y-3">
            {chunks.map((chunk, index) => {
              const isCopied = copiedChunkIndices.includes(index);
              return (
                <Card
                  className={cn(
                    "bg-muted flex h-64 flex-col",
                    isCopied && "bg-muted/50",
                    isCopied && "border-muted/50",
                  )}
                  key={index}
                >
                  <CardHeader className="flex flex-row items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Chunk {index + 1}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyChunk(chunk, index)}
                      className="min-w-[80px]"
                      disabled={isCopied}
                    >
                      {isCopied ? "Copied!" : "Copy"}
                    </Button>
                  </CardHeader>
                  <CardContent className="min-h-0 flex-grow">
                    <ScrollArea className="h-full w-full">
                      <p
                        className={`text-sm break-words whitespace-pre-wrap ${
                          isCopied ? "text-green-600 dark:text-green-400" : ""
                        }`}
                      >
                        {chunk}
                      </p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
