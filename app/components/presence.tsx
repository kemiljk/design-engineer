"use client";

import { RoomProvider } from "../../liveblocks.config";
import PresenceProvider from "./presence-provider";
import { ClientSideSuspense } from "@liveblocks/react";

export default function Presence({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense fallback={<></>}>
        {() => <PresenceProvider>{children}</PresenceProvider>}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
