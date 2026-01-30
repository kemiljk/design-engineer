import Link from "next/link";
import { ArrowRight, Book } from "iconoir-react";
import { cn } from "@/lib/utils";

interface ToolCourseCTAProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function ToolCourseCTA({ 
  children, 
  href = "/course", 
  className 
}: ToolCourseCTAProps) {
  return (
    <div className={cn("mt-8 border-t border-neutral-200 pt-6 dark:border-neutral-800", className)}>
      <Link 
        href={href}
        className="group flex items-start gap-3 rounded-lg bg-neutral-50 p-4 transition-colors hover:bg-neutral-100 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
      >
        <div className="bg-swiss-red/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-swiss-red">
          <Book className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Go deeper
          </p>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {children}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
