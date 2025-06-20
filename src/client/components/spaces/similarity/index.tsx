import { Button } from "~/client/components/ui/button";
import { useState } from "react";
import { Input } from "~/client/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/client/components/ui/form";
import { useServerFn } from "@tanstack/react-start";
import { embedAndCompareProd, InputSchema } from "./compare.server";

export function SimilaritySpace() {
  const [similarity, setSimilarity] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const compare = useServerFn(embedAndCompareProd);

  const form = useForm<z.infer<typeof InputSchema>>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      text1: "",
      text2: "",
      apiKey: "",
    },
  });

  async function onSubmit(values: z.infer<typeof InputSchema>) {
    setError(null);
    setIsLoading(true);
    try {
      const result = await compare({ data: values });
      if (result) {
        setSimilarity(result);
      }
    } catch (error: any) {
      console.error("Error in onSubmit:", error);
      setError(error.message || "An error occurred while comparing texts");
      setSimilarity(0);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 pt-12 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">
        Text Similarity Checker
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="text1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Text</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full text-sm border p-4 rounded-lg bg-card min-h-[150px] resize-vertical custom-scrollbar"
                      placeholder="Enter first text here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Second Text</FormLabel>
                  <FormControl>
                    <textarea
                      className="w-full text-sm border p-4 rounded-lg bg-card min-h-[150px] resize-vertical custom-scrollbar"
                      placeholder="Enter second text here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAI API Key</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="sk-..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Your API key is required for generating embeddings. We don't
                    store it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Error:</span> {error}
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Calculating...
                </>
              ) : (
                "Compare Texts"
              )}
            </Button>

            {similarity > 0 && !isLoading && (
              <div className="text-center mt-4 p-4 bg-secondary/50 rounded-lg w-full">
                <p className="text-lg font-semibold">
                  Similarity Score:{" "}
                  <span className="text-primary">
                    {Math.round(similarity * 100)}%
                  </span>
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, Math.round(similarity * 100))}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
