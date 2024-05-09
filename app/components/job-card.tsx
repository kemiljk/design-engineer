import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { ArrowUpRight } from "lucide-react";
import Markdown from "react-markdown";
import * as Type from "@/lib/types";
import Image from "next/image";
import { format } from "date-fns";

const JobCard = ({ job }: { job: Type.Job }) => {
  return (
    <Card
      key={job.id}
      className="mx-auto flex w-full flex-col items-start justify-center p-2"
    >
      <CardHeader className="flex w-full items-center gap-4 text-foreground ">
        {job.metadata.company.metadata?.logo && (
          <Image
            className="h-11 w-11 rounded-md border border-zinc-100 object-cover p-1 dark:border-zinc-700"
            src={job.metadata.company.metadata?.logo.imgix_url ?? ""}
            width={120}
            height={120}
            alt={`${job.metadata.company.title} company logo`}
          />
        )}
        <div className="flex w-full justify-between">
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-x-1 md:gap-x-2">
              <h1 className="text-start text-base leading-snug text-foreground  md:text-lg">
                {job.title}
              </h1>
              <span className="text-base text-gray-700 dark:text-gray-300">
                @
              </span>
              <h2 className="text-base leading-snug text-foreground  md:text-lg">
                {job.metadata.company.title}
              </h2>
            </div>
            <div className="flex w-full flex-wrap items-center gap-2 font-medium">
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
              {job.metadata.posted && (
                <>
                  <span className="text-sm">•</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {format(new Date(job.metadata.posted), "do MMMM yyyy")}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            {job.metadata.industry.map((industry) => (
              <p
                key={industry.id}
                style={{
                  backgroundColor: `${industry.metadata.colour}55`,
                }}
                className="rounded-full px-2 py-1 text-center text-xs text-foreground "
              >
                {industry.title}
              </p>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardBody className="text-gray-800 dark:text-gray-200">
        <div className="flex items-center md:hidden">
          {job.metadata.industry.map((industry) => (
            <p
              key={industry.id}
              style={{
                backgroundColor: `${industry.metadata.colour}55`,
              }}
              className="rounded-full px-2 py-1 text-center text-xs text-foreground "
            >
              {industry.title}
            </p>
          ))}
        </div>
        <Markdown className="mt-4 line-clamp-3 h-max w-full text-sm lg:mt-0">
          {job.metadata.description}
        </Markdown>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href={job.metadata.url}
          target="_blank"
          endContent={<ArrowUpRight className="size-4 text-current" />}
          variant="bordered"
        >
          View Job
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
