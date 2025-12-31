import React from "react";
import Link from "next/link";
import { getStories, getStory } from "@/lib/cosmic";
import { Avatar } from "@/app/components/ui";

export async function generateStaticParams() {
  const stories = await getStories();
  return stories
    .filter((s) => s.metadata.is_available)
    .map((story) => ({ slug: story.slug }));
}
import { StoryTitle } from "@/app/components/story-title";
import { QnABlock } from "@/app/stories/[slug]/qna-block";
import CopyButton from "@/app/components/copy-button";
import Markdown from "react-markdown";
import { InfoCircle as InfoIcon } from "iconoir-react";

const StoryPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const story = await getStory(params.slug);

  const date = new Date(story.metadata.published_date).toLocaleDateString(
    "en-gb",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  const totalWords = story.metadata.qna.metadata.qna.reduce((count, qna) => {
    const words = qna.content.split(" ").length;
    return count + words;
  }, 0);

  const readingTime = Math.ceil(totalWords / 200);

  return (
    <article className="container-readable py-8 md:py-16 lg:py-24">
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <Avatar
          className="h-40 w-40"
          src={story.metadata.design_engineer.metadata.image.imgix_url}
        />
        <StoryTitle story={story} />
        <div className="flex items-center justify-center gap-4">
          <Avatar
            className="h-10 w-10 border border-neutral-100 bg-white dark:border-neutral-800"
            src={
              story.metadata.design_engineer.metadata.company.metadata.logo
                .imgix_url
            }
          />
          <p className="font-medium text-neutral-800 dark:text-neutral-200">
            {story.metadata.design_engineer.metadata.role}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          {story.metadata.design_engineer.metadata.twitter && (
            <Link
              className="flex items-center gap-x-1 text-swiss-red decoration-2 underline-offset-4 hover:underline"
              href={`${story.metadata.design_engineer.metadata.twitter}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 shrink-0 text-foreground"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
              {story.metadata.design_engineer.metadata.twitter &&
                story.metadata.design_engineer.metadata.twitter.replace(
                  /(.*)\/(.*)/,
                  "@$2",
                )}
            </Link>
          )}
          <Link
            className="flex items-center gap-x-1 text-swiss-red decoration-2 underline-offset-4 hover:underline"
            href={story.metadata.design_engineer.metadata.website}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 text-foreground"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4" />
              <path d="M11.5 3a16.989 16.989 0 0 0 -1.826 4" />
              <path d="M12.5 3a16.989 16.989 0 0 1 1.828 4" />
              <path d="M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4" />
              <path d="M11.5 21a16.989 16.989 0 0 1 -1.826 -4" />
              <path d="M12.5 21a16.989 16.989 0 0 0 1.828 -4" />
              <path d="M2 10l1 4l1.5 -4l1.5 4l1 -4" />
              <path d="M17 10l1 4l1.5 -4l1.5 4l1 -4" />
              <path d="M9.5 10l1 4l1.5 -4l1.5 4l1 -4" />
            </svg>
            {story.metadata.design_engineer.metadata.website}
          </Link>
        </div>
        <p className="text-center font-mono text-neutral-500 dark:text-neutral-400">
          {date} · {readingTime} minute read
        </p>
        {story.metadata.video_url && (
          <video
            className="w-full rounded-none border-8 border-neutral-100 ring-1 ring-neutral-200 dark:border-neutral-800 dark:ring-neutral-700"
            controls
          >
            <source src={story.metadata.video_url} type="video/mp4" />
          </video>
        )}
        <article className="prose w-full rounded-none bg-neutral-50 p-4 text-sm text-neutral-700 dark:prose-invert dark:bg-neutral-900 dark:text-neutral-300">
          <Markdown>{story.metadata.summary}</Markdown>
        </article>
        <div className="mt-6 flex w-full items-center gap-2 text-neutral-500">
          <InfoIcon className="h-6 w-6 text-swiss-red" />
          <p>This transcript has been partially edited for brevity.</p>
        </div>
        {story.metadata.qna.metadata.qna.map((qna) => (
          <QnABlock key={story.metadata.qna.id} qna={qna} />
        ))}
        <CopyButton />
      </div>
    </article>
  );
};

export default StoryPage;
