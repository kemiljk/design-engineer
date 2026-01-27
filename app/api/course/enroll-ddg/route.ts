import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { createEnrollment, getUserEnrollment } from "@/lib/course";

/**
 * Direct enrollment endpoint for DuckDuckGo users.
 * Automatically creates a full-access enrollment in Cosmic and redirects to /course.
 */
export async function GET() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.redirect(new URL("/sign-in", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email || !email.endsWith("@duckduckgo.com")) {
    console.error("[Enroll DDG] Invalid email for bypass:", email);
    return NextResponse.redirect(new URL("/course/pricing", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }

  try {
    // 1. Check for existing enrollment
    const existing = await getUserEnrollment(userId);
    if (existing) {
      console.log("[Enroll DDG] User already has enrollment, redirecting to course");
      return NextResponse.redirect(new URL("/course", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
    }

    // 2. Create full enrollment in Cosmic
    console.log("[Enroll DDG] Creating direct enrollment for:", email);
    await createEnrollment({
      user_id: userId,
      product_id: "full",
      access_level: "full",
    });

    // 3. Redirect to course dashboard
    return NextResponse.redirect(new URL("/course?purchase=success", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  } catch (error) {
    console.error("[Enroll DDG] Enrollment failed:", error);
    return NextResponse.redirect(new URL("/course/pricing?error=enrollment_failed", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  }
}
