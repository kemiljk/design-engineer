import React from "react";
import { getIndustries, getJobs, getLocations } from "@/lib/cosmic";
import { Job } from "@/lib/types";
import SubmitJob from "../components/submit-job";
import * as Type from "@/lib/types";
import JobCard from "../components/job-card";

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
          <JobCard job={job} key={job.id} />
        ))}
      </article>
    </section>
  );
};

export default Jobs;
