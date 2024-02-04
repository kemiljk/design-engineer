import React from "react";
import * as Type from "@/lib/types";
import { getPosts } from "@/lib/cosmic";
import { ContentCard } from "../components/content-card";
import { cn } from "@/lib/utils";
import SubmitArticle from "../components/submit-article";

const PostsPage: React.FC = async () => {
  const posts = await getPosts();

  return (
    <section>
      <div className="mx-auto mt-4 flex w-full max-w-5xl justify-end md:mt-20">
        <SubmitArticle />
      </div>
      <div className="mt-12 flex w-full max-w-5xl flex-wrap  justify-evenly gap-8">
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
    </section>
  );
};

export default PostsPage;
