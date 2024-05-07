import { ArrowLeftIcon } from "lucide-react";
import Markdown from "react-markdown";
import CopyButton from "@/app/components/copy-button";
import { format, formatDistance, parseISO } from "date-fns";
import { Divider } from "@nextui-org/divider";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Card, CardHeader } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { getPost, getPosts } from "@/lib/cosmic";
import { ContentCard } from "@/app/components/content-card";

export const revalidate = 1;

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await getPost({ params });

//   const metaTitle = `Karl Koch | ${post?.title}`;
//   const postTitle = post?.title.replaceAll(" ", "%20");
//   const metaImage = `https://kejk.tech/og?title=${postTitle}`;
//   const metaDescription = `${post?.metadata.snippet}`;
//   const metaUrl = `https://kejk.tech/${post?.slug}`;

//   return {
//     metadataBase: new URL(`https://kejk.tech/thoughts/${post.slug}`),
//     alternates: {
//       canonical: `/thoughts/${post.slug}`,
//     },
//     title: metaTitle,
//     description: metaDescription,
//     openGraph: {
//       title: metaTitle,
//       description: metaDescription,
//       url: metaUrl,
//       type: "website",
//       siteName: "KEJK",
//       images: [
//         {
//           url: metaImage,
//           width: 1200,
//           height: 630,
//           alt: metaTitle,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: metaTitle,
//       description: metaDescription,
//       siteId: "24575075",
//       creator: "@_kejk",
//       creatorId: "24575075",
//       images: [metaImage],
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: true,
//       googleBot: {
//         index: true,
//         follow: false,
//         noimageindex: true,
//         "max-video-preview": -1,
//         "max-image-preview": "large",
//         "max-snippet": -1,
//       },
//     },
//   };
// }

export default async function Post({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const post = await getPost({ params });
  const allPosts = await getPosts();

  const parseModifiedDate = parseISO(post.modified_at);
  const postModified = format(parseModifiedDate, "dd MMM yyyy");

  const parsePublishedDate = parseISO(post.created_at);
  const postPublished = format(parsePublishedDate, "dd MMM yyyy");

  const relativeDate = formatDistance(new Date(post.modified_at), new Date(), {
    addSuffix: true,
  });

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
              {post.metadata.categories !== undefined && (
                <div className="mb-4 flex items-center gap-x-2">
                  {post.metadata.categories.map((category: any) => (
                    <Chip
                      key={category}
                      variant="bordered"
                      color="primary"
                      radius="full"
                    >
                      {category.title}
                    </Chip>
                  ))}
                </div>
              )}
              <h1 className="font-display text-2xl font-black tracking-tighter text-foreground lg:text-4xl">
                {post.title}
              </h1>
              <div className="mb-8 mt-4 flex w-full flex-col items-center justify-between gap-x-1 md:flex-row">
                <span className="pr-4 text-sm text-foreground-500">
                  First published: {postPublished}
                </span>
              </div>
              <Markdown className="prose prose-zinc dark:prose-invert">
                {post.metadata.content}
              </Markdown>
              <span className="pb-16 pt-8 text-sm text-foreground-500 lg:pt-8">
                Last updated: {postModified} ({relativeDate})
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
