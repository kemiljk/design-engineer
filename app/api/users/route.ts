import { NextRequest, NextResponse } from "next/server";
import { getUsers } from "@/lib/database";

/**
 * Get users' info from their ID
 * For `resolveUsers` in liveblocks.config.ts
 */

export async function GET(request: NextRequest) {
  const users = await getUsers();
  const userIds = new URLSearchParams(new URL(request.url).search).getAll(
    "userIds",
  );

  if (!users) {
    return new NextResponse("Missing or invalid userIds", { status: 400 });
  }

  return NextResponse.json(
    userIds.map((userId) => users.find((u) => u.id === userId)),
  );
}
