import { ContentCard } from "@/app/components/content-card";
import { Button } from "@/components/ui/button";
import { getHome, getPosts } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import cn from "classnames";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BlurShape } from "./components/blur-shape";
import InfoPill from "./components/info-pill";
import PageTitle from "./components/page-title";
import SectionTitle from "./components/section-title";
import SubmitArticle from "./components/submit-article";
import { Form } from "./components/waitlist-form";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHome();
  const posts = await getPosts();

  return (
    <main>
      <div className="flex h-full min-h-screen flex-col items-center justify-between overflow-hidden p-4 md:px-16 md:pb-16 lg:px-24 lg:pb-24">
        <div className="absolute inset-0 grid place-content-center">
          <BlurShape />
        </div>
        <div className="mx-auto w-full py-4 md:p-16 lg:max-w-5xl lg:p-24">
          <div className="grid h-full w-full place-items-center">
            <div className="relative flex flex-col items-center gap-10">
              <div className="z-1 flex justify-center">
                <InfoPill>{home.metadata.pill}</InfoPill>
              </div>
              <PageTitle />
              <p className="mx-auto w-full text-center font-sans text-lg leading-snug tracking-tight text-gray-600 dark:text-gray-400 md:text-2xl lg:max-w-3xl lg:text-3xl">
                {home.metadata.description}
              </p>
              <Form />
            </div>
          </div>
        </div>
        <div>
          <div className="mt-8 flex w-full flex-col items-center md:mt-0">
            <SectionTitle>While you wait</SectionTitle>
            <p className="text-zinc-500 dark:text-zinc-400">
              Some articles from Design Engineers
            </p>
          </div>
          <div className="mt-12 flex w-full flex-wrap justify-evenly gap-8">
            {posts.slice(0, 4).map((post: Type.Post) => {
              const rotationClass =
                Math.random() < 0.5 ? `-rotate-3` : `rotate-2`;
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
          <div className="mt-8 flex w-full items-center justify-center gap-4 md:mt-12">
            <SubmitArticle />
            <Link href="/posts">
              <Button variant={"outline"} className="group text-center">
                See all articles{" "}
                <ArrowRight className="w-0 overflow-hidden opacity-0 transition-[width] duration-100 ease-[cubic-bezier(0.64_0.57_0.67_1.53)] group-hover:ml-1 group-hover:w-4 group-hover:opacity-100" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
