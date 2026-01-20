import "server-only";

import { cache } from "react";
import { cosmic } from "./cosmic";
import * as Type from "./types";
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { getUserTemporaryEnrollment } from "./temporary-access";

// Import and re-export shared utilities for server components
import {
  COURSE_STRUCTURE,
  getEstimatedDuration,
  formatModuleName,
} from "./course-shared";
export { COURSE_STRUCTURE, getEstimatedDuration, formatModuleName };

// Import dynamic structure for accurate lesson counts
import {
  getDynamicCourseStructure,
  getDynamicTotalLessonsForAccess,
} from "./course-structure";
export { getDynamicCourseStructure };

// Free lessons - only the FIRST lesson of each track/platform
const FREE_LESSONS = new Set([
  // Introduction (all free)
  "00-introduction/01-welcome",
  "00-introduction/02-what-is-design-engineering",
  "00-introduction/03-choosing-your-path",
  "00-introduction/04-how-this-course-works",
  // Design Track - first lesson only (Visual Design Foundations)
  "design-track/web/01-foundations/01-what-is-visual-design",
  "design-track/ios/01-hig-fundamentals/01-ios-design-philosophy",
  "design-track/android/01-material-design/01-material-design-philosophy",
  // Engineering Track - first lesson only (Environment Setup)
  "engineering-track/web/00-environment-setup/01-your-new-best-friend-the-terminal",
  "engineering-track/ios/00-environment-setup/01-getting-started-with-xcode",
  "engineering-track/android/00-environment-setup/01-getting-started-with-android-studio",
]);

const ACCESS_MAP: Record<Type.AccessLevel, string[]> = {
  free: [],
  design_web: ["design-track/web"],
  design_ios: ["design-track/ios"],
  design_android: ["design-track/android"],
  design_full: ["design-track/web", "design-track/ios", "design-track/android"],
  engineering_web: ["engineering-track/web"],
  engineering_ios: ["engineering-track/ios"],
  engineering_android: ["engineering-track/android"],
  engineering_full: [
    "engineering-track/web",
    "engineering-track/ios",
    "engineering-track/android",
  ],
  full: [
    "design-track/web",
    "design-track/ios",
    "design-track/android",
    "engineering-track/web",
    "engineering-track/ios",
    "engineering-track/android",
    "convergence/web",
    "convergence/ios",
    "convergence/android",
    "00-introduction",
  ],
};

// ============================================
// TEST MODE - Set to true to simulate no access
// ============================================
const TEST_MODE = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";
const TEST_ACCESS_LEVEL = process.env.NEXT_PUBLIC_COURSE_TEST_ACCESS as
  | Type.AccessLevel
  | undefined;

// User IDs that should bypass test mode and use real enrollments
// This allows specific users to test real progress/notes saving while others see test mode
const TEST_MODE_BYPASS_USER_IDS = new Set([
  "user_2YfwsgLf6sxplrtpJw2z3n805R3", // Owner - always use real enrollment
]);

/**
 * Check if a user should always use their real enrollment
 * (bypasses both test mode AND preview access for enrolled feature testing)
 */
export function shouldUseRealEnrollment(userId: string): boolean {
  return TEST_MODE_BYPASS_USER_IDS.has(userId);
}

// File path for runtime test access override (used by E2E tests)
const TEST_ACCESS_OVERRIDE_FILE = path.join(
  process.cwd(),
  ".test-access-override",
);

async function getTestAccessLevel(): Promise<Type.AccessLevel | undefined> {
  // First check for file-based override (set by /api/course/test-access)
  try {
    const override = await fs.readFile(TEST_ACCESS_OVERRIDE_FILE, "utf-8");
    const trimmed = override.trim();
    if (trimmed) {
      return trimmed as Type.AccessLevel;
    }
  } catch {
    // File doesn't exist, use env default
  }
  return TEST_ACCESS_LEVEL;
}

// Export for use in page components
export async function getEffectiveTestAccessLevel(): Promise<Type.AccessLevel | null> {
  if (!TEST_MODE) return null;
  const level = await getTestAccessLevel();
  return level ?? null;
}

export function isFreeTierLesson(lessonPath: string): boolean {
  // Track index pages are free (navigation pages)
  if (
    lessonPath === "design-track" ||
    lessonPath === "engineering-track" ||
    lessonPath === "convergence"
  ) {
    return true;
  }

  // Platform index pages are also free (e.g., design-track/web)
  const platformIndexPatterns = [
    /^design-track\/(web|ios|android)$/,
    /^engineering-track\/(web|ios|android)$/,
    /^convergence\/(web|ios|android)$/,
  ];
  if (platformIndexPatterns.some((pattern) => pattern.test(lessonPath))) {
    return true;
  }

  // Check against explicit free lessons list
  return FREE_LESSONS.has(lessonPath);
}

/**
 * Normalize access level from Cosmic (handles both string and object formats)
 * Cosmic select fields return objects with { key, value }, but we need the string key
 */
export function normalizeAccessLevel(
  accessLevel:
    | Type.AccessLevel
    | { key: string; value: string }
    | null
    | undefined,
): Type.AccessLevel | null {
  if (!accessLevel) return null;

  // If it's already a string, return it
  if (typeof accessLevel === "string") {
    return accessLevel;
  }

  // If it's an object, extract the key property
  if (typeof accessLevel === "object" && accessLevel !== null) {
    // Check if it has a 'key' property (Cosmic select field format)
    if ("key" in accessLevel && typeof accessLevel.key === "string") {
      return accessLevel.key as Type.AccessLevel;
    }
  }

  // If we can't normalize it, log a warning in development
  if (process.env.NODE_ENV === "development") {
    console.warn("[normalizeAccessLevel] Unexpected format:", {
      accessLevel,
      type: typeof accessLevel,
      isObject: typeof accessLevel === "object",
      hasKey:
        accessLevel && typeof accessLevel === "object" && "key" in accessLevel,
    });
  }

  return null;
}

export function canAccessLesson(
  accessLevel: Type.AccessLevel | null,
  lessonPath: string,
): boolean {
  // Free tier lessons are always accessible
  if (isFreeTierLesson(lessonPath)) return true;

  // No access level means no paid access
  if (!accessLevel || accessLevel === "free") return false;

  // Full access gets everything
  if (accessLevel === "full") return true;

  // Check specific track access
  const allowedPaths = ACCESS_MAP[accessLevel] || [];
  return allowedPaths.some((allowedPath) => lessonPath.startsWith(allowedPath));
}

export const getUserEnrollment = cache(
  async (userId: string): Promise<Type.CourseEnrollment | null> => {
    // Check if this user should bypass test mode (e.g., owner testing real progress)
    const bypassTestMode = TEST_MODE_BYPASS_USER_IDS.has(userId);

    // Test mode override (unless user is in bypass list)
    if (TEST_MODE && !bypassTestMode) {
      const effectiveAccessLevel = await getTestAccessLevel();
      if (effectiveAccessLevel && effectiveAccessLevel !== "free") {
        return {
          id: "test-enrollment",
          slug: "test-enrollment",
          title: "Test Enrollment",
          created_at: new Date().toISOString(),
          metadata: {
            user_id: userId,
            product_id: effectiveAccessLevel,
            access_level: effectiveAccessLevel,
            status: "active",
          },
        };
      }
      return null;
    }

    try {
      // Check for temporary enrollment first (prioritize if user has both)
      const temporaryEnrollment = await getUserTemporaryEnrollment(userId);
      if (temporaryEnrollment) {
        return temporaryEnrollment;
      }

      // Note: We don't filter by status here because Cosmic stores status as an object { key, value }
      // We'll filter out inactive/refunded enrollments after fetching
      const { objects } = await cosmic.objects
        .find({
          type: "course-enrollments",
          "metadata.user_id": userId,
        })
        .props("id,slug,title,created_at,metadata")
        .depth(1)
        .limit(10); // Get multiple in case there are multiple enrollments

      if (!objects || objects.length === 0) {
        return null;
      }

      // Filter for active enrollments (handle both string and object status formats)
      const activeEnrollments = objects.filter(
        (obj: {
          metadata?: { status?: string | { key: string; value: string } };
        }) => {
          const status = obj.metadata?.status;
          if (!status) return false;

          // If status is a string
          if (typeof status === "string") {
            return status === "active";
          }

          // If status is an object with key/value (Cosmic select field)
          if (typeof status === "object" && "key" in status) {
            return status.key === "active";
          }

          return false;
        },
      );

      // Return the most recent active enrollment (or first one if multiple)
      return activeEnrollments[0] || null;
    } catch (error: unknown) {
      // Cosmic throws 404 when no objects found
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 404
      ) {
        return null;
      }
      console.error("Error fetching user enrollment:", error);
      return null;
    }
  },
);

export async function createEnrollment(
  data: Omit<Type.CourseEnrollment["metadata"], "status"> & { status?: string },
): Promise<Type.CourseEnrollment> {
  const slug = `enrollment-${data.user_id}-${nanoid(8)}`;

  const result = await cosmic.objects.insertOne({
    type: "course-enrollments",
    title: `Enrollment: ${data.user_id}`,
    slug,
    metadata: {
      ...data,
      status: data.status || "active",
    },
  });

  return result.object;
}

export async function getUserNotes(
  userId: string,
  lessonPath?: string,
): Promise<Type.CourseNote[]> {
  try {
    const query: Record<string, unknown> = {
      type: "course-notes",
      "metadata.user_id": userId,
    };

    if (lessonPath) {
      query["metadata.lesson_path"] = lessonPath;
    }

    const { objects } = await cosmic.objects
      .find(query)
      .props("id,slug,title,created_at,modified_at,metadata")
      .depth(1)
      .sort("-created_at");

    return objects || [];
  } catch (error: unknown) {
    // Cosmic throws 404 when no objects found
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      error.status === 404
    ) {
      return [];
    }
    console.error("Error fetching user notes:", error);
    return [];
  }
}

export async function createNote(
  data: Type.CourseNote["metadata"],
): Promise<Type.CourseNote> {
  const slug = `note-${data.user_id}-${nanoid(8)}`;

  const result = await cosmic.objects.insertOne({
    type: "course-notes",
    title: `Note: ${data.lesson_path}`,
    slug,
    metadata: data,
  });

  return result.object;
}

export async function updateNote(
  noteId: string,
  data: Partial<Type.CourseNote["metadata"]>,
): Promise<Type.CourseNote> {
  const result = await cosmic.objects.updateOne(noteId, {
    metadata: data,
  });

  return result.object;
}

export async function deleteNote(noteId: string): Promise<void> {
  await cosmic.objects.deleteOne(noteId);
}

// Get the single progress object for a user (new-style with lessons field)
export const getUserProgress = cache(
  async (userId: string): Promise<Type.CourseProgress | null> => {
    try {
      const { objects } = await cosmic.objects
        .find({
          type: "course-progress",
          "metadata.user_id": userId,
        })
        .props("id,slug,title,created_at,modified_at,metadata")
        .depth(1)
        .limit(10); // Get a few in case there are old records

      if (!objects || objects.length === 0) return null;

      // Find the new-style record (has 'lessons' field, not 'lesson_path')
      const newStyleRecord = objects.find(
        (obj: Type.CourseProgress) => obj.metadata.lessons !== undefined,
      );

      return newStyleRecord || null;
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 404
      ) {
        return null;
      }
      console.error("Error fetching user progress:", error);
      return null;
    }
  },
);

export const getCourseProgress = cache(async (userId: string) => {
  const progress = await getUserProgress(userId);
  if (!progress) {
    return { completedLessons: [], raw: null };
  }

  const lessons = progress.metadata.lessons || {};
  const completedLessons = Object.entries(lessons)
    .filter(([, data]) => data.status === "completed")
    .map(([path]) => path);

  return { completedLessons, raw: progress };
});

export async function updateProgress(
  userId: string,
  lessonPath: string,
  status: "not_started" | "in_progress" | "completed",
  timeSpent?: number,
): Promise<Type.CourseProgress> {
  const today = new Date().toISOString().split("T")[0];

  // Get existing progress object for this user
  let existing = await getUserProgress(userId);

  if (existing) {
    // Update existing progress object
    const lessons = existing.metadata.lessons || {};
    const currentLesson = lessons[lessonPath] || {
      status: "not_started",
      time_spent_seconds: 0,
    };

    // Don't downgrade from completed to in_progress
    const newStatus =
      currentLesson.status === "completed" ? "completed" : status;

    const updatedLesson: Type.LessonProgress = {
      status: newStatus,
      time_spent_seconds:
        (currentLesson.time_spent_seconds || 0) + (timeSpent || 0),
      started_at: currentLesson.started_at || today,
      ...(newStatus === "completed" && !currentLesson.completed_at
        ? { completed_at: today }
        : { completed_at: currentLesson.completed_at }),
    };

    const updatedLessons = {
      ...lessons,
      [lessonPath]: updatedLesson,
    };

    // Calculate total time spent across all lessons
    const totalTimeSpent = Object.values(updatedLessons).reduce(
      (sum, lesson) => sum + (lesson.time_spent_seconds || 0),
      0,
    );

    const result = await cosmic.objects.updateOne(existing.id, {
      metadata: {
        lessons: updatedLessons,
        total_time_spent_seconds: totalTimeSpent,
        last_lesson_path: lessonPath,
        last_activity_at: today,
      },
    });

    return result.object;
  }

  // Create new progress object for this user
  const slug = `progress-${userId}-${nanoid(8)}`;
  const newLesson: Type.LessonProgress = {
    status,
    time_spent_seconds: timeSpent || 0,
    started_at: today,
    ...(status === "completed" ? { completed_at: today } : {}),
  };

  const result = await cosmic.objects.insertOne({
    type: "course-progress",
    title: `Progress: ${userId}`,
    slug,
    metadata: {
      user_id: userId,
      lessons: { [lessonPath]: newLesson },
      total_time_spent_seconds: timeSpent || 0,
      last_lesson_path: lessonPath,
      last_activity_at: today,
    },
  });

  return result.object;
}

export async function getProgressStats(
  progress: Type.CourseProgress | null,
  accessLevel: Type.AccessLevel = "full",
) {
  // Use dynamic structure for accurate lesson counts from actual content
  const totalLessons = await getDynamicTotalLessonsForAccess(accessLevel);

  if (!progress) {
    return {
      totalLessons,
      completedCount: 0,
      inProgressCount: 0,
      completionPercentage: 0,
      totalTimeSpent: 0,
      totalTimeFormatted: "0m",
      accessLevel,
    };
  }

  const lessons = progress.metadata.lessons || {};

  // Filter lessons by access level - only count lessons the user can access
  // This prevents showing "31/10 complete" if access level changed or data is inconsistent
  const accessibleLessons = Object.entries(lessons).filter(([lessonPath]) =>
    canAccessLesson(accessLevel, lessonPath),
  );

  const rawCompletedCount = accessibleLessons.filter(
    ([, data]) => data.status === "completed",
  ).length;
  const rawInProgressCount = accessibleLessons.filter(
    ([, data]) => data.status === "in_progress",
  ).length;

  // Cap counts to never exceed total lessons available for this access level
  const completedCount = Math.min(rawCompletedCount, totalLessons);
  const inProgressCount = Math.min(
    rawInProgressCount,
    totalLessons - completedCount,
  );

  const totalTime = progress.metadata.total_time_spent_seconds || 0;

  // Cap completion percentage at 100%
  const completionPercentage =
    totalLessons > 0
      ? Math.min(100, Math.round((completedCount / totalLessons) * 100))
      : 0;

  return {
    totalLessons,
    completedCount,
    inProgressCount,
    completionPercentage,
    totalTimeSpent: totalTime,
    totalTimeFormatted: formatTime(totalTime),
    accessLevel,
  };
}

/**
 * @deprecated Use getDynamicTotalLessonsForAccess for accurate counts from actual content.
 * This function uses static constants which may be out of sync.
 */
function getTotalLessonsForAccess(accessLevel: Type.AccessLevel): number {
  const intro = COURSE_STRUCTURE.introduction.lessons;

  switch (accessLevel) {
    case "free":
      return intro + 6;
    case "design_web":
      return intro + COURSE_STRUCTURE.design.web.lessons;
    case "design_ios":
      return intro + COURSE_STRUCTURE.design.ios.lessons;
    case "design_android":
      return intro + COURSE_STRUCTURE.design.android.lessons;
    case "design_full":
      return (
        intro +
        COURSE_STRUCTURE.design.web.lessons +
        COURSE_STRUCTURE.design.ios.lessons +
        COURSE_STRUCTURE.design.android.lessons
      );
    case "engineering_web":
      return intro + COURSE_STRUCTURE.engineering.web.lessons;
    case "engineering_ios":
      return intro + COURSE_STRUCTURE.engineering.ios.lessons;
    case "engineering_android":
      return intro + COURSE_STRUCTURE.engineering.android.lessons;
    case "engineering_full":
      return (
        intro +
        COURSE_STRUCTURE.engineering.web.lessons +
        COURSE_STRUCTURE.engineering.ios.lessons +
        COURSE_STRUCTURE.engineering.android.lessons
      );
    case "full":
      return (
        intro +
        COURSE_STRUCTURE.design.web.lessons +
        COURSE_STRUCTURE.design.ios.lessons +
        COURSE_STRUCTURE.design.android.lessons +
        COURSE_STRUCTURE.engineering.web.lessons +
        COURSE_STRUCTURE.engineering.ios.lessons +
        COURSE_STRUCTURE.engineering.android.lessons +
        COURSE_STRUCTURE.convergence.web.lessons +
        COURSE_STRUCTURE.convergence.ios.lessons +
        COURSE_STRUCTURE.convergence.android.lessons
      );
    default:
      return 242; // fallback - total lessons
  }
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Get course data with accurate counts
export async function getCourse() {
  // Use dynamic structure for accurate counts from actual content
  const structure = await getDynamicCourseStructure();

  // Calculate totals dynamically
  const designTotal =
    structure.design.web.lessons +
    structure.design.ios.lessons +
    structure.design.android.lessons;
  const engineeringTotal =
    structure.engineering.web.lessons +
    structure.engineering.ios.lessons +
    structure.engineering.android.lessons;
  const convergenceTotal =
    structure.convergence.web.lessons +
    structure.convergence.ios.lessons +
    structure.convergence.android.lessons;
  const totalLessons =
    structure.introduction.lessons +
    designTotal +
    engineeringTotal +
    convergenceTotal;

  // Free lessons: 1 per platform (first lesson only)
  const designFreeLessons = 3; // web + ios + android
  const engineeringFreeLessons = 3; // web + ios + android

  return {
    totalLessons,
    structure,
    tracks: {
      design: {
        title: "Design",
        totalLessons: designTotal,
        freeLessons: designFreeLessons,
        platforms: {
          web: structure.design.web,
          ios: structure.design.ios,
          android: structure.design.android,
        },
      },
      engineering: {
        title: "Engineering",
        totalLessons: engineeringTotal,
        freeLessons: engineeringFreeLessons,
        platforms: {
          web: structure.engineering.web,
          ios: structure.engineering.ios,
          android: structure.engineering.android,
        },
      },
      convergence: {
        title: "Convergence",
        totalLessons: convergenceTotal,
        freeLessons: 0,
        platforms: {
          web: structure.convergence.web,
          ios: structure.convergence.ios,
          android: structure.convergence.android,
        },
      },
    },
    testMode: TEST_MODE,
    testAccessLevel: TEST_ACCESS_LEVEL,
  };
}

// Get all lessons in order for a given track and platform
export async function getOrderedLessons(
  track: string,
  platform: string,
): Promise<{ path: string; title: string }[]> {
  const basePath = path.join(process.cwd(), "content/course", track, platform);

  try {
    const entries = await fs.readdir(basePath, { withFileTypes: true });
    const sortedModules = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();

    const lessons: { path: string; title: string }[] = [];

    for (const moduleDir of sortedModules) {
      const modulePath = path.join(basePath, moduleDir);
      const files = await fs.readdir(modulePath);
      const mdFiles = files
        .filter((f) => f.endsWith(".md") && f !== "index.md")
        .sort();

      for (const file of mdFiles) {
        const lessonPath = `${track}/${platform}/${moduleDir}/${file.replace(".md", "")}`;
        const title = file
          .replace(".md", "")
          .replace(/^\d+-/, "")
          .replace(/-/g, " ");
        lessons.push({ path: lessonPath, title });
      }
    }

    return lessons;
  } catch {
    return [];
  }
}

// Get lessons for introduction section (no platform)
export async function getIntroductionLessons(): Promise<
  { path: string; title: string }[]
> {
  const basePath = path.join(process.cwd(), "content/course/00-introduction");

  try {
    const files = await fs.readdir(basePath);
    const mdFiles = files.filter((f) => f.endsWith(".md")).sort();

    return mdFiles.map((file) => ({
      path: `00-introduction/${file.replace(".md", "")}`,
      title: file.replace(".md", "").replace(/^\d+-/, "").replace(/-/g, " "),
    }));
  } catch {
    return [];
  }
}

// Helper to extract module from lesson path
function getModuleFromPath(lessonPath: string): string {
  const parts = lessonPath.split("/");
  // For track/platform paths: track/platform/module/lesson
  if (parts.length >= 4) return parts[2];
  // For introduction: 00-introduction/lesson
  if (parts[0] === "00-introduction") return "00-introduction";
  return "";
}

// Get adjacent lessons across modules
export async function getAdjacentLessonsAcrossModules(
  currentPath: string,
): Promise<{
  prev: {
    path: string;
    title: string;
    module: string;
    isNewModule: boolean;
  } | null;
  next: {
    path: string;
    title: string;
    module: string;
    isNewModule: boolean;
  } | null;
  currentModule: string;
  totalInModule: number;
  currentInModule: number;
}> {
  const parts = currentPath.split("/");
  const currentModuleName = getModuleFromPath(currentPath);

  // Handle introduction (no platform)
  if (parts[0] === "00-introduction") {
    const lessons = await getIntroductionLessons();
    const currentIndex = lessons.findIndex((l) => l.path === currentPath);

    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    return {
      prev: prevLesson
        ? {
            path: prevLesson.path,
            title: prevLesson.title,
            module: "00-introduction",
            isNewModule: false,
          }
        : null,
      next: nextLesson
        ? {
            path: nextLesson.path,
            title: nextLesson.title,
            module: "00-introduction",
            isNewModule: false,
          }
        : null,
      currentModule: "00-introduction",
      totalInModule: lessons.length,
      currentInModule: currentIndex + 1,
    };
  }

  // For track/platform paths (e.g., design-track/web/01-foundations/01-lesson)
  if (parts.length >= 4) {
    const [track, platform] = parts;
    const lessons = await getOrderedLessons(track, platform);
    const currentIndex = lessons.findIndex((l) => l.path === currentPath);

    // Count lessons in current module
    const moduleLessons = lessons.filter((l) =>
      l.path.includes(`/${currentModuleName}/`),
    );
    const currentInModule =
      moduleLessons.findIndex((l) => l.path === currentPath) + 1;

    const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
    const nextLesson =
      currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

    const prevModule = prevLesson ? getModuleFromPath(prevLesson.path) : null;
    const nextModule = nextLesson ? getModuleFromPath(nextLesson.path) : null;

    return {
      prev: prevLesson
        ? {
            path: prevLesson.path,
            title: prevLesson.title,
            module: prevModule!,
            isNewModule: prevModule !== currentModuleName,
          }
        : null,
      next: nextLesson
        ? {
            path: nextLesson.path,
            title: nextLesson.title,
            module: nextModule!,
            isNewModule: nextModule !== currentModuleName,
          }
        : null,
      currentModule: currentModuleName,
      totalInModule: moduleLessons.length,
      currentInModule,
    };
  }

  return {
    prev: null,
    next: null,
    currentModule: "",
    totalInModule: 0,
    currentInModule: 0,
  };
}

// Get user's last activity (for "Continue where you left off")
export const getLastActivity = cache(
  async (
    userId: string,
  ): Promise<{
    lessonPath: string;
    lessonTitle: string;
    status: string;
    timestamp: string;
  } | null> => {
    const progress = await getUserProgress(userId);

    if (!progress || !progress.metadata.last_lesson_path) {
      return null;
    }

    const lessonPath = progress.metadata.last_lesson_path;
    const lessons = progress.metadata.lessons || {};
    const lessonData = lessons[lessonPath];

    return {
      lessonPath,
      lessonTitle: lessonPath.split("/").pop() || lessonPath,
      status: lessonData?.status || "in_progress",
      timestamp:
        progress.metadata.last_activity_at ||
        progress.modified_at ||
        progress.created_at,
    };
  },
);

// Get progress for a specific track/platform
export async function getTrackProgress(
  userId: string,
  track: string,
  platform: string,
): Promise<{
  completed: number;
  total: number;
  completedPaths: string[];
}> {
  const progress = await getUserProgress(userId);
  const trackPrefix = `${track}/${platform}`;
  const trackLessons = await getOrderedLessons(track, platform);

  if (!progress) {
    return {
      completed: 0,
      total: trackLessons.length,
      completedPaths: [],
    };
  }

  const lessons = progress.metadata.lessons || {};
  const completedPaths = Object.entries(lessons)
    .filter(
      ([path, data]) =>
        path.startsWith(trackPrefix) && data.status === "completed",
    )
    .map(([path]) => path);

  return {
    completed: completedPaths.length,
    total: trackLessons.length,
    completedPaths,
  };
}

// Check if a specific lesson is completed
export async function isLessonCompleted(
  userId: string,
  lessonPath: string,
): Promise<boolean> {
  const progress = await getUserProgress(userId);
  if (!progress) return false;

  const lessons = progress.metadata.lessons || {};
  return lessons[lessonPath]?.status === "completed";
}

// Get lesson progress status
export async function getLessonProgress(
  userId: string,
  lessonPath: string,
): Promise<Type.LessonProgress | null> {
  const progress = await getUserProgress(userId);
  if (!progress) return null;

  const lessons = progress.metadata.lessons || {};
  return lessons[lessonPath] || null;
}

// Get all modules for a track/platform with their first lesson paths
export async function getModulesForTrack(
  track: string,
  platform: string,
): Promise<
  {
    slug: string;
    title: string;
    lessonCount: number;
    firstLessonPath: string;
  }[]
> {
  const basePath = path.join(process.cwd(), "content/course", track, platform);

  try {
    const entries = await fs.readdir(basePath, { withFileTypes: true });
    const sortedModules = entries
      .filter((e) => e.isDirectory() && !e.name.startsWith("."))
      .map((e) => e.name)
      .sort();

    const modules: {
      slug: string;
      title: string;
      lessonCount: number;
      firstLessonPath: string;
    }[] = [];

    for (const moduleDir of sortedModules) {
      const modulePath = path.join(basePath, moduleDir);
      const files = await fs.readdir(modulePath);
      const mdFiles = files
        .filter((f) => f.endsWith(".md") && f !== "index.md")
        .sort();

      if (mdFiles.length > 0) {
        const firstLesson = mdFiles[0].replace(".md", "");
        modules.push({
          slug: moduleDir,
          title: formatModuleName(moduleDir),
          lessonCount: mdFiles.length,
          firstLessonPath: `${track}/${platform}/${moduleDir}/${firstLesson}`,
        });
      }
    }

    return modules;
  } catch {
    return [];
  }
}
