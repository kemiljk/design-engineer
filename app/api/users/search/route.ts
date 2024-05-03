import { getUsers } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns a list of user IDs from a partial search input
 * For `resolveMentionSuggestions` in liveblocks.config.ts
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text");
  const fetchUsers = await getUsers();

  const filteredUserIds = fetchUsers
    .filter((user) =>
      text ? user?.name?.toLowerCase() === text.toLowerCase() : true,
    )
    .map((user) => user.id);

  return NextResponse.json(filteredUserIds);
}
