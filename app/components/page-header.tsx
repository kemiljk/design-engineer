"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

const COLUMNS = 12;
const ROWS = 5;

const gridLineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: i * 0.025,
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
      delay: 0.12 + i * 0.03,
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
      delay: 0.25,
    },
  },
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
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: 0.38,
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
      delay: 0.46,
    },
  },
};

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      {/* Grid Container */}
      <div className="container relative mx-auto px-4">
        {/* Vertical Grid Lines */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {Array.from({ length: COLUMNS + 1 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              custom={i}
              variants={gridLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute top-0 h-full w-px origin-top bg-neutral-200/50 dark:bg-neutral-800/50"
              style={{
                left: i === 0 ? 0 : `${(i / COLUMNS) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Horizontal Grid Lines */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        >
          {Array.from({ length: ROWS + 1 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              custom={i}
              variants={horizontalLineVariants}
              initial="hidden"
              animate="visible"
              className="absolute left-0 h-px w-full origin-left bg-neutral-200/50 dark:bg-neutral-800/50"
              style={{
                top: `${(i / ROWS) * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Content Area using CSS Grid for alignment */}
        <div
          className="relative py-12 md:py-16 lg:py-20"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
            minHeight: "260px",
            gap: "0",
          }}
        >
          {/* Grid Intersection Marker - Origin point */}
          <motion.div
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-swiss-red"
            style={{
              left: 0,
              top: `${(1 / ROWS) * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />

          {/* Grid coordinate label */}
          <motion.span
            className="absolute font-mono text-[10px] tracking-wider text-neutral-300 uppercase dark:text-neutral-700"
            style={{
              right: `${(1 / COLUMNS) * 100}%`,
              top: `${(0.5 / ROWS) * 100}%`,
              transform: "translate(50%, -50%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            aria-hidden="true"
          >
            12×5
          </motion.span>

          {/* Title Block - Aligned to grid */}
          <div
            className="relative z-10 flex flex-col justify-end pb-2"
            style={{
              gridColumn: "1 / -1",
              gridRow: "1 / 4",
            }}
          >
            {/* Swiss-style accent bar */}
            <motion.div
              className="mb-3 h-1 w-12 origin-left bg-swiss-red md:w-16"
              variants={accentVariants}
              initial="hidden"
              animate="visible"
              aria-hidden="true"
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

          {/* Description Block - Aligned to lower grid rows */}
          {description && (
            <motion.div
              className="relative z-10 flex items-start pt-4"
              style={{
                gridColumn: "1 / 9",
                gridRow: "4 / 6",
              }}
              variants={descriptionVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="max-w-2xl text-lg text-pretty text-neutral-600 dark:text-neutral-400">
                {description}
              </p>
            </motion.div>
          )}

          {/* Children Block - Right-aligned on larger screens */}
          {children && (
            <motion.div
              className="relative z-10 flex items-start justify-start pt-4 md:justify-end"
              style={{
                gridColumn: description ? "9 / -1" : "1 / -1",
                gridRow: description ? "4 / 6" : "4 / 6",
              }}
              variants={childrenVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </motion.div>
          )}

          {/* Grid Intersection Marker - Content endpoint */}
          <motion.div
            className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 bg-swiss-red/60"
            style={{
              left: `${(8 / COLUMNS) * 100}%`,
              top: `${(3 / ROWS) * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-swiss-red/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 0.5,
          duration: duration.slower,
          ease: ease.outQuint,
        }}
        aria-hidden="true"
      />
    </div>
  );
}
