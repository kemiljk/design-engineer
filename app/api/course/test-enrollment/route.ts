import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createEnrollment, getUserEnrollment } from "@/lib/course";
import type { AccessLevel } from "@/lib/types";

// Only available in development or when explicitly enabled
const ALLOW_TEST_ENROLLMENT = 
  process.env.NODE_ENV === "development" || 
  process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

export async function POST(request: NextRequest) {
  if (!ALLOW_TEST_ENROLLMENT) {
    return NextResponse.json(
      { error: "Test enrollment not available" },
      { status: 403 }
    );
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const accessLevel: AccessLevel = body.accessLevel || "full";

  // Check if enrollment already exists
  const existing = await getUserEnrollment(userId);
  if (existing && existing.id !== "test-enrollment") {
    return NextResponse.json({
      message: "Enrollment already exists",
      enrollment: existing,
    });
  }

  try {
    // Format date as YYYY-MM-DD for Cosmic's date type
    const today = new Date().toISOString().split('T')[0];
    
    const enrollment = await createEnrollment({
      user_id: userId,
      product_id: accessLevel,
      access_level: accessLevel,
      purchased_at: today,
      status: "active",
    });

    console.log(`Created test enrollment for user ${userId}: ${accessLevel}`);

    return NextResponse.json({
      message: "Test enrollment created successfully",
      enrollment,
    });
  } catch (error) {
    console.error("Error creating test enrollment:", error);
    return NextResponse.json(
      { error: "Failed to create enrollment", details: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  if (!ALLOW_TEST_ENROLLMENT) {
    return NextResponse.json(
      { error: "Test enrollment not available" },
      { status: 403 }
    );
  }

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // For now, just return info - deleting would require the enrollment ID
  return NextResponse.json({
    message: "To delete enrollment, remove it from Cosmic dashboard",
    userId,
  });
}
