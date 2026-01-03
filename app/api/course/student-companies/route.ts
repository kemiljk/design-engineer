import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { cosmic } from "@/lib/cosmic";

// Free email providers to exclude
const FREE_EMAIL_PROVIDERS = new Set([
  // Google
  "gmail.com", "googlemail.com",
  // Microsoft
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.it",
  "outlook.com", "outlook.co.uk", "live.com", "live.co.uk", "msn.com",
  // Yahoo
  "yahoo.com", "yahoo.co.uk", "yahoo.fr", "yahoo.de", "yahoo.it", "yahoo.ca",
  "ymail.com", "rocketmail.com",
  // Apple
  "icloud.com", "me.com", "mac.com",
  // AOL/Verizon
  "aol.com", "aol.co.uk", "aim.com",
  // Privacy-focused
  "protonmail.com", "protonmail.ch", "proton.me", "pm.me",
  "tutanota.com", "tutanota.de", "tutamail.com",
  "fastmail.com", "fastmail.fm",
  // Other free providers
  "zoho.com", "yandex.com", "yandex.ru",
  "mail.com", "email.com", "usa.com",
  "gmx.com", "gmx.net", "gmx.de", "gmx.co.uk",
  "hey.com", "duck.com",
  "mailinator.com", "guerrillamail.com", "tempmail.com",
  "cock.li", "420blaze.it",
  // Regional providers
  "qq.com", "163.com", "126.com", "sina.com",
  "naver.com", "daum.net", "hanmail.net",
  "web.de", "t-online.de", "freenet.de",
  "libero.it", "virgilio.it", "alice.it",
  "orange.fr", "wanadoo.fr", "sfr.fr", "free.fr",
  "btinternet.com", "sky.com", "virginmedia.com", "talktalk.net",
  "comcast.net", "verizon.net", "att.net", "sbcglobal.net", "bellsouth.net",
  "cox.net", "charter.net", "earthlink.net", "juno.com", "netzero.com",
  "shaw.ca", "rogers.com", "sympatico.ca",
  // Educational (already filtered by student-discount, but exclude here too)
  "edu", "ac.uk", "edu.au",
]);

// TLDs commonly used for personal websites/portfolios
const PERSONAL_TLDS = new Set([
  "tech", "me", "dev", "design", "studio", "page", "site", "website",
  "blog", "codes", "engineer", "digital", "works", "name", "info",
  "portfolio", "photo", "pics", "photography", "art", "graphics",
]);

// Specific domains to exclude (creator/test accounts, known personal sites)
const EXCLUDED_SPECIFIC_DOMAINS = new Set([
  "kejk.tech", // Creator's domain
]);

// Well-known companies for better display names
const KNOWN_COMPANIES: Record<string, string> = {
  // Big Tech
  "apple.com": "Apple", "google.com": "Google", "microsoft.com": "Microsoft",
  "amazon.com": "Amazon", "meta.com": "Meta", "facebook.com": "Meta",
  "netflix.com": "Netflix", "twitter.com": "X", "x.com": "X",
  "linkedin.com": "LinkedIn", "uber.com": "Uber", "lyft.com": "Lyft",
  "airbnb.com": "Airbnb", "doordash.com": "DoorDash", "instacart.com": "Instacart",
  // Design & Creative Tools
  "figma.com": "Figma", "adobe.com": "Adobe", "canva.com": "Canva",
  "framer.com": "Framer", "webflow.com": "Webflow", "sketch.com": "Sketch",
  "invisionapp.com": "InVision", "principle.com": "Principle",
  // Developer Tools & Infrastructure
  "vercel.com": "Vercel", "github.com": "GitHub", "gitlab.com": "GitLab",
  "atlassian.com": "Atlassian", "jetbrains.com": "JetBrains",
  "hashicorp.com": "HashiCorp", "docker.com": "Docker",
  "cloudflare.com": "Cloudflare", "digitalocean.com": "DigitalOcean",
  "heroku.com": "Heroku", "netlify.com": "Netlify", "railway.app": "Railway",
  // Productivity & SaaS
  "slack.com": "Slack", "notion.so": "Notion", "linear.app": "Linear",
  "asana.com": "Asana", "monday.com": "Monday.com", "clickup.com": "ClickUp",
  "airtable.com": "Airtable", "coda.io": "Coda", "miro.com": "Miro",
  "dropbox.com": "Dropbox", "box.com": "Box",
  // E-commerce & Payments
  "stripe.com": "Stripe", "shopify.com": "Shopify", "squarespace.com": "Squarespace",
  "wix.com": "Wix", "bigcommerce.com": "BigCommerce", "paypal.com": "PayPal",
  "adyen.com": "Adyen", "plaid.com": "Plaid",
  // CRM & Marketing
  "salesforce.com": "Salesforce", "hubspot.com": "HubSpot",
  "intercom.com": "Intercom", "zendesk.com": "Zendesk",
  "mailchimp.com": "Mailchimp", "sendgrid.com": "SendGrid",
  // Data & Analytics
  "datadog.com": "Datadog", "splunk.com": "Splunk", "newrelic.com": "New Relic",
  "segment.com": "Segment", "amplitude.com": "Amplitude", "mixpanel.com": "Mixpanel",
  // Databases & Backend
  "mongodb.com": "MongoDB", "elastic.co": "Elastic", "cockroachlabs.com": "Cockroach Labs",
  "planetscale.com": "PlanetScale", "supabase.com": "Supabase", "fauna.com": "Fauna",
  // Communication
  "twilio.com": "Twilio", "zoom.us": "Zoom", "discord.com": "Discord",
  "spotify.com": "Spotify",
  // Finance & Fintech
  "revolut.com": "Revolut", "wise.com": "Wise", "monzo.com": "Monzo",
  "n26.com": "N26", "chime.com": "Chime", "robinhood.com": "Robinhood",
  // Enterprise
  "ibm.com": "IBM", "oracle.com": "Oracle", "sap.com": "SAP",
  "vmware.com": "VMware", "redhat.com": "Red Hat", "cisco.com": "Cisco",
  "dell.com": "Dell", "hp.com": "HP", "intel.com": "Intel", "nvidia.com": "NVIDIA",
  "qualcomm.com": "Qualcomm", "amd.com": "AMD",
  // Media & Entertainment
  "disney.com": "Disney", "warnerbros.com": "Warner Bros", "nbcuniversal.com": "NBCUniversal",
  "nytimes.com": "The New York Times", "bbc.co.uk": "BBC", "guardian.co.uk": "The Guardian",
  // Gaming
  "ea.com": "EA", "epicgames.com": "Epic Games", "riotgames.com": "Riot Games",
  "unity3d.com": "Unity", "unity.com": "Unity",
  // Consulting & Agencies
  "mckinsey.com": "McKinsey", "bcg.com": "BCG", "bain.com": "Bain",
  "deloitte.com": "Deloitte", "pwc.com": "PwC", "ey.com": "EY", "kpmg.com": "KPMG",
  "accenture.com": "Accenture", "thoughtworks.com": "Thoughtworks",
  "ideo.com": "IDEO", "frog.co": "frog", "pentagram.com": "Pentagram",
};

// Minimum number of students required from a domain to be shown (unless it's a known company)
const MIN_STUDENTS_THRESHOLD = 2;

/**
 * Check if a domain looks like a personal website rather than a company
 */
function isLikelyPersonalDomain(domain: string): boolean {
  const lowerDomain = domain.toLowerCase();
  
  // Check if it's in the specific exclusion list
  if (EXCLUDED_SPECIFIC_DOMAINS.has(lowerDomain)) {
    return true;
  }
  
  // Extract TLD
  const parts = lowerDomain.split(".");
  const tld = parts[parts.length - 1];
  const domainName = parts[0];
  
  // Check for personal TLDs
  if (PERSONAL_TLDS.has(tld)) {
    // Exception: if it's a known company, don't exclude
    if (KNOWN_COMPANIES[lowerDomain]) {
      return false;
    }
    return true;
  }
  
  // Very short domain names (3 chars or less) are often personal
  // Exception: well-known short domains
  if (domainName.length <= 3 && !KNOWN_COMPANIES[lowerDomain]) {
    return true;
  }
  
  // Domain looks like a person's name (single word, no numbers, ends with common TLD)
  // This is a heuristic - single lowercase word domains are often personal
  const personalNamePattern = /^[a-z]+\.(com|co|io|net|org)$/;
  if (personalNamePattern.test(lowerDomain) && domainName.length <= 10 && !KNOWN_COMPANIES[lowerDomain]) {
    // Additional check: if the domain name could be a first name (common pattern for personal sites)
    // We're conservative here - only flag very short single-word domains
    if (domainName.length <= 6) {
      return true;
    }
  }
  
  return false;
}

/**
 * Check if a domain is a free email provider
 */
function isFreeEmailProvider(domain: string): boolean {
  const lowerDomain = domain.toLowerCase();
  
  // Direct match
  if (FREE_EMAIL_PROVIDERS.has(lowerDomain)) {
    return true;
  }
  
  // Check for educational domains
  if (lowerDomain.endsWith(".edu") || lowerDomain.endsWith(".ac.uk") || lowerDomain.endsWith(".edu.au")) {
    return true;
  }
  
  return false;
}

/**
 * Check if a domain should be excluded
 */
function shouldExcludeDomain(domain: string, studentCount: number): boolean {
  const lowerDomain = domain.toLowerCase();
  
  // Always exclude free email providers
  if (isFreeEmailProvider(lowerDomain)) {
    return true;
  }
  
  // Always exclude specific domains
  if (EXCLUDED_SPECIFIC_DOMAINS.has(lowerDomain)) {
    return true;
  }
  
  // Known companies are always included
  if (KNOWN_COMPANIES[lowerDomain]) {
    return false;
  }
  
  // Exclude likely personal domains
  if (isLikelyPersonalDomain(lowerDomain)) {
    return true;
  }
  
  // For unknown domains, require minimum student count
  if (studentCount < MIN_STUDENTS_THRESHOLD) {
    return true;
  }
  
  return false;
}

/**
 * Get the display name for a company domain
 */
function getCompanyName(domain: string): string {
  const lowerDomain = domain.toLowerCase();
  
  // Use known company name if available
  if (KNOWN_COMPANIES[lowerDomain]) {
    return KNOWN_COMPANIES[lowerDomain];
  }
  
  // Generate a display name from the domain
  // Remove TLD and format nicely
  return domain
    .split(".")[0]
    .replace(/[-_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
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
