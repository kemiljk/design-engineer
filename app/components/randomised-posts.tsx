"use client";

import { useState, useEffect } from "react";
import * as Type from "@/lib/types";
import { ContentCard } from "./content-card";
import cn from "classnames";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function RandomisedPosts({
  posts,
  count = 3,
}: {
  posts: Type.Post[];
  count?: number;
}) {
  // Start with the first N posts to match server render and avoid hydration mismatch
  const [selectedPosts, setSelectedPosts] = useState(() =>
    posts.slice(0, count),
  );

  // Randomize only after hydration on the client
  useEffect(() => {
    const shuffled = shuffleArray(posts);
    setSelectedPosts(shuffled.slice(0, count));
  }, [posts, count]);

  return (
    <div className="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {selectedPosts.map((post: Type.Post) => (
        <ContentCard
          key={post.id}
          post={post}
          className={cn(
            "transition-all duration-500 ease-in-out hover:rotate-0 hover:cursor-pointer",
          )}
        />
      ))}
    </div>
  );
}
