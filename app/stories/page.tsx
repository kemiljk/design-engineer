import React from "react";
import { getStories } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { cn } from "@/lib/utils";

import ConsoleFun from "../components/console-fun";
import { StoryCard } from "../components/story-card";
import { PageHeader } from "../components/page-header";

const StoriesPage: React.FC = async () => {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Stories"
        description="Conversations with leading Design Engineers about their craft, career, and creative process."
      />

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-8">
          {stories
            .filter((story) => !story.metadata.is_pending)
            .map((story: Type.Story, index) => {
              const rotationClass = index % 2 === 0 ? `-rotate-3` : `rotate-2`;
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
      </div>
      <ConsoleFun />
    </main>
  );
};

export default StoriesPage;
