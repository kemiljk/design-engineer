import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// File-based test access override (survives HMR, works across modules)
const TEST_ACCESS_FILE = path.join(process.cwd(), ".test-access-override");

const ALLOW_TEST_ACCESS =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_COURSE_TEST_MODE === "true";

async function getOverride(): Promise<string | null> {
  try {
    const content = await fs.readFile(TEST_ACCESS_FILE, "utf-8");
    return content.trim() || null;
  } catch {
    return null;
  }
}

async function setOverride(level: string | null): Promise<void> {
  if (level === null) {
    try {
      await fs.unlink(TEST_ACCESS_FILE);
    } catch {
      // File doesn't exist, that's fine
    }
  } else {
    await fs.writeFile(TEST_ACCESS_FILE, level, "utf-8");
  }
}

export async function GET() {
  if (!ALLOW_TEST_ACCESS) {
    return NextResponse.json(
      { error: "Test access endpoint not available" },
      { status: 403 }
    );
  }

  const override = await getOverride();

  return NextResponse.json({
    override,
    envTestMode: process.env.NEXT_PUBLIC_COURSE_TEST_MODE,
    envAccessLevel: process.env.NEXT_PUBLIC_COURSE_TEST_ACCESS,
    effectiveLevel: override ?? process.env.NEXT_PUBLIC_COURSE_TEST_ACCESS ?? "full",
  });
}

export async function POST(request: NextRequest) {
  if (!ALLOW_TEST_ACCESS) {
    return NextResponse.json(
      { error: "Test access endpoint not available" },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { accessLevel } = body;

  const validLevels = [
    "free",
    "design_web",
    "design_ios",
    "design_android",
    "engineering_web",
    "engineering_ios",
    "engineering_android",
    "full",
  ];

  if (accessLevel !== null && !validLevels.includes(accessLevel)) {
    return NextResponse.json(
      { error: "Invalid access level", validLevels },
      { status: 400 }
    );
  }

  await setOverride(accessLevel);

  return NextResponse.json({
    message: `Test access level set to: ${accessLevel ?? "env default"}`,
    override: accessLevel,
  });
}

export async function DELETE() {
  if (!ALLOW_TEST_ACCESS) {
    return NextResponse.json(
      { error: "Test access endpoint not available" },
      { status: 403 }
    );
  }

  await setOverride(null);

  return NextResponse.json({
    message: "Test access override cleared, using env default",
    override: null,
  });
}
