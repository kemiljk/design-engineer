"use client";

import { useEffect, useState } from "react";
import { Eye, X } from "lucide-react";

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
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-none border border-amber-500/50 bg-amber-50 px-4 py-2 text-sm text-amber-800 shadow-lg dark:border-amber-500/30 dark:bg-amber-950/50 dark:text-amber-200">
      <Eye className="h-4 w-4" />
      <span>Preview Mode Active</span>
      <button
        onClick={handleDismiss}
        className="ml-2 rounded-sm p-0.5 hover:bg-amber-200/50 dark:hover:bg-amber-800/50"
        aria-label="Dismiss"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
