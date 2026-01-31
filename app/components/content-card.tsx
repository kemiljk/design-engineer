"use client";

import * as Type from "@/lib/types";
import { getReadingTime } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import { motion } from "motion/react";
import { ease, duration, viewportOnce } from "@/lib/motion";

export function ContentCard({
  post,
  className,
}: {
  post: Type.Post;
  className?: string;
}) {
  const readingTime = getReadingTime(post.metadata.content || "");

  const href = post.metadata.is_external_link
    ? post.metadata.url
    : `/posts/${post.slug}`;

  const isExternal = post.metadata.is_external_link;

  const imageUrl = post.metadata.image?.imgix_url
    ? `${post.metadata.image.imgix_url}?w=800&h=450&fit=crop&auto=format`
    : null; // Only use image if it exists, otherwise no image section

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.slow, ease: ease.outQuint }}
    >
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={`group block h-full w-full ${className}`}
        prefetch={!isExternal}
      >
        <div className="relative flex h-full w-full flex-col border border-neutral-200 bg-white transition-colors hover:border-swiss-red motion-reduce:transition-none dark:border-neutral-800 dark:bg-black dark:hover:border-swiss-red">
          {/* Decorative Corners - Always Visible */}
          <div className="absolute top-0 right-0 h-3 w-3 border-t border-r border-swiss-red" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-swiss-red" />

          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                <span suppressHydrationWarning>
                  {new Date(post.metadata.published_date).toLocaleDateString(
                    "en-GB",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </span>
                <span className="text-neutral-300 dark:text-neutral-600">/</span>
                <span>{isExternal ? "External" : `${readingTime} min read`}</span>
              </div>

              <h2 className="text-lg font-bold text-foreground transition-colors group-hover:text-swiss-red motion-reduce:transition-none md:text-xl">
                {post.title}
              </h2>

              <div className="prose prose-sm line-clamp-3 w-full text-neutral-500 dark:text-neutral-400 dark:prose-invert">
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
    </motion.div>
  );
}
