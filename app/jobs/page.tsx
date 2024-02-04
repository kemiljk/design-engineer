import React from "react";
import { Button } from "@nextui-org/react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { getIndustries, getJobs, getLocations } from "@/lib/cosmic";
import { Job } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import SubmitJob from "../components/submit-job";
import * as Type from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

const Jobs = async () => {
  const jobs = await getJobs();
  const ind: Type.Industry[] = await getIndustries();
  const loc: Type.Location[] = await getLocations();

  return (
    <section>
      <div className="mt-4 flex w-full max-w-3xl justify-end md:mt-20">
        <SubmitJob
          industries={ind
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((industry) => ({ id: industry.id, title: industry.title }))}
          locations={loc
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((location) => ({ id: location.id, title: location.title }))}
        />
      </div>
      <article className="mx-auto mt-8 flex w-full max-w-3xl flex-col gap-4">
        {jobs.map((job: Job) => (
          <Card
            key={job.id}
            className="mx-auto flex w-full flex-col items-start justify-center gap-4 p-4"
          >
            <CardHeader className="flex w-full items-center gap-4 text-black dark:text-white">
              {job.metadata.company.metadata?.logo && (
                <Image
                  className="h-11 w-11 rounded-full border border-zinc-100 object-cover dark:border-zinc-700"
                  src={job.metadata.company.metadata?.logo.imgix_url ?? ""}
                  width={120}
                  height={120}
                  alt={`${job.metadata.company.title} company logo`}
                />
              )}
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-1 md:gap-x-2">
                    <h1 className="text-start text-base leading-snug text-black dark:text-white md:text-lg">
                      {job.title}
                    </h1>
                    <span className="text-base text-gray-700 dark:text-gray-300">
                      @
                    </span>
                    <h2 className="text-base leading-snug text-black dark:text-white md:text-lg">
                      {job.metadata.company.title}
                    </h2>
                  </div>
                  <div className="flex w-max items-center gap-2 font-medium tracking-normal">
                    {job.metadata.location.map((location, index) => (
                      <React.Fragment key={location.id}>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {location.title}
                        </p>
                        {index < job.metadata.location.length - 1 && (
                          <span className="text-sm">•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
                <div className="hidden items-center gap-4 md:flex">
                  {job.metadata.industry.map((industry) => (
                    <p
                      key={industry.id}
                      style={{
                        backgroundColor: `${industry.metadata.colour}55`,
                      }}
                      className="rounded-full px-2 py-1 text-center text-xs text-black dark:text-white"
                    >
                      {industry.title}
                    </p>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardBody className="text-gray-800 dark:text-gray-200">
              <div className="mb-4 flex items-center gap-4 md:hidden">
                {job.metadata.industry.map((industry) => (
                  <p
                    key={industry.id}
                    style={{
                      backgroundColor: `${industry.metadata.colour}55`,
                    }}
                    className="rounded-full px-2 py-1 text-center text-xs text-black dark:text-white"
                  >
                    {industry.title}
                  </p>
                ))}
              </div>
              <Markdown className="m-auto line-clamp-3 h-max w-full text-sm">
                {job.metadata.description}
              </Markdown>
            </CardBody>
            <Link href={job.metadata.url} target="_blank">
              <Button
                endContent={<ArrowUpRight className="size-4 text-current" />}
                variant="bordered"
              >
                View Job
              </Button>
            </Link>
          </Card>
        ))}
      </article>
    </section>
  );
};

export default Jobs;
