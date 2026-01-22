import { describe, it, expect, vi } from "vitest";
import path from "path";
import dotenv from "dotenv";

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Mock server-only to avoid crash in non-server env
vi.mock("server-only", () => {
  return {};
});

// Mock next/headers
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: () => null,
  }),
}));

// Mock react cache
vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    cache: (fn: any) => fn,
  };
});

// Mock server-only in lib/temporary-access.ts too if needed
// (It's already mocked globally by the first mock)

import { isValidPreviewToken } from "../preview-access";
import { createTemporaryAccessCode } from "../temporary-access";

describe("Preview Token Validation", () => {
  it("should validate a temporary access code", async () => {
    // Create a real temporary code in Cosmic (this might fail if env vars are missing)
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn("Skipping test due to missing Cosmic env vars");
      return;
    }

    try {
      const codeObj = await createTemporaryAccessCode(1);
      const code = codeObj.metadata.code;
      console.log("Created test code:", code);

      const isValid = await isValidPreviewToken(code);
      expect(isValid).toBe(true);
    } catch (error) {
      console.error("Error creating/validating code:", error);
      throw error;
    }
  }, 20000);

  it("should reject an invalid code", async () => {
    const isValid = await isValidPreviewToken("INVALID_CODE_" + Date.now());
    expect(isValid).toBe(false);
  });
});
