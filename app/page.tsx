import PageTitle from "./components/page-title";
import { WaitlistForm } from "./components/waitlist-form";
import { BlurShape } from "./components/blur-shape";
import { getHome, getPosts } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import { ContentCard } from "@/app/components/content-card";
import cn from "classnames";
import SectionTitle from "./components/section-title";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { ArrowRight } from "lucide-react";
import SubmitArticle from "./components/submit-article";
import SubmitJob from "./components/submit-job";
import { getIndustries, getJobs, getLocations } from "@/lib/cosmic";
import JobCard from "./components/job-card";
import Presence from "./components/presence";

export const dynamic = "force-dynamic";

export default async function Home() {
  const home = await getHome();
  const posts = await getPosts();
  const jobs = await getJobs();
  const ind: Type.Industry[] = await getIndustries();
  const loc: Type.Location[] = await getLocations();

  return (
    <Presence roomId="live-cursors">
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
                <WaitlistForm width="full" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <div className="mt-8 flex w-full flex-col items-center md:mt-0">
              <SectionTitle>While you wait</SectionTitle>
            </div>
            <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-between">
              <h3 className="flex justify-start text-center text-2xl font-medium text-zinc-700 dark:text-zinc-200">
                The latest jobs for Design Engineers
              </h3>
              <Button
                as={Link}
                href="/jobs"
                endContent={<ArrowRight className="h-4 w-4" />}
                color="default"
                variant="flat"
                className="w-full gap-2 md:w-max"
              >
                See all jobs
              </Button>
            </div>
            <div className="mt-4 grid w-full grid-cols-1 justify-evenly gap-8 lg:grid-cols-2">
              {jobs.slice(0, 4).map((job: Type.Job) => (
                <JobCard job={job} key={job.id} />
              ))}
            </div>
            <div className="mt-8 flex w-full items-center justify-center gap-4 md:mt-12">
              <SubmitJob
                industries={ind
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((industry) => ({
                    id: industry.id,
                    title: industry.title,
                  }))}
                locations={loc
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((location) => ({
                    id: location.id,
                    title: location.title,
                  }))}
              />
            </div>
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
            <div className="mt-4 flex w-full flex-wrap justify-evenly gap-8">
              {posts.slice(0, 4).map((post: Type.Post) => {
                const rotationClass =
                  Math.random() < 0.5 ? `-rotate-3` : `rotate-2`;
                return (
                  <ContentCard
                    key={post.id}
                    post={post}
                    className={cn(
                      rotationClass,
                      "max-w-xs transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-default",
                    )}
                  />
                );
              })}
            </div>
            <div className="mt-8 flex w-full items-center justify-center gap-4 md:mt-12">
              <SubmitArticle />
            </div>
          </div>
        </div>
      </main>
    </Presence>
  );
}
