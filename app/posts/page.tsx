import { getPosts } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

import { ContentCard } from "../components/content-card";
import SubmitArticle from "../components/submit-article";

const PostsPage: React.FC = async () => {
  const posts = await getPosts();

  return (
    <section>
      <div className="mt-12 flex w-full flex-wrap justify-evenly gap-8">
        {posts.map((post: Type.Post) => {
          const rotationClass = Math.random() < 0.5 ? `-rotate-3` : `rotate-2`;
          return (
            <ContentCard
              key={post.id}
              post={post}
              className={cn(
                rotationClass,
                "transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-default",
              )}
            />
          );
        })}
      </div>
      <div className="mt-8 flex w-full flex-col items-center md:mt-12">
        <SubmitArticle />
      </div>
    </section>
  );
};

export default PostsPage;
