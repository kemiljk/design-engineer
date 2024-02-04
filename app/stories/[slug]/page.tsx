import React from "react";
import { getConfig, getStory } from "@/lib/cosmic";
import { Avatar, Link } from "@nextui-org/react";
import { StoryTitle } from "@/app/components/story-title";
import { QnABlock } from "@/app/components/qna-block";
import CopyButton from "@/app/components/copy-button";

const StoryPage = async ({ params }: { params: { slug: string } }) => {
  const story = await getStory(params.slug);
  const { metadata } = await getConfig();

  const date = new Date(story.metadata.published_date).toLocaleDateString(
    "en-gb",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

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
            className="h-10 w-10 border border-zinc-100 dark:border-zinc-800"
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
          {date}
        </p>
        {story.metadata.qna.metadata.qna.map(({ qna, index }: any) => (
          <QnABlock story={story} metadata={metadata} qna={qna} key={index} />
        ))}
        <CopyButton />
      </div>
    </article>
  );
};

export default StoryPage;
