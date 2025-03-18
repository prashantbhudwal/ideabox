import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingArticle() {
  return (
    <article className="max-w-3xl py-6 sm:py-10">
      {/* Header section */}
      <header className="mb-6 sm:mb-8">
        <div className="flex flex-col">
          {/* Title skeleton */}
          <Skeleton className="h-8 sm:h-10 md:h-12 w-3/4 mb-2 sm:mb-3" />
          {/* Date skeleton */}
          <Skeleton className="h-4 sm:h-5 w-32" />
        </div>
      </header>

      {/* Content section with prose styling */}
      <div className="prose prose-lg dark:prose-invert">
        {/* Paragraphs */}
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-11/12 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-4/5 mb-8" />
        {/* Second section */}
        <Skeleton className="h-6 w-1/3 mb-4" /> {/* Subheading */}
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-11/12 mb-4" />
        <Skeleton className="h-4 w-full mb-8" />
        {/* Third section */}
        <Skeleton className="h-6 w-1/3 mb-4" /> {/* Subheading */}
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-4 w-11/12 mb-4" />
        <Skeleton className="h-4 w-4/5 mb-4" />
      </div>
    </article>
  );
}
