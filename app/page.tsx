import PageTitle from "./components/page-title";
import { WaitlistForm } from "./components/waitlist-form";
import { BlurShape } from "./components/blur-shape";
import { getHome, getPosts } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { ContentCard } from "@/app/components/content-card";
import cn from "classnames";
import SectionTitle from "./components/section-title";
import { Button, Link, Chip } from "@nextui-org/react";
import { ArrowRight, BookAIcon, SlackIcon } from "lucide-react";
import DTClubLogo from "./components/dtclub-logo";
import SubmitArticle from "./components/submit-article";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHome();
  const posts = await getPosts();

  return (
    <main>
      <div className="mb-20 flex h-full min-h-screen flex-col items-center justify-between overflow-hidden p-4 md:px-16 lg:px-24">
        <div className="absolute inset-0 grid place-content-center">
          <BlurShape />
        </div>
        <div className="mx-auto w-full py-4 md:p-16 lg:max-w-5xl lg:p-24">
          <div className="grid h-full w-full place-items-center">
            <div className="relative flex flex-col items-center gap-10">
              <div className="flex justify-center">
                <Chip
                  variant="bordered"
                  color="success"
                  classNames={{
                    base: "bg-gradient-to-br from-indigo-100 to-green-100 dark:from-indigo-700 dark:to-green-700 border border-green-400 dark:border-white/50",
                    content: "text-green-700 dark:text-white",
                  }}
                >
                  {home.metadata.pill}
                </Chip>
              </div>
              <PageTitle />
              <p className="mx-auto w-full text-center font-sans text-lg leading-snug tracking-tight text-gray-600 dark:text-gray-400 md:text-2xl lg:max-w-3xl lg:text-3xl">
                {home.metadata.description}
              </p>
              <WaitlistForm width="full" />
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
            <Button
              as={Link}
              href="/posts"
              endContent={<ArrowRight className="h-4 w-4" />}
              color="default"
              variant="flat"
              className="w-full gap-2 md:w-max"
            >
              See all articles
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
