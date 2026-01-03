import { describe, it, expect } from "vitest";
import {
  isFreeEmailProvider,
  isLikelyPersonalDomain,
  shouldExcludeDomain,
  getCompanyName,
  FREE_EMAIL_PROVIDERS,
  PERSONAL_TLDS,
  KNOWN_COMPANIES,
  MIN_STUDENTS_THRESHOLD,
} from "../company-filter";

describe("Company Filter", () => {
  describe("isFreeEmailProvider", () => {
    it("should identify common free email providers", () => {
      const freeProviders = [
        "gmail.com",
        "hotmail.com",
        "yahoo.com",
        "outlook.com",
        "icloud.com",
        "protonmail.com",
        "hey.com",
      ];

      for (const provider of freeProviders) {
        expect(isFreeEmailProvider(provider)).toBe(true);
      }
    });

    it("should identify regional free email providers", () => {
      const regionalProviders = [
        "qq.com",
        "naver.com",
        "web.de",
        "orange.fr",
        "libero.it",
        "btinternet.com",
        "comcast.net",
      ];

      for (const provider of regionalProviders) {
        expect(isFreeEmailProvider(provider)).toBe(true);
      }
    });

    it("should identify educational domains", () => {
      expect(isFreeEmailProvider("stanford.edu")).toBe(true);
      expect(isFreeEmailProvider("oxford.ac.uk")).toBe(true);
      expect(isFreeEmailProvider("university.edu.au")).toBe(true);
      expect(isFreeEmailProvider("cs.mit.edu")).toBe(true);
    });

    it("should be case-insensitive", () => {
      expect(isFreeEmailProvider("Gmail.com")).toBe(true);
      expect(isFreeEmailProvider("HOTMAIL.COM")).toBe(true);
      expect(isFreeEmailProvider("Yahoo.COM")).toBe(true);
    });

    it("should not flag company domains as free providers", () => {
      const companyDomains = [
        "google.com",
        "microsoft.com",
        "apple.com",
        "stripe.com",
        "figma.com",
      ];

      for (const domain of companyDomains) {
        expect(isFreeEmailProvider(domain)).toBe(false);
      }
    });
  });

  describe("isLikelyPersonalDomain", () => {
    it("should identify personal TLD domains", () => {
      const personalDomains = [
        "john.tech",
        "sarah.me",
        "developer.dev",
        "creative.design",
        "my.studio",
        "portfolio.page",
      ];

      for (const domain of personalDomains) {
        expect(isLikelyPersonalDomain(domain)).toBe(true);
      }
    });

    it("should identify the creator's domain", () => {
      expect(isLikelyPersonalDomain("kejk.tech")).toBe(true);
      expect(isLikelyPersonalDomain("KEJK.TECH")).toBe(true);
    });

    it("should identify very short domain names as personal", () => {
      expect(isLikelyPersonalDomain("ab.com")).toBe(true);
      expect(isLikelyPersonalDomain("xyz.io")).toBe(true);
      expect(isLikelyPersonalDomain("jk.co")).toBe(true);
    });

    it("should identify short single-word domains as potentially personal", () => {
      expect(isLikelyPersonalDomain("john.com")).toBe(true);
      expect(isLikelyPersonalDomain("sarah.io")).toBe(true);
      expect(isLikelyPersonalDomain("mike.co")).toBe(true);
    });

    it("should not flag known companies even with short names", () => {
      // EA has a 2-letter domain but is a known company
      expect(isLikelyPersonalDomain("ea.com")).toBe(false);
      // X.com is known
      expect(isLikelyPersonalDomain("x.com")).toBe(false);
    });

    it("should not flag longer company-like domains", () => {
      expect(isLikelyPersonalDomain("acmecorp.com")).toBe(false);
      expect(isLikelyPersonalDomain("bigcompany.io")).toBe(false);
      expect(isLikelyPersonalDomain("techstartup.co")).toBe(false);
    });

    it("should not flag known companies with personal TLDs", () => {
      // Linear uses .app TLD - should check if in known companies
      expect(isLikelyPersonalDomain("linear.app")).toBe(false);
      expect(isLikelyPersonalDomain("notion.so")).toBe(false);
    });
  });

  describe("shouldExcludeDomain", () => {
    it("should exclude free email providers regardless of student count", () => {
      expect(shouldExcludeDomain("gmail.com", 100)).toBe(true);
      expect(shouldExcludeDomain("hotmail.com", 50)).toBe(true);
      expect(shouldExcludeDomain("yahoo.com", 1000)).toBe(true);
    });

    it("should exclude the creator's test domain", () => {
      expect(shouldExcludeDomain("kejk.tech", 1)).toBe(true);
      expect(shouldExcludeDomain("kejk.tech", 10)).toBe(true);
    });

    it("should include known companies even with 1 student", () => {
      expect(shouldExcludeDomain("google.com", 1)).toBe(false);
      expect(shouldExcludeDomain("stripe.com", 1)).toBe(false);
      expect(shouldExcludeDomain("figma.com", 1)).toBe(false);
      expect(shouldExcludeDomain("apple.com", 1)).toBe(false);
    });

    it("should exclude personal domains", () => {
      expect(shouldExcludeDomain("john.tech", 1)).toBe(true);
      expect(shouldExcludeDomain("sarah.me", 1)).toBe(true);
      expect(shouldExcludeDomain("portfolio.dev", 1)).toBe(true);
    });

    it("should exclude unknown domains with only 1 student", () => {
      expect(shouldExcludeDomain("unknowncompany.com", 1)).toBe(true);
      expect(shouldExcludeDomain("smallstartup.io", 1)).toBe(true);
    });

    it("should include unknown domains with 2+ students", () => {
      expect(shouldExcludeDomain("unknowncompany.com", 2)).toBe(false);
      expect(shouldExcludeDomain("smallstartup.io", 5)).toBe(false);
      expect(shouldExcludeDomain("newcompany.co", 10)).toBe(false);
    });

    it("should be case-insensitive", () => {
      expect(shouldExcludeDomain("Gmail.COM", 100)).toBe(true);
      expect(shouldExcludeDomain("GOOGLE.com", 1)).toBe(false);
      expect(shouldExcludeDomain("Stripe.Com", 1)).toBe(false);
    });
  });

  describe("getCompanyName", () => {
    it("should return known company names correctly", () => {
      expect(getCompanyName("google.com")).toBe("Google");
      expect(getCompanyName("meta.com")).toBe("Meta");
      expect(getCompanyName("facebook.com")).toBe("Meta");
      expect(getCompanyName("x.com")).toBe("X");
      expect(getCompanyName("twitter.com")).toBe("X");
    });

    it("should format unknown domains nicely", () => {
      expect(getCompanyName("acmecorp.com")).toBe("Acmecorp");
      expect(getCompanyName("tech-startup.io")).toBe("Tech Startup");
      expect(getCompanyName("big_company.co")).toBe("Big Company");
    });

    it("should capitalise properly", () => {
      expect(getCompanyName("mycompany.com")).toBe("Mycompany");
      expect(getCompanyName("BIGCORP.com")).toBe("Bigcorp");
    });

    it("should be case-insensitive for known companies", () => {
      expect(getCompanyName("GOOGLE.COM")).toBe("Google");
      expect(getCompanyName("Stripe.com")).toBe("Stripe");
      expect(getCompanyName("figma.COM")).toBe("Figma");
    });

    it("should handle hyphenated and underscored names", () => {
      expect(getCompanyName("my-awesome-startup.com")).toBe("My Awesome Startup");
      expect(getCompanyName("cool_tech_company.io")).toBe("Cool Tech Company");
    });
  });

  describe("Constants", () => {
    it("should have comprehensive free email providers", () => {
      expect(FREE_EMAIL_PROVIDERS.size).toBeGreaterThan(50);
      expect(FREE_EMAIL_PROVIDERS.has("gmail.com")).toBe(true);
      expect(FREE_EMAIL_PROVIDERS.has("outlook.com")).toBe(true);
    });

    it("should have personal TLDs defined", () => {
      expect(PERSONAL_TLDS.size).toBeGreaterThan(10);
      expect(PERSONAL_TLDS.has("tech")).toBe(true);
      expect(PERSONAL_TLDS.has("me")).toBe(true);
      expect(PERSONAL_TLDS.has("dev")).toBe(true);
    });

    it("should have known companies defined", () => {
      expect(Object.keys(KNOWN_COMPANIES).length).toBeGreaterThan(50);
      expect(KNOWN_COMPANIES["google.com"]).toBe("Google");
      expect(KNOWN_COMPANIES["stripe.com"]).toBe("Stripe");
    });

    it("should have a reasonable minimum student threshold", () => {
      expect(MIN_STUDENTS_THRESHOLD).toBe(2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings gracefully", () => {
      // Empty strings are excluded (treated as invalid/personal)
      expect(isFreeEmailProvider("")).toBe(false);
      expect(isLikelyPersonalDomain("")).toBe(true); // Empty is treated as invalid
      expect(shouldExcludeDomain("", 1)).toBe(true); // Empty should be excluded
    });

    it("should handle domains with multiple dots", () => {
      expect(isFreeEmailProvider("mail.google.com")).toBe(false);
      expect(shouldExcludeDomain("subdomain.company.com", 2)).toBe(false);
    });

    it("should handle country-code TLDs", () => {
      expect(isFreeEmailProvider("yahoo.co.uk")).toBe(true);
      expect(isFreeEmailProvider("hotmail.co.uk")).toBe(true);
      expect(shouldExcludeDomain("company.co.uk", 2)).toBe(false);
    });

    it("should not match partial domain names", () => {
      // "gmail.company.com" should not be flagged just because it contains "gmail"
      expect(isFreeEmailProvider("gmail.company.com")).toBe(false);
    });
  });

  describe("Real-world Scenarios", () => {
    it("should correctly filter a mix of domains", () => {
      const testCases = [
        { domain: "gmail.com", count: 50, shouldExclude: true, reason: "free email" },
        { domain: "google.com", count: 1, shouldExclude: false, reason: "known company" },
        { domain: "kejk.tech", count: 1, shouldExclude: true, reason: "creator domain" },
        { domain: "john.dev", count: 1, shouldExclude: true, reason: "personal TLD" },
        { domain: "newstartup.com", count: 1, shouldExclude: true, reason: "unknown, low count" },
        { domain: "newstartup.com", count: 3, shouldExclude: false, reason: "unknown, high count" },
        { domain: "stripe.com", count: 1, shouldExclude: false, reason: "known company" },
        { domain: "protonmail.com", count: 100, shouldExclude: true, reason: "free email" },
        { domain: "stanford.edu", count: 5, shouldExclude: true, reason: "educational" },
      ];

      for (const { domain, count, shouldExclude, reason } of testCases) {
        expect(shouldExcludeDomain(domain, count)).toBe(shouldExclude);
      }
    });
  });
});
