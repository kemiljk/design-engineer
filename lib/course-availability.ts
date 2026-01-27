import { getCourseAvailability } from "./cosmic";
import { NextResponse } from "next/server";
import { hasPreviewAccess } from "./preview-access";
import { auth } from "@clerk/nextjs/server";

// User IDs that bypass course availability check (e.g., owner/admins)
const BYPASS_USER_IDS = new Set([
  "user_2YfwsgLf6sxplrtpJw2z3n805R3", // Owner
]);

// Legacy/dev-only bypass user ID (allowed only in development for convenience)
const LEGACY_BYPASS_USER_ID = "user_2YUTxqEjj0tI9pYSqmlE1fweQ4J";

export async function checkCourseAvailability() {
  const { is_available } = await getCourseAvailability();
  return is_available;
}

export async function requireCourseAvailable() {
  const isAvailable = await checkCourseAvailability();

  // If course is available, allow through
  if (isAvailable) {
    return null;
  }

  // Check if user has preview access or is a bypass user
  const [previewAccess, { userId }] = await Promise.all([
    hasPreviewAccess(),
    auth(),
  ]);

  // Preview access bypasses availability check
  if (previewAccess) {
    return null;
  }

  // Bypass users (owner/admins) can always access
  if (userId && BYPASS_USER_IDS.has(userId)) {
    return null;
  }

  // Allow anyone with a @duckduckgo.com email to bypass availability for testing
  const user = await (await import("@clerk/nextjs/server")).currentUser();
  if (user?.emailAddresses.some(e => e.emailAddress.endsWith("@duckduckgo.com"))) {
    console.log("[Course Availability] Bypassing for DDG account:", user.emailAddresses[0].emailAddress);
    return null;
  }

  // Test mode bypasses availability check
  const isTestMode = process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";
  if (isTestMode) {
    return null;
  }

  // Development mode bypasses availability check
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  return NextResponse.json(
    { error: "Course is not yet available" },
    { status: 503 },
  );
}
