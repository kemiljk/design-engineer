import React from "react";
import SubmitJobForm from "@/app/components/submit-job-form";
import { getIndustries, getLocations } from "@/lib/cosmic";
import * as Type from "@/lib/types";
import SectionTitle from "@/app/components/section-title";

async function SubmitJobPage() {
  const ind: Type.Industry[] = await getIndustries();
  const loc: Type.Location[] = await getLocations();

  return (
    <div>
      <SectionTitle>Submit a Job</SectionTitle>
      <div>
        <p className="mb-4 text-sm leading-normal text-gray-500 dark:text-gray-300">
          Submit your role for inclusion on our site. It should be for a role
          that is relevant to a software Design Engineer, UI Engineer, UX
          Engineer, Design Technologist or similar.
        </p>
      </div>
      <SubmitJobForm
        industries={ind
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((industry) => ({ id: industry.id, title: industry.title }))}
        locations={loc
          .sort((a, b) => a.title.localeCompare(b.title))
          .map((location) => ({ id: location.id, title: location.title }))}
      />
    </div>
  );
}

export default SubmitJobPage;
