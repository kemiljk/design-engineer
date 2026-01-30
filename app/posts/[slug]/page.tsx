import { Clock } from "iconoir-react";
import Markdown from "@/app/components/Markdown";
import CopyButton from "@/app/components/copy-button";
import { RelativeDate } from "@/app/components/relative-date";
import { format, parseISO } from "date-fns";
import { Chip, Avatar, Divider } from "@/app/components/ui";
import { getPost, getPosts } from "@/lib/cosmic";
import { ContentCard } from "@/app/components/content-card";
import { getReadingTime } from "@/lib/utils";
import { PageHeader } from "@/app/components/page-header";
import * as Type from "@/lib/types";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.slice(0, 50).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const metaTitle = `d×e | ${post.title}`;
  const metaDescription = post.metadata?.snippet || "";
  const metaUrl = `https://designengineer.xyz/posts/${post.slug}`;
  const ogImage = post.metadata?.image?.imgix_url;

  return {
    metadataBase: new URL("https://designengineer.xyz"),
    alternates: {
      canonical: `/posts/${post.slug}`,
    },
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      type: "website",
      siteName: "d×e",
      ...(ogImage && {
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      siteId: "1721269273446731776",
      creator: "@dxe_xyz",
      creatorId: "1721269273446731776",
      ...(ogImage && {
        images: [ogImage],
      }),
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Post(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  const [post, allPosts] = await Promise.all([
    getPost(params.slug),
    getPosts(),
  ]);

  const parseModifiedDate = parseISO(post.modified_at);
  const postModified = format(parseModifiedDate, "dd MMM yyyy");

  const parsePublishedDate = parseISO(post.created_at);
  const postPublished = format(parsePublishedDate, "dd MMM yyyy");


  const readingTime = getReadingTime(post.metadata?.content || "");

import { ArticleCourseFooter } from "@/app/components/article-course-footer";

  return (
    <main className="min-h-dvh bg-neutral-50 dark:bg-neutral-950">
      <PageHeader
        title={post.title}
        description={post.metadata.snippet}
      >
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
          {post.metadata.categories && post.metadata.categories.length > 0 && (
            <div className="flex items-center gap-2">
              {post.metadata.categories.map((category: { id?: string; title: string }) => (
                <Chip key={category.id || category.title} variant="outline" className="rounded-full">
                  {category.title}
                </Chip>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Avatar
              size="sm"
              src={post.metadata.author.metadata?.image?.imgix_url || ""}
              alt={post.metadata.author.title}
              fallback={post.metadata.author.title}
            />
            <span className="text-neutral-700 dark:text-neutral-300">
              {post.metadata.author.title}
            </span>
          </div>
          <span className="text-neutral-400">•</span>
          <span>{postPublished}</span>
          <span className="text-neutral-400">•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime} min read
          </span>
        </div>
      </PageHeader>

      <div className="container-readable py-12">
        <article>
          <Markdown
            className="prose prose-zinc dark:prose-invert"
            content={post.metadata.content}
          />
          <p className="mt-8 text-sm text-neutral-500">
            Last updated: {postModified} (<RelativeDate date={post.modified_at} />)
          </p>
        </article>

        <div className="flex w-full items-center justify-center space-x-2 py-8">
          <CopyButton />
        </div>

        <ArticleCourseFooter categories={post.metadata.categories} />

        <Divider className="my-4" />

        <h3 className="pb-2 font-bold">More to explore</h3>
        <ul role="list" className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          {allPosts !== undefined &&
            allPosts
              .filter((nextPost: Type.Post) => nextPost?.id !== post?.id)
              .slice(0, 4)
              .map((nextPost: Type.Post) => (
                <ContentCard key={nextPost.id} post={nextPost} />
              ))}
        </ul>
      </div>
    </main>
  );
}
