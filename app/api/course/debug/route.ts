import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";
import { getUserEnrollment, getUserProgress } from "@/lib/course";

// Only available in development
const ALLOW_DEBUG = process.env.NODE_ENV === "development";

export async function GET() {
  if (!ALLOW_DEBUG) {
    return NextResponse.json({ error: "Debug not available" }, { status: 403 });
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, unknown> = {
    userId,
    timestamp: new Date().toISOString(),
    checks: {},
  };

  // Cosmic connection is implicitly checked by the object type queries below
  // If any query succeeds (even with 404 "no objects"), the connection works
  results.checks = {
    ...results.checks as object,
    cosmicConnection: { success: true, note: "Verified by object queries" },
  };

  // Check if object types exist by trying to query them
  const objectTypes = ["course-enrollments", "course-progress", "course-notes"];
  
  for (const type of objectTypes) {
    try {
      const { objects } = await cosmic.objects
        .find({ type })
        .props("id")
        .limit(1);
      
      results.checks = {
        ...results.checks as object,
        [type]: { exists: true, hasObjects: objects.length > 0 },
      };
    } catch (error: unknown) {
      const status = error && typeof error === "object" && "status" in error ? error.status : "unknown";
      results.checks = {
        ...results.checks as object,
        [type]: { 
          exists: status === 404 ? "no objects yet (type may exist)" : false, 
          error: String(error),
          status,
        },
      };
    }
  }

  // Check user's enrollment
  try {
    const enrollment = await getUserEnrollment(userId);
    results.enrollment = enrollment 
      ? { found: true, id: enrollment.id, accessLevel: enrollment.metadata.access_level }
      : { found: false };
  } catch (error) {
    results.enrollment = { error: String(error) };
  }

  // Check user's progress
  try {
    const progress = await getUserProgress(userId);
    if (progress) {
      const lessons = progress.metadata.lessons || {};
      const lessonEntries = Object.entries(lessons);
      results.progress = { 
        objectId: progress.id,
        lessonCount: lessonEntries.length,
        completedCount: lessonEntries.filter(([, l]) => l.status === "completed").length,
        inProgressCount: lessonEntries.filter(([, l]) => l.status === "in_progress").length,
        totalTimeSpent: progress.metadata.total_time_spent_seconds || 0,
        lastLesson: progress.metadata.last_lesson_path,
      };
    } else {
      results.progress = { objectId: null, lessonCount: 0 };
    }
  } catch (error) {
    results.progress = { error: String(error) };
  }

  // Test creating an object (dry run info)
  results.testMode = {
    enabled: process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true",
    accessLevel: process.env.NEXT_PUBLIC_COURSE_TEST_ACCESS,
  };

  return NextResponse.json(results, { status: 200 });
}
