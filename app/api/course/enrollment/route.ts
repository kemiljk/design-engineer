import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserEnrollment, canAccessLesson } from "@/lib/course";
import { requireCourseAvailable } from "@/lib/course-availability";

export async function GET() {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const enrollment = await getUserEnrollment(userId);

  return NextResponse.json({
    enrollment,
    accessLevel: enrollment?.metadata.access_level || "free",
  });
}

export async function POST(request: NextRequest) {
  const unavailableResponse = await requireCourseAvailable();
  if (unavailableResponse) return unavailableResponse;

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { lessonPath } = body;

  if (!lessonPath) {
    return NextResponse.json(
      { error: "Missing lesson path" },
      { status: 400 }
    );
  }

  const enrollment = await getUserEnrollment(userId);
  const accessLevel = enrollment?.metadata.access_level || "free";
  
  // Development mode grants full access
  const isDevelopment = process.env.NODE_ENV === "development";
  const hasAccess = isDevelopment || canAccessLesson(accessLevel, lessonPath);

  return NextResponse.json({
    hasAccess,
    accessLevel: isDevelopment ? "full" : accessLevel,
    requiresUpgrade: !hasAccess,
  });
}
