import PageTitle from "./components/page-title";
import { BlurShape } from "./components/blur-shape";
import {
  getHome,
  getSponsors,
  getPosts,
  getIndustries,
  getJobs,
  getLocations,
  getFirstPartyPosts,
} from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { ContentCard } from "@/app/components/content-card";
import cn from "classnames";
import SectionTitle from "./components/section-title";
import { Button } from "@nextui-org/button";
import { StyledButton } from "../app/components/styled-button";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { ArrowRight } from "lucide-react";
import SubmitArticle from "./components/submit-article";
import { SignedOut } from "@clerk/nextjs";
import { Image } from "@nextui-org/image";

export default async function Home() {
  const home = await getHome();
  const sponsors = await getSponsors();
  const posts = await getPosts();
  const firstPartyPosts = await getFirstPartyPosts();
  const jobs = await getJobs();
  const ind: Type.Industry[] = await getIndustries();
  const loc: Type.Location[] = await getLocations();

  // Combine posts and firstPartyPosts
  const combinedPosts = [...posts, ...firstPartyPosts];

  // Shuffle the combined array
  const shuffledPosts = combinedPosts.sort(() => 0.5 - Math.random());

  // Slice the first 3 elements from the shuffled array
  const selectedPosts = shuffledPosts.slice(0, 3);

  return (
    <main>
      <div className="relative mb-20 flex h-full min-h-screen flex-col items-center justify-between overflow-hidden p-4 md:px-16 lg:px-24">
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
                    base: "bg-gradient-to-br from-primary-100 to-success-100 border border-success-400",
                    content: "text-success-700",
                  }}
                >
                  {home.metadata.pill}
                </Chip>
              </div>
              <PageTitle />
              <p className="mx-auto w-full text-center font-sans text-lg leading-snug tracking-tight text-gray-600 dark:text-gray-400 md:text-2xl lg:max-w-3xl lg:text-3xl">
                {home.metadata.description}
              </p>
              <SignedOut>
                <StyledButton
                  as={Link}
                  color="primary"
                  variant="stylised"
                  href="/sign-up"
                >
                  Sign up
                </StyledButton>
              </SignedOut>
            </div>
          </div>
        </div>
        <div className="flex max-w-5xl flex-col gap-8">
          <SignedOut>
            <div className="mt-8 flex w-full flex-col items-center md:mt-0">
              <SectionTitle>Explore</SectionTitle>
            </div>
          </SignedOut>
          <div className="mt-8 flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
            <h3 className="flex justify-start text-center text-2xl font-medium text-zinc-700 dark:text-zinc-200">
              Some content about Design Engineering
            </h3>
            <div className="flex items-center gap-4">
              <Button
                as={Link}
                href="/resources"
                endContent={<ArrowRight className="h-4 w-4" />}
                variant="light"
                className="w-full gap-2 md:w-max"
              >
                See all resources
              </Button>
              <Button
                as={Link}
                href="/posts"
                endContent={<ArrowRight className="h-4 w-4" />}
                variant="flat"
                className="w-full gap-2 md:w-max"
              >
                See all articles
              </Button>
            </div>
          </div>
          <div className="mt-4 mx-auto grid h-auto w-full grid-cols-1 place-content-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedPosts.map((post: Type.Post) => {
              return (
                <ContentCard
                  key={post.id}
                  post={post}
                  className={cn(
                    "max-w-xs transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-default",
                  )}
                />
              );
            })}
          </div>
          <div className="mt-8 flex w-full items-center justify-center gap-4 md:mt-12">
            <SubmitArticle />
          </div>
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 md:mt-12">
            <p className="text-foreground">Proudly supported by</p>
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex items-center gap-2">
                <Image
                  src={sponsor.metadata.logo.imgix_url}
                  alt={sponsor.title}
                  className="h-12"
                />
                <span className="font-medium text-foreground">
                  {sponsor.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
