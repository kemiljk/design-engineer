import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserProgress, updateProgress, getProgressStats, getUserEnrollment } from "@/lib/course";
import { requireCourseAvailable } from "@/lib/course-availability";

export async function GET() {
  try {
    const unavailableResponse = await requireCourseAvailable();
    if (unavailableResponse) return unavailableResponse;

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [progress, enrollment] = await Promise.all([
      getUserProgress(userId),
      getUserEnrollment(userId),
    ]);
    
    const accessLevel = enrollment?.metadata.access_level || "free";
    const stats = getProgressStats(progress, accessLevel);

    return NextResponse.json({ progress, stats });
  } catch (error) {
    console.error("Error in GET /api/course/progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const unavailableResponse = await requireCourseAvailable();
    if (unavailableResponse) return unavailableResponse;

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Handle both JSON and text (for sendBeacon which doesn't set Content-Type)
    let body;
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      body = await request.json();
    } else {
      const text = await request.text();
      body = JSON.parse(text);
    }

    const { lessonPath, status, timeSpent } = body;

    if (!lessonPath || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const validStatuses = ["not_started", "in_progress", "completed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const progressRecord = await updateProgress(
      userId,
      lessonPath,
      status,
      timeSpent
    );

    return NextResponse.json({ progress: progressRecord });
  } catch (error) {
    console.error("Error in POST /api/course/progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress", details: String(error) },
      { status: 500 }
    );
  }
}
