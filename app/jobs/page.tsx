import React from "react";
import { getJobs } from "@/lib/cosmic";
import { Job } from "@/lib/types";
import JobCard from "../components/job-card";
import Search from "../components/search-box";
import { StyledButton as Button } from "@/app/components/styled-button";
import { CheckCheckIcon, HandshakeIcon } from "lucide-react";
import { Link } from "@nextui-org/link";
import { SignedIn } from "@clerk/nextjs";
import SectionTitle from "../components/section-title";

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

  return (
    <section>
      <SectionTitle>Hiring</SectionTitle>
      <div className="mt-4 flex w-full max-w-3xl justify-end">
        <div className="flex w-full flex-col gap-2 md:flex-row">
          <Search initialSearchTerm={searchTerm} page="jobs" />
          <SignedIn>
            <div className="flex gap-x-2 md:w-3/4 lg:w-2/3">
              <Button
                as={Link}
                href="/jobs/task-builder"
                variant="flat"
                className="w-full gap-2 md:w-max"
                startContent={<CheckCheckIcon className="shrink-0" size={16} />}
              >
                Create Take-Home Task
              </Button>
              <Button
                as={Link}
                href="/jobs/submit-job"
                color="primary"
                variant="stylised"
                className="w-full gap-2 md:w-max"
                startContent={<HandshakeIcon className="shrink-0" size={16} />}
              >
                Generate Job Posting
              </Button>
            </div>
          </SignedIn>
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
