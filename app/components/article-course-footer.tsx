import Link from "next/link";
import { ArrowRight, Book } from "iconoir-react";
import { cn } from "@/lib/utils";

interface ArticleCourseFooterProps {
  categories?: { title: string }[];
  className?: string;
}

const TRACK_COPY = {
  design: "The Design Track covers visual fundamentals, systems thinking, and cross-platform patterns.",
  engineering: "The Engineering Track covers implementation patterns, animation systems, and production-ready code.",
  default: "248+ lessons covering design fundamentals, engineering implementation, and everything in between.",
};

export function ArticleCourseFooter({ 
  categories = [], 
  className 
}: ArticleCourseFooterProps) {
  // Determine copy based on categories
  let copy = TRACK_COPY.default;
  let link = "/course";

  const categoryTitles = categories.map(c => c.title.toLowerCase());
  
  if (categoryTitles.some(c => c.includes("design"))) {
    copy = TRACK_COPY.design;
    link = "/course/design-track";
  } else if (categoryTitles.some(c => c.includes("engineering") || c.includes("code") || c.includes("development"))) {
    copy = TRACK_COPY.engineering;
    link = "/course/engineering-track";
  }

  return (
    <div className={cn("my-12 rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-swiss-red flex h-6 w-6 items-center justify-center rounded-full">
              <Book className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-neutral-500">Keep Learning</span>
          </div>
          <h3 className="mb-1 text-lg font-bold">Like this post?</h3>
          <p className="max-w-xl text-neutral-600 dark:text-neutral-400">
            The course goes deeper—{copy}
          </p>
        </div>
        <Link 
          href={link}
          className="group flex shrink-0 items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 hover:shadow-md dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
        >
          Explore the course
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
