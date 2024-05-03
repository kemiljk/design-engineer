import { Card, CardBody, CardHeader } from "@nextui-org/card";
import * as Type from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export function StoryCard({
  story,
  className,
}: {
  story: Type.Story;
  className?: string;
}) {
  const placeholderTitleWidth = story.title.length;
  const date = new Date(story.metadata.published_date).toLocaleDateString(
    "en-gb",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  const url = story.metadata.is_available ? `/stories/${story.slug}` : ``;

  return (
    <Link href={url} className={className} rel="noopener noreferrer">
      <Card
        key="1"
        className="group mx-auto w-80 overflow-hidden rounded-3xl transition-all duration-500 ease-out hover:shadow-xl dark:border-zinc-700"
      >
        <CardHeader
          className={`flex flex-col items-center justify-center p-0 text-center ${
            !story.metadata.is_available && "grayscale"
          }`}
        >
          {story.metadata.design_engineer.metadata.image && (
            <Image
              alt="Author's avatar"
              className={`h-auto w-full object-cover ${
                !story.metadata.is_available &&
                "blur-xl transition-all duration-500 ease-in-out group-hover:blur-sm"
              }`}
              src={`${
                story.metadata.design_engineer.metadata.image.imgix_url
              }?w=400&auto=format,compression,${
                !story.metadata.is_available && "blur&blur=100"
              }`}
              width={400}
              height={400}
              blurDataURL={`${story.metadata.design_engineer.metadata.image.imgix_url}?w=400&auto=format,compression,blur&blur=100`}
            />
          )}
          <div className="pt-4 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {story.metadata.is_available ? date : `Coming on ${date}`}
            </p>
          </div>
        </CardHeader>
        <CardBody className="grid gap-4 px-0 pb-6 pt-4">
          <div className="px-6">
            {story.metadata.is_available ? (
              <>
                <h2>{story.title}</h2>
                <p className="line-clamp-3 w-full pt-3 text-sm text-gray-600 dark:text-gray-400">
                  {story.metadata.snippet.slice(0, 200)}...
                </p>
              </>
            ) : (
              <>
                <h2
                  className={`h-10 w-[${placeholderTitleWidth}ch] rounded-lg bg-zinc-300 dark:bg-zinc-700`}
                ></h2>
                <div className="flex flex-col gap-2 pt-3 opacity-10 dark:opacity-75">
                  <div className="h-2 w-full rounded-full bg-gray-600 dark:text-gray-400" />
                  <div className="h-2 w-full rounded-full bg-gray-600 dark:text-gray-400" />
                  <div className="h-2 w-1/2 rounded-full bg-gray-600 dark:text-gray-400" />
                </div>
              </>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
