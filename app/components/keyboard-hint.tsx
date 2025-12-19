"use client";

import { useEffect, useState } from "react";
import { Command } from "lucide-react";

export function KeyboardHint() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
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
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem("keyboard-hint-seen", "true");
  };

  if (!mounted || !show) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden animate-in fade-in slide-in-from-bottom-4 duration-500 md:block"
      role="status"
    >
      <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-600 text-white">
          <Command className="h-4 w-4" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Press{" "}
            <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800">
              ⌘K
            </kbd>{" "}
            to search
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            Quick navigation anywhere
          </span>
        </div>
        <button
          onClick={dismiss}
          className="ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
          aria-label="Dismiss hint"
        >
          ×
        </button>
      </div>
    </div>
  );
}
