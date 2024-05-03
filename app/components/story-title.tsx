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
    <div
      key={story.id}
      className="sticky top-12 z-[9999999999] w-fit"
      ref={ref}
    >
      <motion.div
        className={`inline-block ${isSticky && "rounded-3xl bg-background/50 px-6 py-4 shadow-2xl backdrop-blur-md"}`}
        animate={{
          scale: isSticky ? 0.5 : 1,
          width: "fit-content",
          x: isSticky && !isMobile ? 230 : 0,
        }}
      >
        <motion.h1
          className={`inline-block text-5xl tracking-tight text-foreground`}
          animate={{
            fontWeight: isSticky ? 600 : 800,
          }}
          transition={{ duration: 0.2 }}
        >
          {story.title}
        </motion.h1>
      </motion.div>
    </div>
  );
};
