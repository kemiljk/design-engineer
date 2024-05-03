"use client";

import { useThreads } from "@/liveblocks.config";
import { Composer, Thread } from "@liveblocks/react-comments";
import "@liveblocks/react-comments/styles.css";
import "@liveblocks/react-comments/styles/dark/media-query.css";

function Comments() {
  const { threads } = useThreads();

  return (
    <main className="overflow-hidden rounded-2xl">
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
          showResolveAction={false}
          className="thread"
        />
      ))}
      <Composer className="composer" />
    </main>
  );
}

export default Comments;
