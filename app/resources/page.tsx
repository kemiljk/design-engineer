import React from "react";
import { Button } from "@/app/components/ui";
import Link from "next/link";
import { getPosts, getResources } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { ResourceIcon } from "../components/resource-icon";
import { PageHeader } from "../components/page-header";
import { OpenNewWindow as ExternalLink } from "iconoir-react";

const ResourcesPage: React.FC = async () => {
  const [resources, fetchPosts] = await Promise.all([
    getResources(),
    getPosts(),
  ]);

  const posts = fetchPosts.filter(
    (post: Type.Post) => post.metadata.is_external_link === true,
  );

  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title="Resources"
        description="A curated collection of tools, guides, and references for Design Engineers."
      />

      <div className="container-page py-12">
        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((item: Type.Resource) => (
            <div
              key={item.slug}
              className="flex h-full flex-col justify-between border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <h2 className="mb-2 text-xl font-bold">{item.title}</h2>
                <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
                  {item.metadata.description}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {item.metadata.links.map((link) => (
                  <Link href={link.url} key={link.url} target="_blank">
                    <Button
                      className="w-full justify-start gap-2"
                      variant="secondary"
                    >
                      <ResourceIcon name={link.icon_name} className="h-4 w-4" />
                      {link.text}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Jobs & Hiring */}
        <div className="mt-16 mb-8 border-b border-neutral-200 pb-4 dark:border-neutral-800">
          <h2 className="text-2xl font-bold">Jobs & Hiring</h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Looking for Design Engineering roles? Browse the job board at
            designengineer.io
          </p>
        </div>
        <Link
          href="https://designengineer.io"
          target="_blank"
          className="group hover:border-swiss-red dark:hover:border-swiss-red flex items-center justify-between border border-neutral-200 bg-white p-6 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div>
            <h3 className="group-hover:text-swiss-red font-bold">
              Design Engineer Job Board
            </h3>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Browse open roles from companies looking for Design Engineers
            </p>
          </div>
          <ExternalLink className="group-hover:text-swiss-red h-5 w-5 shrink-0 text-neutral-400 transition-colors" />
        </Link>

        {/* External Posts */}
        {posts.length > 0 && (
          <>
            <div className="mt-16 mb-8 border-b border-neutral-200 pb-4 dark:border-neutral-800">
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
                  className="group hover:border-swiss-red dark:hover:border-swiss-red flex items-start gap-4 border border-neutral-200 bg-white p-4 transition-colors dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="flex-1">
                    <h3 className="group-hover:text-swiss-red font-bold">
                      {post.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {post.metadata.snippet ||
                        post.metadata.content?.slice(0, 150)}
                    </p>
                  </div>
                  <ExternalLink className="group-hover:text-swiss-red h-4 w-4 shrink-0 text-neutral-400" />
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
