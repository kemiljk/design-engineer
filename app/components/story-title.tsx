"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as Type from "@/lib/types";
import { useMediaQuery } from "usehooks-ts";

function throttle<F extends (...args: any[]) => void>(
  func: F,
  limit: number,
): (...args: Parameters<F>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<F>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export const StoryTitle = ({ story }: { story: Type.Story }) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 640px)");

  const checkStickiness = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 80);
    }
  };

  useLayoutEffect(() => {
    const debouncedHandleScroll = throttle(checkStickiness, 10);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <div key={story.id} className="sticky top-2 z-[9999999] h-full" ref={ref}>
      <motion.h1
        className={`flex flex-col items-start text-5xl tracking-tight text-foreground`}
        animate={{
          scale: isSticky ? 0.5 : 1,
          fontWeight: isSticky ? 600 : 800,
          x: isSticky && !isMobile ? -230 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {story.title}
      </motion.h1>
    </div>
  );
};
