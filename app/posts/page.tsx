import React from "react";
import * as Type from "@/lib/types";
import { getFirstPartyPosts } from "@/lib/cosmic";
import { ContentCard } from "../components/content-card";
import SubmitArticle from "../components/submit-article";
import Search from "../components/search-box";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchTerm = (searchParams.search as string) || "";
  const fetchPosts = await getFirstPartyPosts();
  const posts = fetchPosts
    .filter((post) => post.metadata.is_external_link === false)
    .sort((a, b) => {
      return (
        new Date(b.metadata.published_date).getTime() -
        new Date(a.metadata.published_date).getTime()
      );
    });

  const filteredPosts = posts.filter((post: Type.Post) =>
    [
      post.title,
      post.metadata.author.title,
      ...post.metadata.categories.map((cat) => cat.title),
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
      <div className="mt-12 grid w-full max-w-5xl grid-cols-1 justify-evenly  gap-8 md:grid-cols-2">
        {filteredPosts.map((post: Type.Post) => {
          return <ContentCard key={post.id} post={post} />;
        })}
      </div>
    </section>
  );
};

export default PostsPage;
