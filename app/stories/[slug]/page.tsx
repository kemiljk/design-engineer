import React from "react";
import { getStory } from "@/lib/cosmic";
import { Avatar, Link } from "@nextui-org/react";
import { StoryTitle } from "@/app/components/story-title";
import { QnABlock } from "@/app/stories/[slug]/qna-block";
import CopyButton from "@/app/components/copy-button";
import Markdown from "react-markdown";
import { InfoIcon } from "lucide-react";

const StoryPage = async ({ params }: { params: { slug: string } }) => {
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
    <article className="mx-auto w-full p-4 md:p-16 lg:max-w-4xl lg:p-24">
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <Avatar
          className="h-40 w-40"
          src={story.metadata.design_engineer.metadata.image.imgix_url}
        />
        <StoryTitle story={story} />
        <div className="flex items-center justify-center gap-4">
          <Avatar
            className="h-10 w-10 border border-zinc-100 bg-white dark:border-zinc-800"
            src={
              story.metadata.design_engineer.metadata.company.metadata.logo
                .imgix_url
            }
          />
          <p className="font-medium text-zinc-800 dark:text-zinc-200">
            {story.metadata.design_engineer.metadata.role}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link
            className="text-blue-500 decoration-2 underline-offset-4 hover:underline"
            href={`https://www.twitter.com/${story.metadata.design_engineer.metadata.twitter}`}
          >
            {story.metadata.design_engineer.metadata.twitter}
          </Link>
          <Link
            className="text-blue-500 decoration-2 underline-offset-4 hover:underline"
            href={story.metadata.design_engineer.metadata.website}
          >
            {story.metadata.design_engineer.metadata.website}
          </Link>
        </div>
        <p className="text-center font-mono text-zinc-500 dark:text-zinc-400">
          {date} · {readingTime} minute read
        </p>
        {story.metadata.video_url && (
          <video
            className="w-full rounded-xl border-8 border-foreground-100 ring-1 ring-foreground-200"
            controls
          >
            <source src={story.metadata.video_url} type="video/mp4" />
          </video>
        )}
        <article className="w-full rounded-2xl bg-primary-50 p-4">
          <Markdown className="prose font-sans text-sm text-primary-700 dark:prose-invert">
            {story.metadata.summary}
          </Markdown>
        </article>
        <div className="mt-6 flex w-full items-center gap-2 text-foreground-500">
          <InfoIcon className="h-6 w-6 text-primary-500 dark:text-primary-400" />
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
