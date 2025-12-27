"use client";

import { motion } from "motion/react";
import { MousePointer } from "./mouse-pointer";
import { ease, duration } from "@/lib/motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const designVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

const timesVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.normal, ease: ease.outQuint },
  },
};

const engineerVariants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: ease.outQuint },
  },
};

export default function PageTitle() {
  return (
    <motion.h1
      className="flex flex-col items-center justify-center gap-2 text-foreground md:flex-row md:gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="relative border-2 border-foreground p-2 md:border-[3px] md:p-4"
        variants={designVariants}
      >
        <span className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          design
        </span>
        <MousePointer />
      </motion.div>
      <motion.span
        className="hidden text-5xl tracking-tight md:block lg:text-6xl"
        variants={timesVariants}
      >
        &times;
      </motion.span>
      <motion.div className="flex items-center" variants={engineerVariants}>
        <span className="font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-6xl">
          {`<`}
        </span>
        <span className="text-swiss-red font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-6xl">
          Engineer
        </span>
        <span className="font-mono text-4xl font-semibold tracking-tighter md:text-5xl lg:text-6xl">
          {` />`}
        </span>
      </motion.div>
    </motion.h1>
  );
}
