import { ArrowLeftIcon, Clock } from "lucide-react";
import Markdown from "@/app/components/Markdown";
import CopyButton from "@/app/components/copy-button";
import { RelativeDate } from "@/app/components/relative-date";
import { format, parseISO } from "date-fns";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { getPost, getPosts } from "@/lib/cosmic";
import { ContentCard } from "@/app/components/content-card";
import { Avatar } from "@heroui/avatar";
import { getReadingTime } from "@/lib/utils";

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
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      siteId: "1721269273446731776",
      creator: "@dxe_xyz",
      creatorId: "1721269273446731776",
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

  return (
    <div>
      <div className="mx-auto max-w-prose">
        {post && (
          <>
            <div className="mb-8 flex w-full items-center justify-between">
              <Button
                as={Link}
                variant="light"
                href="/posts"
                startContent={
                  <ArrowLeftIcon className="size-4 shrink-0 text-inherit transition ease-out group-hover:-translate-x-1" />
                }
              >
                Go back
              </Button>
            </div>
            <article>
              {post.metadata.categories && post.metadata.categories.length > 0 && (
                <div className="mb-4 flex items-center gap-x-2">
                  {post.metadata.categories.map((category: any) => (
                    <Chip key={category.id || category.title} variant="bordered" radius="full">
                      {category.title}
                    </Chip>
                  ))}
                </div>
              )}
              <h1 className="text-2xl font-black tracking-tighter text-foreground lg:text-4xl">
                {post.title}
              </h1>
              <div className="mb-8 mt-4 flex w-full flex-wrap items-center justify-start gap-x-4">
                <div className="flex items-center gap-x-2">
                  <Avatar
                    size="sm"
                    src={post.metadata.author.metadata?.image?.imgix_url || ""}
                    alt={post.metadata.author.title}
                    fallback={post.metadata.author.title}
                  />
                  <span className="text-sm text-foreground-700">
                    {post.metadata.author.title}
                  </span>
                </div>
                <span className="text-sm text-foreground-500">•</span>
                <span className="text-sm text-foreground-500">
                  {postPublished}
                </span>
                <span className="text-sm text-foreground-500">•</span>
                <span className="flex items-center gap-1 text-sm text-foreground-500">
                  <Clock className="h-3.5 w-3.5" />
                  {readingTime} min read
                </span>
              </div>
              <Markdown
                className="prose prose-zinc pb-4 dark:prose-invert"
                content={post.metadata.content}
              />
              <span className="pb-16 pt-8 text-sm text-foreground-500">
                Last updated: {postModified} (<RelativeDate date={post.modified_at} />)
              </span>
            </article>
          </>
        )}
        <div className="flex w-full items-center justify-center space-x-2 pb-4 pt-8">
          <CopyButton />
        </div>
        <Divider className="my-4" />
        <h3 className="pb-2">More to explore</h3>
        <ul role="list" className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2">
          {allPosts !== undefined &&
            allPosts
              .filter((nextPost: { id: string }) => nextPost?.id !== post?.id)
              .slice(0, 4)
              .map((nextPost: any) => (
                <ContentCard key={nextPost.id} post={nextPost} />
              ))}
        </ul>
      </div>
    </div>
  );
}
