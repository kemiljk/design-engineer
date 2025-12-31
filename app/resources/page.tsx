import React from "react";
import { Button } from "@/app/components/ui";
import Link from "next/link";
import { getPosts, getResources } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { ResourceIcon } from "../components/resource-icon";
import { PageHeader } from "../components/page-header";
import { OpenNewWindow } from "iconoir-react";

const ResourcesPage: React.FC = async () => {
  const [resources, fetchPosts] = await Promise.all([
    getResources(),
    getPosts(),
  ]);

  const posts = fetchPosts.filter(
    (post: Type.Post) => post.metadata.is_external_link === true
  );

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Resources"
        description="A curated collection of tools, guides, and references for Design Engineers."
      />

      <div className="container-page py-12">
        {/* Resources ViewGrid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item: Type.Resource) => (
            <div
              key={item.slug}
              className="flex h-full flex-col border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
              <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                {item.metadata.description}
              </p>
              <div className="flex flex-col gap-2">
                {item.metadata.links.map((link) => (
                  <Link href={link.url} key={link.url} target="_blank">
                    <Button className="w-full justify-start gap-2" variant="secondary">
                      <ResourceIcon name={link.icon_name} className="h-4 w-4" />
                      {link.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* External Posts */}
        {posts.length > 0 && (
          <>
            <div className="mb-8 mt-16 border-b border-neutral-200 pb-4 dark:border-neutral-800">
              <h2 className="text-2xl font-bold">Community Posts</h2>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                The latest articles from across the web
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post: Type.Post) => (
                <Link
                  href={post.metadata.url}
                  target="_blank"
                  key={post.slug}
                  className="group flex items-start gap-4 border border-neutral-200 bg-white p-4 transition-colors hover:border-swiss-red dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-swiss-red"
                >
                  <div className="flex-1">
                    <h3 className="font-bold group-hover:text-swiss-red">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {post.metadata.snippet || post.metadata.content?.slice(0, 150)}
                    </p>
                  </div>
                  <OpenNewWindow className="h-4 w-4 shrink-0 text-neutral-400 group-hover:text-swiss-red" />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ResourcesPage;
