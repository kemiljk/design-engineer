"use client";

import { RoomProvider } from "@/liveblocks.config";
import { CommentsCanvas } from "./comments-canvas";
import { ClientSideSuspense } from "@liveblocks/react";

export default function CommentsPresence({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<></>}>
        {() => <CommentsCanvas>{children}</CommentsCanvas>}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
