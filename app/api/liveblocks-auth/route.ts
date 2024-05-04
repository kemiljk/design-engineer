import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
/**
 * Authenticating your Liveblocks application
 * https://liveblocks.io/docs/authentication
 */

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST() {
  if (!process.env.LIVEBLOCKS_SECRET_KEY) {
    return new NextResponse("Missing LIVEBLOCKS_SECRET_KEY", { status: 403 });
  }

  // Get the current user's unique id from your database
  const user = await currentUser();

  // Create a session for the current user (access token auth)
  const session = liveblocks.prepareSession(user ? user?.id : "anonymous", {
    userInfo: {
      name: user?.firstName || "Anonymous",
    },
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow("*", session.FULL_ACCESS);

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  return new NextResponse(body, { status });
}
