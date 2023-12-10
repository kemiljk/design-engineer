"use client";
import React, { useEffect, useRef, useState } from "react";

import * as Type from "@/lib/types";

export const StoryTitle = ({ story }: { story: Type.Story }) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const checkStickiness = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 12);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkStickiness);
    return () => {
      window.removeEventListener("scroll", checkStickiness);
    };
  }, []);

  return (
    <div key={story.id} className="sticky top-3 z-[9999999] h-full" ref={ref}>
      <h1
        className={`flex flex-col items-center gap-4 tracking-tight text-black dark:text-white ${
          isSticky ? "text-xl md:text-3xl" : "text-3xl md:text-5xl"
        } font-black`}
      >
        {story.title}
      </h1>
    </div>
  );
};
