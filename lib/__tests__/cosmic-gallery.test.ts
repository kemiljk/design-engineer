import { describe, it, expect, vi, beforeEach } from 'vitest';

// Use vi.hoisted to ensure the mock object is initialized before the mock factory runs
const { mockObjects, mockUnstableCache } = vi.hoisted(() => {
  const mockUnstableCache = vi.fn((fn) => fn);
  return {
    mockObjects: {
      find: vi.fn(),
    },
    mockUnstableCache,
  };
});

vi.mock('@cosmicjs/sdk', () => ({
  createBucketClient: () => ({
    objects: mockObjects,
  }),
}));

vi.mock('next/cache', () => ({
  unstable_cache: mockUnstableCache,
}));

// Import after mocks
import { getUserGalleryProjects } from '../cosmic';

describe('getUserGalleryProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch gallery projects for a user', async () => {
    const userId = 'user_123';
    const mockProjects = [{ id: '1', title: 'Project 1' }];

    // Setup chainable mock structure matching the implementation:
    // cosmic.objects.find(...).props(...).depth(...).sort(...)
    const mockSort = vi.fn().mockResolvedValue({ objects: mockProjects });
    const mockDepth = vi.fn().mockReturnValue({ sort: mockSort });
    const mockProps = vi.fn().mockReturnValue({ depth: mockDepth });

    mockObjects.find.mockReturnValue({ props: mockProps });

    const result = await getUserGalleryProjects(userId);

    // Verify cosmic call
    expect(mockObjects.find).toHaveBeenCalledWith({
      type: 'gallery-projects',
      'metadata.user_id': userId,
    });

    // Verify result
    expect(result).toEqual(mockProjects);

    // Verify unstable_cache usage
    expect(mockUnstableCache).toHaveBeenCalled();
    const cacheCallArgs = mockUnstableCache.mock.calls[0];
    // arg 0 is the function
    // arg 1 is the key parts
    // arg 2 is the options

    expect(cacheCallArgs[1]).toEqual([`user-gallery-projects-${userId}`]);
    expect(cacheCallArgs[2]).toEqual({
      revalidate: 300,
      tags: ["gallery-projects", `user-gallery-projects-${userId}`],
    });
  });
});
