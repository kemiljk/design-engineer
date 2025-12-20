import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getUserEnrollment, canAccessLesson } from "@/lib/course";

export async function GET() {
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
  const hasAccess = canAccessLesson(accessLevel, lessonPath);

  return NextResponse.json({
    hasAccess,
    accessLevel,
    requiresUpgrade: !hasAccess,
  });
}
