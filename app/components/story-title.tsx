"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
      <motion.h1
        className={`flex flex-col items-center gap-4 text-xl font-black tracking-tight text-black dark:text-white md:text-3xl`}
        animate={{
          scale: isSticky ? 1 : 1.5,
          fontWeight: isSticky ? 700 : 900,
        }}
        transition={{ duration: 0.2 }}
      >
        {story.title}
      </motion.h1>
    </div>
  );
};
