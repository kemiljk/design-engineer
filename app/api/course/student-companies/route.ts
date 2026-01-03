import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { cosmic } from "@/lib/cosmic";
import { shouldExcludeDomain, getCompanyName } from "@/lib/company-filter";

const getStudentCompanies = unstable_cache(
  async () => {
    try {
      const { objects: enrollments } = await cosmic.objects
        .find({ type: "course-enrollments" })
        .props("metadata")
        .limit(500);

      if (!enrollments || enrollments.length === 0) {
        return { companies: [], studentCount: 0 };
      }

      // Count students per domain
      const domainCounts = new Map<string, number>();
      
      for (const enrollment of enrollments) {
        const domain = (enrollment.metadata as { email_domain?: string })?.email_domain;
        if (domain) {
          const lowerDomain = domain.toLowerCase();
          domainCounts.set(lowerDomain, (domainCounts.get(lowerDomain) || 0) + 1);
        }
      }

      // Filter and sort companies
      const companies = Array.from(domainCounts.entries())
        // Filter out excluded domains
        .filter(([domain, count]) => !shouldExcludeDomain(domain, count))
        // Sort by count (most students first), then alphabetically
        .sort((a, b) => {
          if (b[1] !== a[1]) return b[1] - a[1];
          return a[0].localeCompare(b[0]);
        })
        // Take top 20 companies
        .slice(0, 20)
        .map(([domain]) => ({
          domain,
          name: getCompanyName(domain),
          logoUrl: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        }));

      return {
        companies,
        studentCount: enrollments.length,
      };
    } catch (error) {
      console.error("Error fetching student companies:", error);
      return { companies: [], studentCount: 0 };
    }
  },
  ["student-companies"],
  { revalidate: 3600 } // Cache for 1 hour
);

export async function GET() {
  const data = await getStudentCompanies();
  return NextResponse.json(data);
}
