"use client";

import { useCallback, useMemo, useState } from "react";
import { Thread } from "@liveblocks/react-comments";
import { useMaxZIndex } from "@/lib/useMaxZIndex";
import { ThreadData } from "@liveblocks/core";
import {
  ThreadMetadata,
  useThreads,
  useEditThreadMetadata,
  useUser,
} from "@/liveblocks.config";
import {
  DataRef,
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import styles from "./CommentsCanvas.module.css";
import { Toolbar } from "./toolbar";
import { getRandomGradient } from "@/lib/utils";
import { Image } from "@nextui-org/react";

export function CommentsCanvas({ children }: { children: React.ReactNode }) {
  const { threads } = useThreads();
  const maxZIndex = useMaxZIndex();
  const [areThreadsVisible, setAreThreadsVisible] = useState(true);
  const editThreadMetadata = useEditThreadMetadata();

  // Allow click event on avatar if thread moved less than 3px
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  // On drag end, update thread metadata with new coords
  const handleDragEnd = useCallback(
    ({ active, delta }: DragEndEvent) => {
      const thread = (
        active.data as DataRef<{ thread: ThreadData<ThreadMetadata> }>
      ).current?.thread;

      if (!thread) {
        return;
      }

      editThreadMetadata({
        threadId: thread.id,
        metadata: {
          x: thread.metadata.x + delta.x,
          y: thread.metadata.y + delta.y,
          zIndex: maxZIndex + 1,
        },
      } as { threadId: string; metadata: { x: number; y: number } });
    },
    [editThreadMetadata, maxZIndex],
  );

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {areThreadsVisible &&
          threads.map((thread) => (
            <DraggableThread key={thread.id} thread={thread} />
          ))}
        {children}
      </DndContext>
      <Toolbar
        areThreadsVisible={areThreadsVisible}
        setAreThreadsVisible={setAreThreadsVisible}
      />
    </>
  );
}

// A draggable thread
function DraggableThread({ thread }: { thread: ThreadData<ThreadMetadata> }) {
  // Open threads that have just been created
  const startOpen = useMemo(() => {
    return Number(new Date()) - Number(new Date(thread.createdAt)) <= 100;
  }, [thread]);
  const [open, setOpen] = useState(startOpen);
  const gradientStyle = getRandomGradient();

  // Enable drag
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: thread.id,
    data: { thread }, // Pass thread to DndContext drag end event
  });

  // If currently dragging, add drag values to current metadata
  const x = transform ? transform.x + thread.metadata.x : thread.metadata.x;
  const y = transform ? transform.y + thread.metadata.y : thread.metadata.y;
  const zIndex = transform ? 9999 : 0; // Replace 9999 with the highest z-index you want

  // Get the creator of the thread
  const { user: creator } = useUser(thread.comments[0].userId);

  return (
    <div
      ref={setNodeRef}
      className={styles.draggableThread}
      style={{ transform: `translate3d(${x}px, ${y}px, 0)`, zIndex }}
    >
      <div {...listeners} {...attributes}>
        <div
          className={`${styles.avatar}`}
          style={gradientStyle}
          onClick={() => setOpen(!open)}
        >
          {creator && creator.avatar ? (
            <Image
              src={creator.avatar}
              alt={creator.name}
              width="28px"
              height="28px"
              draggable={false}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
      {open ? <Thread thread={thread} className="thread" /> : null}
    </div>
  );
}
