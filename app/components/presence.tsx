"use client";

import { RoomProvider } from "../../liveblocks.config";
import PresenceProvider from "./presence-provider";

export default function Presence({ children }: { children: React.ReactNode }) {
  const roomId = "live-cursors";

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <PresenceProvider />
      {children}
    </RoomProvider>
  );
}
