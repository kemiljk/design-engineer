"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Company {
  domain: string;
  name: string;
  logoUrl: string;
}

interface StudentCompaniesData {
  companies: Company[];
  studentCount: number;
}

export function StudentCompanies() {
  const [data, setData] = useState<StudentCompaniesData | null>(null);

  useEffect(() => {
    fetch("/api/course/student-companies")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  // Don't show if no companies or still loading
  if (!data || data.companies.length === 0) {
    return null;
  }

  return (
    <div className="py-12">
      <p className="mb-6 text-center text-sm text-neutral-500">
        Students from leading companies
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {data.companies.map((company) => (
          <div
            key={company.domain}
            className="group flex items-center gap-2 grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
            title={company.name}
          >
            <Image
              src={company.logoUrl}
              alt={company.name}
              width={24}
              height={24}
              className="h-6 w-6"
              unoptimized // Google favicon service doesn't support optimization
            />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {company.name}
            </span>
          </div>
        ))}
      </div>
      {data.studentCount > 0 && (
        <p className="mt-6 text-center text-xs text-neutral-400">
          Join {data.studentCount}+ students learning Design Engineering
        </p>
      )}
    </div>
  );
}

// Static version for when you want to manually specify companies
// Useful before you have real student data
export function StudentCompaniesStatic({ 
  companies 
}: { 
  companies: { name: string; domain: string }[] 
}) {
  if (companies.length === 0) return null;

  return (
    <div className="py-12">
      <p className="mb-6 text-center text-sm text-neutral-500">
        Trusted by designers and engineers at
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {companies.map((company) => (
          <div
            key={company.domain}
            className="flex items-center gap-2 grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
            title={company.name}
          >
            <Image
              src={`https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`}
              alt={company.name}
              width={24}
              height={24}
              className="h-6 w-6"
              unoptimized
            />
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              {company.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
