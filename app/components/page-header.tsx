"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { ease, duration } from "@/lib/motion";

interface PageHeaderProps {
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}

// Responsive column counts: mobile 4, tablet 6, desktop 12
const MOBILE_COLS = 4;
const TABLET_COLS = 6;
const DESKTOP_COLS = 12;

// Navigation height (h-16 = 64px)
const NAV_HEIGHT = 64;

const gridLineVariants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: duration.slow,
      ease: ease.outQuint,
      delay: i * 0.02,
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
      delay: 0.1 + i * 0.04,
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
  // The banner is sticky (in document flow), so content naturally starts after it.
  // We only need to offset for the fixed nav height.
  const topOffset = NAV_HEIGHT;

  return (
    <div 
      className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black"
      style={{ paddingTop: topOffset }}
    >
      {/* Main container with padding */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Grid wrapper - this defines the actual grid area */}
        <div className="relative">
          {/* 
            Vertical Grid Lines - Responsive
            Mobile: 4 columns, Tablet: 6 columns, Desktop: 12 columns
            Lines appear at column boundaries (between cells)
          */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            {/* Mobile grid lines (4 cols) - visible on small screens */}
            <div className="absolute inset-0 md:hidden">
              {Array.from({ length: MOBILE_COLS + 1 }).map((_, i) => (
                <motion.div
                  key={`v-mobile-${i}`}
                  custom={i}
                  variants={gridLineVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                  style={{
                    left: `calc(${(i / MOBILE_COLS) * 100}% - 0.5px)`,
                  }}
                />
              ))}
            </div>

            {/* Tablet grid lines (6 cols) - visible on medium screens */}
            <div className="absolute inset-0 hidden md:block lg:hidden">
              {Array.from({ length: TABLET_COLS + 1 }).map((_, i) => (
                <motion.div
                  key={`v-tablet-${i}`}
                  custom={i}
                  variants={gridLineVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                  style={{
                    left: `calc(${(i / TABLET_COLS) * 100}% - 0.5px)`,
                  }}
                />
              ))}
            </div>

            {/* Desktop grid lines (12 cols) - visible on large screens */}
            <div className="absolute inset-0 hidden lg:block">
              {Array.from({ length: DESKTOP_COLS + 1 }).map((_, i) => (
                <motion.div
                  key={`v-desktop-${i}`}
                  custom={i}
                  variants={gridLineVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute top-0 h-full w-px origin-top bg-neutral-200 dark:bg-neutral-800"
                  style={{
                    left: `calc(${(i / DESKTOP_COLS) * 100}% - 0.5px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Horizontal Grid Lines - 4 rows */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={`h-${i}`}
                custom={i}
                variants={horizontalLineVariants}
                initial="hidden"
                animate="visible"
                className="absolute left-0 h-px w-full origin-left bg-neutral-200 dark:bg-neutral-800"
                style={{
                  top: `calc(${i * 25}% - 0.5px)`,
                }}
              />
            ))}
          </div>

          {/* Content Grid - No gap so columns align exactly with grid lines */}
          <div className="relative grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {/* Row 1: Accent bar - always starts at column 1 */}
            <div className="col-span-full flex items-end pb-3 pt-8 md:pt-10 lg:pt-12">
              <motion.div
                className="h-1 w-8 origin-left bg-swiss-red md:w-10 lg:w-12"
                variants={accentVariants}
                initial="hidden"
                animate="visible"
                aria-hidden="true"
              />
            </div>

            {/* Row 2: Title - spans full width, aligned to left edge */}
            <motion.h1
              className="col-span-full pb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>

            {/* Row 3: Description - spans most columns */}
            {description && (
              <motion.p
                className="col-span-full pb-4 text-base text-pretty leading-relaxed text-neutral-600 md:col-span-5 md:text-lg lg:col-span-8 dark:text-neutral-400"
                variants={descriptionVariants}
                initial="hidden"
                animate="visible"
              >
                {description}
              </motion.p>
            )}

            {/* Children - always full width, stacks below description */}
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

            {/* Bottom spacing row */}
            <div className="col-span-full pb-4 md:pb-6 lg:pb-8" />
          </div>

          {/* Grid intersection markers at key points */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-swiss-red"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />

          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 translate-x-1/2 translate-y-1/2 bg-swiss-red"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.2, ease: ease.outQuint }}
            aria-hidden="true"
          />

          {/* Grid coordinate labels */}
          <motion.span
            className="pointer-events-none absolute right-0 top-2 font-mono text-[10px] tracking-wider text-neutral-300 dark:text-neutral-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            aria-hidden="true"
          >
            <span className="md:hidden">{MOBILE_COLS}×4</span>
            <span className="hidden md:inline lg:hidden">{TABLET_COLS}×4</span>
            <span className="hidden lg:inline">{DESKTOP_COLS}×4</span>
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
