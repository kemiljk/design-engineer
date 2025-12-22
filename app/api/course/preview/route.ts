import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isValidPreviewToken } from "@/lib/preview-access";

const PREVIEW_COOKIE_NAME = "dxe_preview";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/**
 * POST /api/course/preview
 * Set preview cookie if valid token is provided
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { token } = body;

  if (!isValidPreviewToken(token)) {
    return NextResponse.json(
      { error: "Invalid preview token" },
      { status: 401 }
    );
  }

  // Create response with cookie set via headers
  const response = NextResponse.json({
    message: "Preview access granted",
    expiresIn: "30 days",
  });

  // Set cookie using response headers for better reliability
  response.cookies.set(PREVIEW_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return response;
}

/**
 * DELETE /api/course/preview
 * Remove preview cookie
 */
export async function DELETE() {
  const response = NextResponse.json({
    message: "Preview access removed",
  });

  response.cookies.delete(PREVIEW_COOKIE_NAME);

  return response;
}

/**
 * GET /api/course/preview
 * Check current preview status
 */
export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME);
  const hasAccess = isValidPreviewToken(previewCookie?.value ?? null);
  
  // Include debug info if requested (useful for troubleshooting)
  const debug = request.nextUrl.searchParams.get("debug") === "true";
  
  if (debug) {
    return NextResponse.json({
      hasPreviewAccess: hasAccess,
      debug: {
        hasCookie: !!previewCookie,
        cookieValueLength: previewCookie?.value?.length ?? 0,
        envVarSet: !!process.env.COURSE_PREVIEW_TOKEN,
        envVarLength: process.env.COURSE_PREVIEW_TOKEN?.length ?? 0,
      },
    });
  }

  return NextResponse.json({
    hasPreviewAccess: hasAccess,
  });
}
