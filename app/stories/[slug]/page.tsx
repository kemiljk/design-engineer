import React from "react";
import { getConfig, getStory } from "@/lib/cosmic";
import Markdown from "react-markdown";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { TwitterIcon } from "lucide-react";

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
      <div className="flex flex-col items-center gap-4">
      <Avatar className="h-40 w-40">
            <AvatarImage
              src={story.metadata.design_engineer.metadata.image.imgix_url}
            ></AvatarImage>
          </Avatar>
        <h1 className="flex flex-col sticky top-3 z-[9999999] items-center gap-4 text-2xl font-black text-black dark:text-white md:text-5xl">
            {story.title}
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                story.metadata.design_engineer.metadata.company.metadata.logo
                  .imgix_url
              }
            ></AvatarImage>
          </Avatar>
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
        {story.metadata.qna.metadata.qna.map((qna: any) => (
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4 sticky top-12 bg-white dark:bg-black h-10">
              <Avatar className="bg-zinc-100 dark:bg-zinc-800">
                <AvatarImage src={metadata.logo.imgix_url}></AvatarImage>
              </Avatar>
              <h3 className="text-lg font-medium text-black dark:text-white md:text-xl ">
                {qna.question}
              </h3>
            </div>

            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage
                  src={story.metadata.design_engineer.metadata.image.imgix_url}
                ></AvatarImage>
              </Avatar>
              <Markdown
                key={qna.question}
                className="space-y-4 text-zinc-700 dark:text-zinc-300"
              >
                {qna.answer}
              </Markdown>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
};

export default StoryPage;
