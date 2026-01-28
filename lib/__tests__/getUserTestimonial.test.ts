import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockFind, mockUnstableCache } = vi.hoisted(() => {
  const mockLimit = vi.fn().mockResolvedValue({ objects: [{ id: "test-id", title: "Test Testimonial" }] });
  const mockDepth = vi.fn().mockReturnValue({ limit: mockLimit });
  const mockProps = vi.fn().mockReturnValue({ depth: mockDepth });
  const mockFind = vi.fn().mockReturnValue({ props: mockProps });
  const mockUnstableCache = vi.fn((cb) => async (...args: any[]) => cb(...args));

  return { mockFind, mockUnstableCache };
});

vi.mock("@cosmicjs/sdk", () => ({
  createBucketClient: () => ({
    objects: {
      find: mockFind,
      findOne: vi.fn(),
      insertOne: vi.fn(),
      updateOne: vi.fn()
    }
  })
}));

vi.mock("next/cache", () => ({
  unstable_cache: mockUnstableCache
}));

import { getUserTestimonial } from "../cosmic";

describe("getUserTestimonial Performance Optimization", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should retrieve user testimonial", async () => {
    const userId = "user_123";
    const result = await getUserTestimonial(userId);

    expect(result).toBeDefined();
    expect(result?.id).toBe("test-id");

    // Verify it called cosmic
    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({
        type: "testimonials",
        "metadata.user_id": userId
    }));
  });

  it("should use unstable_cache after optimization", async () => {
    const userId = "user_123";
    await getUserTestimonial(userId);

    // Expect unstable_cache to be called
    expect(mockUnstableCache).toHaveBeenCalled();
    // Verify arguments (key and tags)
    expect(mockUnstableCache).toHaveBeenCalledWith(
        expect.any(Function),
        [`user-testimonial-${userId}`],
        expect.objectContaining({
            revalidate: 300,
            tags: ["testimonials", `user-testimonial-${userId}`]
        })
    );
  });
});
