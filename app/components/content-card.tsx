"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import * as Type from "@/lib/types";
import { getThumbnail, getReadingTime } from "@/lib/utils";
import { Image } from "@nextui-org/image";
import Markdown from "react-markdown";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export function ContentCard({
  post,
  className,
}: {
  post: Type.Post;
  className?: string;
}) {
  const router = useRouter();
  const nameParts = post.metadata.author.title.split(" ");
  const initials =
    nameParts[0][0] + (nameParts.length > 1 ? nameParts[1][0] : "");

  const url = post.metadata.video_url || "";
  const thumbnailUrl = getThumbnail(url);

  const image =
    post.metadata.author.metadata.image &&
    post.metadata.author.metadata.image.imgix_url;

  const readingTime = getReadingTime(post.metadata.content || "");

  const href = post.metadata.is_external_link
    ? post.metadata.url
    : `/posts/${post.slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (post.metadata.is_external_link) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      router.push(href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e as unknown as React.MouseEvent);
    }
  };

  return (
    <div
      className={`mx-auto h-full w-full ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
    >
      <Card
        key={post.id}
        className="h-full w-full overflow-hidden border border-foreground-50 transition duration-250 ease-soft-spring hover:shadow-lg hover:transition-colors"
      >
        <CardHeader className="flex items-start justify-center gap-4 pt-6 text-center">
          {post.metadata.author.metadata.image ? (
            <Avatar
              alt="Author's avatar"
              className="h-10 w-10 rounded-full object-cover"
              src={`${image}?w=400&auto=format,compression`}
              name={initials}
            />
          ) : (
            <Avatar
              alt="Author's avatar"
              className="h-10 w-10 rounded-full object-cover"
              name={initials}
            />
          )}
          <div className="flex flex-col text-start font-display text-base font-semibold">
            {post.metadata.author.title}
            <p className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              <span>
                {new Date(post.metadata.published_date).toLocaleDateString(
                  "en-gb",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  },
                )}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {readingTime} min
              </span>
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 px-0 pb-4">
          {(post.metadata.image || thumbnailUrl) && (
            <Image
              alt="Article image"
              className="aspect-video border-y border-neutral-50 object-cover dark:border-neutral-800"
              height={200}
              width={500}
              radius="none"
              src={
                post.metadata.image
                  ? `${post.metadata.image.imgix_url}?w=800&auto=format,compression`
                  : thumbnailUrl
              }
            />
          )}
          <h2 className="px-4 font-display text-lg font-bold leading-tight">
            {post.title}
          </h2>
          <CardFooter className="w-full text-sm text-gray-600 dark:text-gray-400">
            <Markdown
              className="line-clamp-3 w-full truncate text-wrap"
              components={{
                a: ({ node, ...props }) => (
                  <span className="text-inherit">{props.children}</span>
                ),
              }}
            >
              {post.metadata.snippet
                ? post.metadata.snippet
                : post.metadata.content.slice(0, 200)}
            </Markdown>
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
}
