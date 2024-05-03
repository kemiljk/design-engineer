"use client";

import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export const client = createClient({
  throttle: 16,
  authEndpoint: "/api/liveblocks-auth",

  // Get users' info from their ID
  resolveUsers: async ({ userIds }) => {
    const searchParams = new URLSearchParams(
      userIds.map((userId) => ["userIds", userId]),
    );
    const response = await fetch(`/api/users?${searchParams}`);

    if (!response.ok) {
      throw new Error("Problem resolving users");
    }

    const users = await response.json();
    return users;
  },

  // Find a list of users that match the current search term
  resolveMentionSuggestions: async ({ text }) => {
    const response = await fetch(
      `/api/users/search?text=${encodeURIComponent(text)}`,
    );

    if (!response.ok) {
      throw new Error("Problem resolving mention suggestions");
    }

    const userIds = await response.json();
    return userIds;
  },
});

// Presence represents the properties that exist on every user in the Room
// and that will automatically be kept in sync. Accessible through the
// `user.presence` property. Must be JSON-serializable.
type Presence = {
  cursor: { x: number; y: number } | null;
};

// Optionally, Storage represents the shared document that persists in the
// Room, even after all users leave. Fields under Storage typically are
// LiveList, LiveMap, LiveObject instances, for which updates are
// automatically persisted and synced to all connected clients.
type Storage = {
  // author: LiveObject<{ firstName: string, lastName: string }>,
  // ...
};

// Optionally, the type of custom events broadcast and listened to in this
// room. Use a union for multiple events. Must be JSON-serializable.
type RoomEvent = {
  // type: "NOTIFICATION",
  // ...
};

type UserInfo = {
  id: string;
  info: {
    name: string;
    avatar: string;
  };
};

export type ThreadMetadata = {
  x: number;
  y: number;
  zIndex: number;
};

const {
  suspense: {
    RoomProvider,
    useThreads,
    useEditThreadMetadata,
    useUser,
    useCreateThread,
    useSelf,
    useOthers,
    useMyPresence,
  },
} = createRoomContext<Presence, ThreadMetadata, UserInfo>(client);

export {
  RoomProvider,
  useThreads,
  useEditThreadMetadata,
  useUser,
  useCreateThread,
  useSelf,
  useOthers,
  useMyPresence,
};
