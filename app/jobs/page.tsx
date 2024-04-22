import React from "react";
import { getIndustries, getJobs, getLocations } from "@/lib/cosmic";
import { Job } from "@/lib/types";
import SubmitJob from "../components/submit-job";
import * as Type from "@/lib/types";
import JobCard from "../components/job-card";
import Search from "../components/search-box";

const Jobs = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchTerm = (searchParams.search as string) || "";

  const jobs = await getJobs();
  const filteredJobs = jobs.filter((job) =>
    [
      job.title,
      job.metadata.company.title,
      ...job.metadata.location.map((loc) => loc.title),
      ...job.metadata.industry.map((ind) => ind.title),
      job.metadata.description,
    ].some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  const ind: Type.Industry[] = await getIndustries();
  const loc: Type.Location[] = await getLocations();

  return (
    <section>
      <div className="mt-4 flex w-full max-w-3xl justify-end md:mt-20">
        <div className="flex w-full gap-2">
          <Search initialSearchTerm={searchTerm} page="jobs" />
          <SubmitJob
            industries={ind
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((industry) => ({ id: industry.id, title: industry.title }))}
            locations={loc
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((location) => ({ id: location.id, title: location.title }))}
          />
        </div>
      </div>
      <article className="mx-auto mt-8 flex w-full min-w-full flex-col gap-4 lg:min-w-[48rem]">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job: Job) => <JobCard job={job} key={job.id} />)
        ) : (
          <p className="w-full max-w-full text-foreground lg:min-w-[48rem]">{`No results found for "${searchTerm}"`}</p>
        )}
      </article>
    </section>
  );
};

export default Jobs;
