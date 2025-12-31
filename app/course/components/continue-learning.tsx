"use client";

import Link from "next/link";
import { NavArrowRight as ArrowRight, PlaySolid as PlayCircle } from "iconoir-react";
import { formatTitle, formatBreadcrumb } from "@/lib/format";

interface ContinueLearningProps {
  lessonPath: string;
  lessonTitle: string;
}

export function ContinueLearning({ lessonPath, lessonTitle }: ContinueLearningProps) {
  const formattedTitle = formatTitle(
    lessonTitle
      .split('/')
      .pop()
      ?.replace(/-/g, ' ')
      .replace(/^\d+\s*/, '') || lessonTitle
  );

  const breadcrumb = lessonPath
    .split('/')
    .slice(0, -1)
    .map(part => formatBreadcrumb(part))
    .join(' › ');

  return (
    <Link
      href={`/course/${lessonPath}`}
      className="group flex items-center justify-between border-2 border-swiss-red bg-swiss-red/5 p-6 transition-all hover:bg-swiss-red/10"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center bg-swiss-red text-white">
          <PlayCircle className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-swiss-red">Continue where you left off</p>
          <p className="text-lg font-bold">{formattedTitle}</p>
          {breadcrumb && (
            <p className="text-xs text-neutral-500">{breadcrumb}</p>
          )}
        </div>
      </div>
      <ArrowRight className="h-6 w-6 text-swiss-red transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
