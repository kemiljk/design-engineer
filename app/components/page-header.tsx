"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

// Navigation height (h-16 = 64px)
const NAV_HEIGHT = 64;

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: i * 0.015,
    },
  }),
};

const horizontalLineVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.08 + i * 0.03,
    },
  }),
};

const accentVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: duration.normal,
      ease: ease.outQuint,
      delay: 0.2,
    },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.25,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.32,
    },
  },
};

const childrenVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.4,
    },
  },
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  const topOffset = NAV_HEIGHT;

  return (
    <div
      className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
      style={{ paddingTop: topOffset }}
    >
      {/* Main container - defines the content width */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* 
          Swiss Grid Container
          The grid lines and content share the SAME CSS grid.
          This guarantees perfect alignment.
        */}
        <div
          className="relative grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12"
          style={{ gridTemplateRows: "auto auto auto auto" }}
        >
          {/* 
            Vertical Grid Lines - use same percentage math as CSS grid
            Mobile: 4 cols (0%, 25%, 50%, 75%, 100%)
            Tablet: 6 cols (0%, 16.67%, 33.33%, 50%, 66.67%, 83.33%, 100%)
            Desktop: 12 cols (0%, 8.33%, 16.67%, ..., 100%)
          */}
          <div className="pointer-events-none absolute inset-0 md:hidden" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`m-${i}`}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                style={{ left: `${(i / 4) * 100}%` }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 hidden md:block lg:hidden" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={`t-${i}`}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                style={{ left: `${(i / 6) * 100}%` }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <motion.div
                key={`d-${i}`}
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                style={{ left: `${(i / 12) * 100}%` }}
              />
            ))}
          </div>

          {/* Horizontal lines at row boundaries */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {[0, 1].map((i) => (
              <motion.div
                key={`h-${i}`}
                custom={i}
                variants={horizontalLineVariants}
                initial="hidden"
                animate="visible"
                className="absolute left-0 h-px w-full origin-left bg-neutral-200 dark:bg-neutral-800"
                style={{ top: i === 0 ? 0 : "100%" }}
              />
            ))}
          </div>

          {/* Row 1: Accent bar */}
          <div className="col-span-full pt-8 pb-3 md:pt-10 lg:pt-12">
            <motion.div
              className="h-1 w-8 origin-left bg-swiss-red md:w-10 lg:w-12"
              variants={accentVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
            />
          </div>

          {/* Row 2: Title */}
          <motion.h1
            className="col-span-full pb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>

          {/* Row 3: Description */}
          {description && (
            <motion.p
              className="col-span-full pb-4 text-base leading-relaxed text-pretty text-neutral-600 md:col-span-5 md:text-lg lg:col-span-8 dark:text-neutral-400"
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              {description}
            </motion.p>
          )}

          {/* Row 4: Children */}
          {children && (
            <motion.div
              className="col-span-full"
              variants={childrenVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          )}

          {/* Bottom spacing */}
          <div className="col-span-full pb-6 md:pb-8 lg:pb-10" />

          {/* Corner markers */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-swiss-red"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 translate-x-1/2 translate-y-1/2 bg-swiss-red"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />

          {/* Grid label */}
          <motion.span
            className="pointer-events-none absolute top-2 right-0 font-mono text-[10px] tracking-wider text-neutral-300 dark:text-neutral-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            aria-hidden="true"
          >
            <span className="md:hidden">4</span>
            <span className="hidden md:inline lg:hidden">6</span>
            <span className="hidden lg:inline">12</span>
          </motion.span>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-swiss-red/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 0.35,
          duration: duration.slower,
          ease: ease.outQuint,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
