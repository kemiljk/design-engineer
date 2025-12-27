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
        className="relative border-2 border-foreground p-2 md:border-[3px] md:p-4 lg:p-5"
        variants={designVariants}
      >
        <span 
          className="text-[2.5rem] font-bold italic md:text-[3.5rem] lg:text-[5rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          design
        </span>
        <MousePointer />
      </motion.div>
      <motion.span
        className="hidden text-[3.5rem] md:block lg:text-[5rem]"
        style={{ letterSpacing: "-0.02em" }}
        variants={timesVariants}
      >
        &times;
      </motion.span>
      <motion.div className="flex items-center" variants={engineerVariants}>
        <span 
          className="font-mono text-[2.5rem] font-semibold md:text-[3.5rem] lg:text-[5rem]"
          style={{ letterSpacing: "-0.05em" }}
        >
          {`<`}
        </span>
        <span 
          className="text-swiss-red font-mono text-[2.5rem] font-semibold md:text-[3.5rem] lg:text-[5rem]"
          style={{ letterSpacing: "-0.05em" }}
        >
          Engineer
        </span>
        <span 
          className="font-mono text-[2.5rem] font-semibold md:text-[3.5rem] lg:text-[5rem]"
          style={{ letterSpacing: "-0.05em" }}
        >
          {` />`}
        </span>
      </motion.div>
    </motion.h1>
  );
}
