import React from "react";
import * as Type from "@/lib/types";
import { getStories } from "@/lib/cosmic";
import { cn } from "@/lib/utils";
import { StoryCard } from "../components/story-card";

const StoriesPage: React.FC = async () => {
  const stories = await getStories();

  return (
    <section>
      <div className="mt-12 flex w-full flex-wrap justify-evenly gap-8">
        {stories.map((story: Type.Story) => {
          const rotationClass = Math.random() < 0.5 ? `-rotate-3` : `rotate-2`;
          return (
            <StoryCard
              key={story.id}
              story={story}
              className={cn(
                rotationClass,
                "transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-default",
              )}
            />
          );
        })}
      </div>
    </section>
  );
};

export default StoriesPage;
