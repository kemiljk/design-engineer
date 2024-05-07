"use client";

import { useCallback, useEffect, useState } from "react";
import { Composer } from "@liveblocks/react-comments";
import { useCreateThread } from "@/liveblocks.config";
import styles from "./Toolbar.module.css";
import avatarStyles from "./CommentsCanvas.module.css";
import { Button } from "@nextui-org/button";
import { EyeIcon, EyeOffIcon, MessageCirclePlusIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { getRandomGradient } from "@/lib/utils";

export function Toolbar({
  areThreadsVisible,
  setAreThreadsVisible,
}: {
  areThreadsVisible: boolean;
  setAreThreadsVisible: (visible: boolean) => void;
}) {
  // Get create thread function and the current user
  const createThread = useCreateThread();
  const creator = useUser();

  const [state, setState] = useState<"initial" | "placing" | "placed">(
    "initial",
  );
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const reset = useCallback(() => {
    setState("initial");
    setCoords({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && state !== "initial") {
        reset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state, reset]);

  const gradientStyle = getRandomGradient();

  return (
    creator.isSignedIn && (
      <div>
        <div className="fixed bottom-6 right-6 flex items-center gap-2">
          <Button
            onClick={() => setAreThreadsVisible(!areThreadsVisible)}
            isIconOnly
            variant="shadow"
            startContent={
              areThreadsVisible ? (
                <EyeOffIcon className="size-6" />
              ) : (
                <EyeIcon className="size-6" />
              )
            }
          />
          <Button
            isIconOnly
            color="primary"
            variant="shadow"
            onClick={() => setState("placing")}
            style={{ cursor: state === "placing" ? "none" : undefined }}
            startContent={
              <MessageCirclePlusIcon className="size-6 text-background" />
            }
          />
        </div>

        <div
          className={styles.cancelPlacing}
          onClick={reset}
          onContextMenu={(e) => {
            e.preventDefault();
            reset();
          }}
          data-enabled={state !== "initial" ? true : undefined}
        />

        {state === "placing" ? (
          <div
            className={styles.newThreadClick}
            onClick={(e) => {
              // On click, get coords and place down composer
              const avatarOffset = 42;

              const x = e.pageX + avatarOffset;
              const y = e.pageY;

              setCoords({ x, y });
              setState("placed");
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              reset();
            }}
          >
            <NewThreadCursor />
          </div>
        ) : null}

        {state === "placed" ? (
          <>
            <div
              className={styles.composerWrapper}
              style={{ transform: `translate(${coords.x}px, ${coords.y}px)` }}
            >
              <div className={`${avatarStyles.avatar}`} style={gradientStyle}>
                {creator && creator.user?.imageUrl ? (
                  <img
                    src={creator.user?.imageUrl}
                    alt={creator.user?.firstName ?? ""}
                    width="28px"
                    height="28px"
                    draggable={false}
                  />
                ) : (
                  <div />
                )}
              </div>
              <Composer
                className="composer"
                onComposerSubmit={({ body }, e) => {
                  e.preventDefault();
                  setState("initial");
                  // Create a new thread with the current coords as metadata
                  createThread({
                    body,
                    metadata: { x: coords.x, y: coords.y },
                  } as any);
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    )
  );
}

// Render the new thread component over the current user's cursor
function NewThreadCursor() {
  const [coords, setCoords] = useState({
    x: -10000,
    y: -10000,
  });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setCoords({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", updatePosition, false);
    document.addEventListener("mouseenter", updatePosition, false);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", updatePosition);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[999999999999] h-9 w-9 cursor-grab select-none rounded-bl-full rounded-br-full rounded-tl-md rounded-tr-full bg-primary shadow-md"
      style={{
        transform: `translate(${coords.x}px, ${coords.y}px)`,
      }}
    />
  );
}
