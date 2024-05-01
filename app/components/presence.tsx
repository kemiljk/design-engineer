"use client";

import { RoomProvider } from "../../liveblocks.config";
import PresenceProvider from "./presence-provider";

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
      <PresenceProvider>{children}</PresenceProvider>
    </RoomProvider>
  );
}
