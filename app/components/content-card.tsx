import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import * as Type from "@/lib/types";
import { getThumbnail } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ContentCard({
  post,
  className,
}: {
  post: Type.Post;
  className?: string;
}) {
  const nameParts = post.metadata.author.title.split(" ");
  const initials =
    nameParts[0][0] + (nameParts.length > 1 ? nameParts[1][0] : "");

  const url = post.metadata.video_url || "";
  const thumbnailUrl = getThumbnail(url);

  return (
    <Link
      href={
        post.metadata.is_external_link
          ? post.metadata.url
          : `/posts/${post.slug}`
      }
      className={className}
      target="_blank"
    >
      <Card
        key="1"
        className="mx-auto max-w-xs overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:shadow-xl"
      >
        <CardHeader className="flex items-center justify-center p-6 text-center">
          <Avatar>
            <AvatarImage
              alt="Author's avatar"
              className="h-10 w-10 rounded-full object-cover"
              src={`${post.metadata.author.metadata.image.imgix_url}?w=400&auto=format,compression`}
            />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-base font-semibold">
              {post.metadata.author.title}
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(post.metadata.published_date).toLocaleDateString(
                "en-gb",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 px-0 pb-6">
          <Image
            alt="Article image"
            className="aspect-content border-y border-neutral-50 object-cover dark:border-neutral-800"
            height={100}
            width={500}
            src={
              post.metadata.image
                ? `${post.metadata.image.imgix_url}?w=800&auto=format,compression`
                : thumbnailUrl
            }
          />
          <div className="px-6">
            <h2 className="text-lg font-bold leading-tight">{post.title}</h2>
            <p className="line-clamp-3 w-full pt-3 text-sm text-gray-600 dark:text-gray-400">
              {post.metadata.content.slice(0, 200)}...
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
