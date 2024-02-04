import React from "react";
import * as Icons from "lucide-react";
import SectionTitle from "../components/section-title";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { getPosts, getResources } from "@/lib/cosmic";
import SnapCard from "../components/snap-card";
import SnapCardContainer from "../components/snap-card-container";
import * as Type from "@/lib/types";
import Image from "next/image";
import { getThumbnail } from "@/lib/utils";

const ResourcesPage: React.FC = async () => {
  const resource = await getResources();
  const posts = await getPosts();

  return (
    <div className="mx-auto my-16 flex h-full w-full max-w-5xl flex-col items-center px-4 md:my-24 md:px-0">
      <SectionTitle>Resources</SectionTitle>
      <p className="mb-4 text-center text-zinc-500 dark:text-zinc-400">
        A collection of resources for Design Engineers
      </p>
      <SnapCardContainer>
        {resource.map((item: Type.Resource) => {
          return (
            <SnapCard key={item.slug}>
              <div className="mx-auto flex h-full w-full flex-col items-stretch p-4">
                <div className="flex-1">
                  <SectionTitle>{item.title}</SectionTitle>
                  <p className="mb-4 mt-2 w-full text-zinc-500 dark:text-zinc-400">
                    {item.metadata.description}
                  </p>
                </div>
                <div className="flex w-full flex-col gap-4">
                  {item.metadata.links.map((link: any) => {
                    const IconName = link.icon_name.key;
                    const Icon: any = Icons[IconName as keyof typeof Icons];
                    if (!Icon) {
                      return null;
                    }
                    return (
                      <Link href={link.url} className="w-full" key={link.url}>
                        <Button className="w-full gap-2">
                          <Icon className="h-4" />
                          {link.text}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </SnapCard>
          );
        })}
      </SnapCardContainer>
      <div className="mx-auto mt-8 text-center">
        <SectionTitle>External Posts</SectionTitle>
        <p className="mb-4 text-center text-zinc-500 dark:text-zinc-400">
          The latest posts from our contributors
        </p>
      </div>
      <SnapCardContainer>
        {posts.map((post: Type.Post) => {
          const url = post.metadata.video_url || "";
          const thumbnailUrl = getThumbnail(url);

          return (
            <Link href={post.metadata.url} target="_blank" key={post.slug}>
              <SnapCard>
                <div className="mx-auto flex h-full w-full flex-col items-start">
                  {(post.metadata.image || thumbnailUrl) && (
                    <Image
                      alt="Article image"
                      className="aspect-content border-y border-neutral-50 object-cover dark:border-neutral-800"
                      height={100}
                      width={500}
                      src={
                        post.metadata.image
                          ? `${post.metadata.image.imgix_url}?w=800&auto=format,compression`
                          : thumbnailUrl
                      }
                      placeholder="blur"
                      blurDataURL={
                        post.metadata.image
                          ? `${post.metadata.image.imgix_url}?w=20&auto=format,compression`
                          : thumbnailUrl
                      }
                    />
                  )}
                  <div className="p-4">
                    <h3 className="line-clamp-2 text-xl font-medium text-black dark:text-white">
                      {post.title}
                    </h3>
                    <p className="mb-4 mt-2 line-clamp-3 w-full text-zinc-500 dark:text-zinc-400">
                      {post.metadata.content}
                    </p>
                  </div>
                </div>
              </SnapCard>
            </Link>
          );
        })}
      </SnapCardContainer>
    </div>
  );
};

export default ResourcesPage;
