import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {
  createTemporaryAccessCode,
  getAllTemporaryAccessCodes,
  cleanupExpiredTemporaryAccess,
} from "@/lib/temporary-access";

// Admin user ID that has access to these functions
const ADMIN_USER_ID = "user_2YfwsgLf6sxplrtpJw2z3n805R3";
// Legacy admin ID (allowed in development for convenience)
const LEGACY_ADMIN_USER_ID = "user_2YUTxqEjj0tI9pYSqmlE1fweQ4J";

async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized", status: 401 };
  }

  // Allow primary admin ID always, and legacy admin ID only in development
  if (
    userId !== ADMIN_USER_ID &&
    !(process.env.NODE_ENV === "development" && userId === LEGACY_ADMIN_USER_ID)
  ) {
    return { error: "Forbidden - Admin access required", status: 403 };
  }

  return null;
}

// GET: Fetch all temporary access codes
export async function GET(request: NextRequest) {
  const adminError = await requireAdmin();
  if (adminError) {
    return NextResponse.json(
      { error: adminError.error },
      { status: adminError.status },
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "cleanup") {
      // Clean up expired codes and enrollments
      const result = await cleanupExpiredTemporaryAccess();
      return NextResponse.json({
        success: true,
        message: "Cleanup completed",
        ...result,
      });
    }

    // Get all codes
    const codes = await getAllTemporaryAccessCodes();

    return NextResponse.json({
      success: true,
      codes,
      total: codes.length,
    });
  } catch (error) {
    console.error("Error fetching temporary access codes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST: Create new temporary access codes
export async function POST(request: NextRequest) {
  const adminError = await requireAdmin();
  if (adminError) {
    return NextResponse.json(
      { error: adminError.error },
      { status: adminError.status },
    );
  }

  try {
    const body = await request.json();
    const { count = 1, expiresInDays = 7 } = body;

    if (count < 1 || count > 50) {
      return NextResponse.json(
        { error: "Count must be between 1 and 50" },
        { status: 400 },
      );
    }

    if (expiresInDays < 1 || expiresInDays > 365) {
      return NextResponse.json(
        { error: "Expiration days must be between 1 and 365" },
        { status: 400 },
      );
    }

    const codes = [];
    for (let i = 0; i < count; i++) {
      const code = await createTemporaryAccessCode(expiresInDays);
      codes.push(code);
    }

    return NextResponse.json({
      success: true,
      message: `Created ${count} temporary access code(s)`,
      codes,
    });
  } catch (error) {
    console.error("Error creating temporary access codes:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
