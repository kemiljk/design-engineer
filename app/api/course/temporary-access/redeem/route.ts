import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { redeemTemporaryAccessCode } from "@/lib/temporary-access";
import { requireCourseAvailable } from "@/lib/course-availability";

export async function POST(request: NextRequest) {
  const [unavailableResponse, { userId }] = await Promise.all([
    requireCourseAvailable(),
    auth(),
  ]);

  if (unavailableResponse) return unavailableResponse;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: "Missing access code" },
        { status: 400 },
      );
    }

    // Clean up the code (remove whitespace, convert to uppercase)
    const cleanCode = code.trim().toUpperCase();

    const result = await redeemTemporaryAccessCode(cleanCode, userId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.reason || "Failed to redeem code" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Access code redeemed successfully! You now have 7 days of full access to the course.",
      enrollment: result.enrollment,
    });
  } catch (error) {
    console.error("Error redeeming temporary access code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
