import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { createEnrollment, getUserEnrollment } from "@/lib/course";

/**
 * Internal enrollment handler for DuckDuckGo users.
 * Called by the /course/enroll-ddg client page.
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email || !email.endsWith("@duckduckgo.com")) {
    console.error("[Enroll DDG] Invalid email for bypass:", email);
    return NextResponse.json({ error: "Invalid email for bypass" }, { status: 403 });
  }

  try {
    // 1. Check for existing enrollment
    const existing = await getUserEnrollment(userId);
    if (existing) {
      console.log("[Enroll DDG] User already has enrollment");
      return NextResponse.json({ success: true, alreadyEnrolled: true });
    }

    // 2. Create full enrollment in Cosmic
    console.log("[Enroll DDG] Creating direct enrollment for:", email);
    await createEnrollment({
      user_id: userId,
      product_id: "full",
      access_level: "full",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Enroll DDG] Enrollment failed:", error);
    return NextResponse.json({ error: "Enrollment failed" }, { status: 500 });
  }
}
