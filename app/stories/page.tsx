import React from "react";
import { getStories } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { cn } from "@/lib/utils";

import ConsoleFun from "../components/consol-fun";
import { StoryCard } from "../components/story-card";
import SectionTitle from "../components/section-title";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const StoriesPage: React.FC = async () => {
  const stories = await getStories();

  return (
    <section>
      <div className="mx-auto w-full p-4 md:px-16 lg:px-24">
        <div className="flex flex-col items-center gap-10">
          <div className="flex w-full flex-col items-center md:mt-0">
            <SectionTitle>Stories</SectionTitle>
            <p className="text-center text-zinc-500 dark:text-zinc-400">
              A series of interviews with top Design Engineers
            </p>
          </div>
        </div>
      </div>
      <div className="mt-12 flex w-full flex-wrap justify-evenly gap-8">
        {stories.map((story: Type.Story) => {
          const rotationClass = Math.random() < 0.5 ? `-rotate-3` : `rotate-2`;
          return (
            stories.some((s) => s.metadata.is_pending) && (
              <StoryCard
                key={story.id}
                story={story}
                className={cn(
                  rotationClass,
                  "transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-default",
                )}
              />
            )
          );
        })}
      </div>
      <ConsoleFun />
    </section>
  );
};

export default StoriesPage;
