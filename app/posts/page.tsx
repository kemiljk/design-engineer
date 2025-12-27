import React from "react";
import * as Type from "@/lib/types";
import { getPosts } from "@/lib/cosmic";
import { ContentCard } from "../components/content-card";
import SubmitArticle from "../components/submit-article";
import Search from "../components/search-box";
import { PageHeader } from "../components/page-header";

const PostsPage = async (props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParams = await props.searchParams;
  const searchTerm = (searchParams.search as string) || "";
  const fetchPosts = await getPosts();
  const posts = fetchPosts
    .filter((post) => post.metadata.is_external_link === false)
    .sort((a, b) => {
      return (
        new Date(b.metadata.published_date).getTime() -
        new Date(a.metadata.published_date).getTime()
      );
    });

  const filteredPosts = posts.filter((post: Type.Post) => {
    const searchableValues = [
      post.title,
      post.metadata.author?.title,
      ...(post.metadata.categories?.map((cat) => cat.title) || []),
      post.metadata.content,
    ].filter(Boolean);
    
    return searchableValues.some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Articles"
        description="Insights, tutorials, and perspectives on design engineering from our community."
      />

      <div className="container-page py-12">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Search initialSearchTerm={searchTerm} page="posts" />
          <SubmitArticle />
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post: Type.Post) => {
            return <ContentCard key={post.id} post={post} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default PostsPage;
