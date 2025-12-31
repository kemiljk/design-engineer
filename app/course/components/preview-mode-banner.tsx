"use client";

import { useEffect, useState } from "react";
import { Eye, Xmark as X } from "iconoir-react";

const STORAGE_KEY = "previewBannerDismissed";

export function PreviewModeBanner() {
  const [hasPreview, setHasPreview] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const wasDismissed = localStorage.getItem(STORAGE_KEY) === "true";
    setDismissed(wasDismissed);

    async function checkPreview() {
      try {
        const response = await fetch("/api/course/preview");
        const data = await response.json();
        setHasPreview(data.hasPreviewAccess);
      } catch {
        setHasPreview(false);
      }
    }
    checkPreview();
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!hasPreview || dismissed) return null;

  return (
    <div className="fixed inset-x-0 top-16 z-30 border-b border-amber-500/30 bg-amber-50/95 backdrop-blur-sm dark:bg-amber-950/90">
      <div className="flex items-center justify-center gap-3 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
        <Eye className="h-4 w-4 shrink-0" />
        <span className="font-medium">Preview Mode Active</span>
        <span className="hidden text-amber-700 dark:text-amber-300 sm:inline">
          — You have early access to view this course
        </span>
        <button
          onClick={handleDismiss}
          className="ml-2 rounded-sm p-1 hover:bg-amber-200/50 dark:hover:bg-amber-800/50"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
