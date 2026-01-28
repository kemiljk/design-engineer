import { describe, expect, it, vi, beforeEach } from "vitest";
import { PATCH } from "../route";

// Mock dependencies
// Note: Hoisting issues might happen if we use variables inside vi.mock factory unless they are starting with "mock" in some jest configs, but vitest usually handles it if they are hoisted or we import them.
// To be safe, I'll inline the mock implementations or use vi.fn inside the factory.

const mockUpdateNote = vi.fn();
const mockRequireCourseAvailable = vi.fn();
const mockAuth = vi.fn();

vi.mock("@/lib/course", () => ({
  updateNote: (...args: any[]) => mockUpdateNote(...args),
  getUserNotes: vi.fn(() => Promise.resolve([])),
  createNote: vi.fn(() => Promise.resolve({})),
  deleteNote: vi.fn(() => Promise.resolve()),
}));

vi.mock("@/lib/course-availability", () => ({
  requireCourseAvailable: (...args: any[]) => mockRequireCourseAvailable(...args),
}));

vi.mock("@clerk/nextjs/server", () => ({
  auth: (...args: any[]) => mockAuth(...args),
}));

describe("PATCH /api/course/notes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateNote.mockResolvedValue({});
    mockRequireCourseAvailable.mockResolvedValue(null);
    mockAuth.mockResolvedValue({ userId: "test-user" });
  });

  it("should update is_pinned when provided", async () => {
    const noteId = "test-note-id";
    const isPinned = true;

    // Create a mock request
    const body = JSON.stringify({
        noteId,
        isPinned,
        content: "Updated content",
        noteType: "general"
    });

    // We mock the request object to have a json method
    const request = {
      json: async () => JSON.parse(body),
      url: "http://localhost/api/course/notes",
    } as any;

    await PATCH(request);

    expect(mockUpdateNote).toHaveBeenCalled();
    const args = mockUpdateNote.mock.calls[0];
    expect(args[0]).toBe(noteId);

    // We expect this to contain is_pinned: true, but it currently won't
    expect(args[1]).toEqual(expect.objectContaining({
        content: "Updated content",
        note_type: "general",
        is_pinned: true
    }));
  });
});
