"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion";

interface SwissGridHeroProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  /** Number of columns in the grid (default: 12) */
  columns?: number;
  /** Number of rows in the grid (default: 6) */
  rows?: number;
}

const gridLineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: i * 0.03,
    },
  }),
};

const horizontalLineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.15 + i * 0.04,
    },
  }),
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.3,
    },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, y: 16 },
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

const childrenVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.5,
    },
  },
};

const accentVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: duration.normal,
      ease: ease.outQuint,
      delay: 0.35,
    },
  },
};

export function SwissGridHero({
  title,
  description,
  children,
  columns = 12,
  rows = 6,
}: SwissGridHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      {/* Grid Container */}
      <div className="container relative mx-auto px-4">
        {/* Vertical Grid Lines */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {Array.from({ length: columns + 1 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              custom={i}
              variants={gridLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-0 h-full w-px origin-top bg-neutral-200/60 dark:bg-neutral-800/60"
              style={{
                left: i === 0 ? 0 : `${(i / columns) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Horizontal Grid Lines */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: rows + 1 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              custom={i}
              variants={horizontalLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute left-0 h-px w-full origin-left bg-neutral-200/60 dark:bg-neutral-800/60"
              style={{
                top: `${(i / rows) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Content Area */}
        <div
          className="relative py-16 md:py-24"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            minHeight: "320px",
          }}
        >
          {/* Grid Intersection Markers - Top Left */}
          <motion.div
            className="absolute left-0 top-0 h-2 w-2 bg-swiss-red"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.2, ease: ease.outQuint }}
          />

          {/* Grid Intersection Markers - Bottom Right of Title Area */}
          <motion.div
            className="absolute h-2 w-2 bg-swiss-red"
            style={{
              left: `${(8 / columns) * 100}%`,
              top: `${(4 / rows) * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.2, ease: ease.outQuint }}
          />

          {/* Title Block - Spans columns 1-8, rows 2-4 */}
          <div
            className="relative flex flex-col justify-end"
            style={{
              gridColumn: "1 / 9",
              gridRow: "2 / 5",
            }}
          >
            {/* Swiss-style accent bar */}
            <motion.div
              className="mb-4 h-1 w-16 origin-left bg-swiss-red"
              variants={accentVariants}
              initial="hidden"
              animate="visible"
            />

            <motion.h1
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>
          </div>

          {/* Description Block - Spans columns 1-6, rows 5-6 */}
          {description && (
            <motion.div
              className="relative flex items-start"
              style={{
                gridColumn: "1 / 7",
                gridRow: "5 / 7",
              }}
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="max-w-xl text-lg text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            </motion.div>
          )}

          {/* Children Block - Right side, rows 5-6 */}
          {children && (
            <motion.div
              className="relative flex items-start justify-end"
              style={{
                gridColumn: "9 / 13",
                gridRow: "5 / 7",
              }}
              variants={childrenVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          )}

          {/* Grid coordinate markers */}
          <motion.span
            className="absolute font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600"
            style={{
              left: `${(1 / columns) * 100}%`,
              top: `${(1 / rows) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            A1
          </motion.span>

          <motion.span
            className="absolute font-mono text-[10px] tracking-wider text-neutral-400 uppercase dark:text-neutral-600"
            style={{
              left: `${(11 / columns) * 100}%`,
              top: `${(1 / rows) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.3 }}
          >
            K1
          </motion.span>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-swiss-red/30"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: duration.slower, ease: ease.outQuint }}
      />
    </div>
  );
}
