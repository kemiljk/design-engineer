import { NextRequest, NextResponse } from "next/server";
import { validateTemporaryAccessCode } from "@/lib/temporary-access";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> },
) {
  try {
    const { code } = await params;

    if (!code) {
      return NextResponse.json(
        { error: "Missing code parameter" },
        { status: 400 },
      );
    }

    // Clean up the code (remove whitespace, convert to uppercase)
    const cleanCode = code.trim().toUpperCase();

    const validation = await validateTemporaryAccessCode(cleanCode);

    if (validation.isValid) {
      const codeData = validation.codeData!;
      return NextResponse.json({
        isValid: true,
        accessLevel: codeData.metadata.access_level,
        expiresAt: codeData.metadata.expires_at,
      });
    } else {
      return NextResponse.json({
        isValid: false,
        reason: validation.reason,
      });
    }
  } catch (error) {
    console.error("Error validating temporary access code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
