"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Xmark as X } from "iconoir-react";

interface GalleryFiltersProps {
  currentPlatform?: string;
  currentTrack?: string;
}

const platforms = [
  { value: "web", label: "Web" },
  { value: "ios", label: "iOS" },
  { value: "android", label: "Android" },
];

const tracks = [
  { value: "design", label: "Design" },
  { value: "engineering", label: "Engineering" },
  { value: "convergence", label: "Convergence" },
];

export function GalleryFilters({ currentPlatform, currentTrack }: GalleryFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/course/gallery?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/course/gallery");
  };

  const hasFilters = currentPlatform || currentTrack;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Platform Filter */}
      <select
        value={currentPlatform || ""}
        onChange={(e) => updateFilter("platform", e.target.value || null)}
        className="border border-neutral-200 bg-white px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
      >
        <option value="">All Platforms</option>
        {platforms.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      {/* Track Filter */}
      <select
        value={currentTrack || ""}
        onChange={(e) => updateFilter("track", e.target.value || null)}
        className="border border-neutral-200 bg-white px-3 py-1.5 text-sm dark:border-neutral-700 dark:bg-neutral-800"
      >
        <option value="">All Tracks</option>
        {tracks.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      {/* Clear Filters */}
      {hasFilters && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 px-2 py-1.5 text-sm text-neutral-500 hover:text-swiss-red"
        >
          <X className="h-3 w-3" />
          Clear
        </button>
      )}
    </div>
  );
}
