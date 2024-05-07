import { Avatar } from "@nextui-org/avatar";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import * as Type from "@/lib/types";
import { getThumbnail } from "@/lib/utils";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import Markdown from "react-markdown";

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

  const image =
    post.metadata.author.metadata.image &&
    post.metadata.author.metadata.image.imgix_url;

  return (
    <Link
      href={
        post.metadata.is_external_link
          ? post.metadata.url
          : `/posts/${post.slug}`
      }
      className={className}
      target={post.metadata.is_external_link ? "_blank" : "_self"}
    >
      <Card
        key={post.id}
        className="mx-auto w-full overflow-hidden border border-foreground-100 shadow transition duration-250 ease-soft-spring hover:shadow-lg hover:transition"
        isPressable
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
          <div className="font-display flex flex-col text-start text-base font-semibold">
            {post.metadata.author.title}
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {new Date(post.metadata.published_date).toLocaleDateString(
                "en-gb",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
            </p>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 px-0 pb-4">
          {(post.metadata.image || thumbnailUrl) && (
            <Image
              alt="Article image"
              className="aspect-video border-y border-neutral-50 object-cover dark:border-neutral-800"
              height={100}
              width={500}
              radius="none"
              src={
                post.metadata.image
                  ? `${post.metadata.image.imgix_url}?w=800&auto=format,compression`
                  : thumbnailUrl
              }
            />
          )}
          <h2 className="font-display px-4 text-lg font-bold leading-tight">
            {post.title}
          </h2>
          <CardFooter className="w-full text-sm text-gray-600 dark:text-gray-400">
            <Markdown className="line-clamp-3">
              {post.metadata.content.slice(0, 200) + "..."}
            </Markdown>
          </CardFooter>
        </CardBody>
      </Card>
    </Link>
  );
}
