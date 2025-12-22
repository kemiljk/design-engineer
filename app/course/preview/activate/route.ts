import { NextRequest, NextResponse } from "next/server";

const PREVIEW_COOKIE_NAME = "dxe_preview";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * GET /course/preview/activate?token=xxx
 * Server-side route that sets the cookie and redirects
 * This bypasses any client-side fetch/cookie issues
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  const envToken = process.env.COURSE_PREVIEW_TOKEN;

  // Validate token
  if (!token || !envToken || token !== envToken) {
    return NextResponse.redirect(
      new URL("/course/preview?error=invalid", request.url)
    );
  }

  // Create redirect response
  const response = NextResponse.redirect(
    new URL("/course?preview=activated", request.url)
  );

  // Set cookie on the response
  response.cookies.set(PREVIEW_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}
