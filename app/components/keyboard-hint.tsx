"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Apple } from "iconoir-react";

export function KeyboardHint() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const isCapturePage = pathname?.startsWith("/capture");

  useEffect(() => {
    // Skip on capture routes
    if (isCapturePage) return;

    setMounted(true);
    const hasSeenHint = localStorage.getItem("keyboard-hint-seen");
    if (hasSeenHint) return;

    const showTimer = setTimeout(() => setShow(true), 2000);
    const hideTimer = setTimeout(() => {
      setShow(false);
      localStorage.setItem("keyboard-hint-seen", "true");
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isCapturePage]);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("keyboard-hint-seen", "true");
  };

  // Hide on capture routes or when not mounted/shown
  if (isCapturePage || !mounted || !show) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden animate-in fade-in slide-in-from-bottom-4 duration-500 md:block"
      role="status"
    >
      <div className="flex items-center gap-3 rounded-none border border-neutral-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/90">
        <div className="flex h-8 w-8 items-center justify-center rounded-none bg-swiss-red text-white">
          <Apple className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Press{" "}
            <kbd className="rounded-none bg-neutral-100 px-1.5 py-0.5 font-mono text-xs dark:bg-neutral-800">
              ⌘K
            </kbd>{" "}
            to search
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Quick navigation anywhere
          </span>
        </div>
        <button
          onClick={dismiss}
          className="focus-ring ml-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
          aria-label="Dismiss hint"
        >
          ×
        </button>
      </div>
    </div>
  );
}
