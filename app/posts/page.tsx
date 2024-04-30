import React from "react";
import * as Type from "@/lib/types";
import { getPosts } from "@/lib/cosmic";
import { ContentCard } from "../components/content-card";
import { cn } from "@/lib/utils";
import SubmitArticle from "../components/submit-article";
import Search from "../components/search-box";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchTerm = (searchParams.search as string) || "";
  const fetchPosts = await getPosts();
  const posts = fetchPosts.filter(
    (post) => post.metadata.is_external_link === false,
  );

  const filteredPosts = posts.filter((post: Type.Post) =>
    [
      post.title,
      post.metadata.author.title,
      post.metadata.categories.map((cat) => cat.title),
      post.metadata.content,
    ].some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <section>
      <div className="mx-auto mt-4 flex w-full max-w-5xl justify-end md:mt-20">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Search initialSearchTerm={searchTerm} page="posts" />
          <SubmitArticle />
        </div>
      </div>
      <div className="mt-12 flex w-full max-w-5xl flex-wrap  justify-evenly gap-8">
        {filteredPosts.map((post: Type.Post) => {
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
