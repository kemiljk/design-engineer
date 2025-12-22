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

  const cookieStore = await cookies();
  cookieStore.set(PREVIEW_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({
    message: "Preview access granted",
    expiresIn: "30 days",
  });
}

/**
 * DELETE /api/course/preview
 * Remove preview cookie
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(PREVIEW_COOKIE_NAME);

  return NextResponse.json({
    message: "Preview access removed",
  });
}

/**
 * GET /api/course/preview
 * Check current preview status
 */
export async function GET() {
  const cookieStore = await cookies();
  const previewCookie = cookieStore.get(PREVIEW_COOKIE_NAME);

  return NextResponse.json({
    hasPreviewAccess: isValidPreviewToken(previewCookie?.value ?? null),
  });
}
