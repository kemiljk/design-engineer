import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { cosmic } from "@/lib/cosmic";
import { getUserProgress, getOrderedLessons } from "@/lib/course";
import { nanoid } from "nanoid";

// DEBUG ONLY - Mark a track as complete for testing certificates
// Usage: POST /api/course/debug-complete with { track: "design-track", platform: "web", userId?: "user_xxx" }
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  // In dev, allow passing userId directly for curl/testing
  const body = await request.json();
  let userId = body.userId;
  
  if (!userId) {
    const authResult = await auth();
    userId = authResult.userId;
  }
  
  if (!userId) {
    return NextResponse.json({ 
      error: "Unauthorized. Pass userId in body for curl: { \"userId\": \"user_xxx\", \"track\": \"...\", \"platform\": \"...\" }" 
    }, { status: 401 });
  }

  try {
    const { track, platform } = body as { track: string; platform: string; userId?: string };

    if (!track || !platform) {
      return NextResponse.json(
        { error: "Missing track or platform. Example: { track: 'design-track', platform: 'web' }" },
        { status: 400 }
      );
    }

    // Get all lessons for this track/platform
    const lessons = await getOrderedLessons(track, platform);
    
    if (lessons.length === 0) {
      return NextResponse.json(
        { error: `No lessons found for ${track}/${platform}` },
        { status: 404 }
      );
    }

    const today = new Date().toISOString().split("T")[0];
    
    // Get existing progress
    let existing = await getUserProgress(userId);
    
    // Build the lessons object with all lessons marked complete
    const completedLessons: Record<string, {
      status: "completed";
      time_spent_seconds: number;
      started_at: string;
      completed_at: string;
    }> = {};
    
    for (const lesson of lessons) {
      completedLessons[lesson.path] = {
        status: "completed",
        time_spent_seconds: 300, // 5 minutes per lesson
        started_at: today,
        completed_at: today,
      };
    }

    if (existing) {
      // Merge with existing progress
      const existingLessons = existing.metadata.lessons || {};
      const mergedLessons = { ...existingLessons, ...completedLessons };
      
      const totalTimeSpent = Object.values(mergedLessons).reduce(
        (sum, lesson) => sum + (lesson.time_spent_seconds || 0),
        0
      );

      await cosmic.objects.updateOne(existing.id, {
        metadata: {
          lessons: mergedLessons,
          total_time_spent_seconds: totalTimeSpent,
          last_lesson_path: lessons[lessons.length - 1].path,
          last_activity_at: today,
        },
      });
    } else {
      // Create new progress object
      const slug = `progress-${userId}-${nanoid(8)}`;
      const totalTimeSpent = lessons.length * 300;

      await cosmic.objects.insertOne({
        type: "course-progress",
        title: `Progress: ${userId}`,
        slug,
        metadata: {
          user_id: userId,
          lessons: completedLessons,
          total_time_spent_seconds: totalTimeSpent,
          last_lesson_path: lessons[lessons.length - 1].path,
          last_activity_at: today,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Marked ${lessons.length} lessons as complete for ${track}/${platform}`,
      lessonsCompleted: lessons.length,
    });
  } catch (error) {
    console.error("Debug complete error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update progress" },
      { status: 500 }
    );
  }
}

// GET endpoint to check current progress
export async function GET() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development" },
      { status: 403 }
    );
  }

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const progress = await getUserProgress(userId);
  
  if (!progress) {
    return NextResponse.json({ message: "No progress found", lessons: {} });
  }

  const lessons = progress.metadata.lessons || {};
  const completedCount = Object.values(lessons).filter(l => l.status === "completed").length;
  
  return NextResponse.json({
    userId,
    totalLessonsTracked: Object.keys(lessons).length,
    completedCount,
    lessons,
  });
}

