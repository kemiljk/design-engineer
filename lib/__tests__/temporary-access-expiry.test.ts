import { describe, it, expect, vi } from "vitest";
import path from "path";
import dotenv from "dotenv";

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

// Mock server-only
vi.mock("server-only", () => ({}));

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

import {
  validateTemporaryAccessCode,
  createTemporaryAccessCode,
} from "../temporary-access";
import { cosmic } from "../cosmic";

describe("Temporary Access Expiry Logic", () => {
  it("should validate a fresh code", async (ctx) => {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      console.warn("Skipping test due to missing Cosmic env vars");
      ctx.skip();
      return;
    }

    const codeObj = await createTemporaryAccessCode(1);
    const { isValid, reason } = await validateTemporaryAccessCode(
      codeObj.metadata.code,
    );
    expect(isValid).toBe(true);
    expect(reason).toBeUndefined();
  });

  it("should reject a used code", async (ctx) => {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      ctx.skip();
      return;
    }

    // Create a code
    const codeObj = await createTemporaryAccessCode(1);

    // Manually mark as used in Cosmic
    await cosmic.objects.updateOne(codeObj.id, {
      metadata: {
        ...codeObj.metadata,
        status: "used",
        used_at: new Date().toISOString(),
        used_by_user_id: "test-user",
      },
    });

    const { isValid, reason } = await validateTemporaryAccessCode(
      codeObj.metadata.code,
    );
    expect(isValid).toBe(false);
    expect(reason).toBe("Code already used");
  }, 20000);

  it("should reject an expired code", async (ctx) => {
    if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
      ctx.skip();
      return;
    }

    // Create a code with -1 days expiry (expired yesterday)
    const codeObj = await createTemporaryAccessCode(-1);

    const { isValid, reason } = await validateTemporaryAccessCode(
      codeObj.metadata.code,
    );
    expect(isValid).toBe(false);
    expect(reason).toBe("Code expired");
  }, 20000);
});
