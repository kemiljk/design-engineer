"use client";

import * as Type from "@/lib/types";
import { getReadingTime } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { useTheme } from "next-themes";

export function ContentCard({
  post,
  className,
}: {
  post: Type.Post;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();
  const readingTime = getReadingTime(post.metadata.content || "");

  const href = post.metadata.is_external_link
    ? post.metadata.url
    : `/posts/${post.slug}`;

  const isExternal = post.metadata.is_external_link;

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.title)}&type=article&theme=${resolvedTheme || "light"}`;

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group block h-full w-full ${className}`}
      prefetch={!isExternal}
    >
      <div className="flex h-full w-full flex-col border border-neutral-200 bg-white transition-colors hover:border-swiss-red dark:border-neutral-800 dark:bg-black dark:hover:border-swiss-red">
        <div className="relative aspect-video w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            src={ogImageUrl}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <span>
                {new Date(post.metadata.published_date).toLocaleDateString(
                  "en-gb",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </span>
              <span>/</span>
              <span>{readingTime} min read</span>
            </div>

            <h2 className="font-sans text-xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-swiss-red">
              {post.title}
            </h2>

            <div className="prose prose-sm line-clamp-3 w-full text-neutral-600 dark:text-neutral-300 dark:prose-invert">
              <Markdown
                components={{
                  a: ({ children }) => (
                    <span className="text-inherit">{children}</span>
                  ),
                  p: ({ children }) => <p className="mb-0">{children}</p>,
                }}
              >
                {post.metadata.snippet
                  ? post.metadata.snippet
                  : post.metadata.content.slice(0, 200)}
              </Markdown>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
