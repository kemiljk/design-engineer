import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { cosmic } from "@/lib/cosmic";

// Domains to exclude (personal email providers)
const EXCLUDED_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk",
  "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com",
  "protonmail.com", "proton.me", "fastmail.com", "zoho.com",
  "yandex.com", "mail.com", "gmx.com", "gmx.net", "tutanota.com",
  "hey.com", "pm.me", "duck.com",
]);

// Well-known companies for better display names
const COMPANY_NAMES: Record<string, string> = {
  "apple.com": "Apple", "google.com": "Google", "microsoft.com": "Microsoft",
  "amazon.com": "Amazon", "meta.com": "Meta", "facebook.com": "Meta",
  "netflix.com": "Netflix", "airbnb.com": "Airbnb", "stripe.com": "Stripe",
  "figma.com": "Figma", "vercel.com": "Vercel", "github.com": "Github",
  "shopify.com": "Shopify", "spotify.com": "Spotify", "twitter.com": "X",
  "x.com": "X", "linkedin.com": "LinkedIn", "salesforce.com": "Salesforce",
  "adobe.com": "Adobe", "atlassian.com": "Atlassian", "slack.com": "Slack",
  "dropbox.com": "Dropbox", "notion.so": "Notion", "linear.app": "Linear",
  "framer.com": "Framer", "webflow.com": "Webflow", "canva.com": "Canva",
  "intercom.com": "Intercom", "hubspot.com": "HubSpot", "twilio.com": "Twilio",
  "datadog.com": "Datadog", "mongodb.com": "MongoDB", "elastic.co": "Elastic",
  "cloudflare.com": "Cloudflare", "digitalocean.com": "DigitalOcean",
};

function getCompanyName(domain: string): string {
  if (COMPANY_NAMES[domain]) return COMPANY_NAMES[domain];
  
  return domain
    .replace(/\.(com|io|co|org|net|app|dev|xyz|so|ai)$/, "")
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

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

      // Extract unique domains
      const domainCounts = new Map<string, number>();
      
      for (const enrollment of enrollments) {
        const domain = (enrollment.metadata as { email_domain?: string })?.email_domain;
        if (domain && !EXCLUDED_DOMAINS.has(domain)) {
          domainCounts.set(domain, (domainCounts.get(domain) || 0) + 1);
        }
      }

      // Sort by count and take top companies
      const companies = Array.from(domainCounts.entries())
        .sort((a, b) => b[1] - a[1])
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
