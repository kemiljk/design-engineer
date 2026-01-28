import { describe, it, expect, beforeEach } from 'vitest';

const mockFind = vi.fn();
const mockProps = vi.fn();
const mockDepth = vi.fn();
const mockSort = vi.fn();
const mockLimit = vi.fn();

vi.mock('server-only', () => ({}));

vi.mock('../cosmic', () => ({
  cosmic: {
    objects: {
      find: mockFind
    }
  }
}));

describe('getUserNotes performance', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup chain
    mockFind.mockReturnValue({ props: mockProps });
    mockProps.mockReturnValue({ depth: mockDepth });
    mockDepth.mockReturnValue({ sort: mockSort });

    // Update chain for optimization: sort returns object with limit
    const mockSortReturn = { limit: mockLimit };
    mockSort.mockReturnValue(mockSortReturn);
    mockLimit.mockReturnValue(Promise.resolve({ objects: [] }));
  });

  it('should limit results by default to 100', async () => {
    const { getUserNotes } = await import('../course');

    await getUserNotes('user_123');

    expect(mockFind).toHaveBeenCalledWith(expect.objectContaining({
      type: 'course-notes',
      'metadata.user_id': 'user_123'
    }));

    // Verify chain
    expect(mockProps).toHaveBeenCalled();
    expect(mockDepth).toHaveBeenCalled();
    expect(mockSort).toHaveBeenCalledWith('-created_at');
    expect(mockLimit).toHaveBeenCalledWith(100);
  });

  it('should accept custom limit', async () => {
    const { getUserNotes } = await import('../course');

    await getUserNotes('user_123', undefined, 50);

    expect(mockLimit).toHaveBeenCalledWith(50);
  });
});
