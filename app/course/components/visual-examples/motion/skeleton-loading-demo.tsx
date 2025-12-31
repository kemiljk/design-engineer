"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Refresh as RefreshCw, MediaImage as ImageIcon } from "iconoir-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

const ShimmerOverlay = () => (
  <motion.div
    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10"
    animate={{
      x: ["-100%", "200%"],
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    }}
    style={{
      width: "50%",
    }}
  />
);

const SkeletonCard = () => (
  <motion.div
    className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    animate={{
      scale: [1, 1.002, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Shimmer effect */}
    <ShimmerOverlay />

    {/* Image Placeholder */}
    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-neutral-100 dark:bg-neutral-800">
      <ImageIcon className="size-10 text-neutral-300 dark:text-neutral-600" />
      <ShimmerOverlay />
    </div>

    <div className="space-y-4 p-6">
      {/* Avatar & Title Skeleton */}
      <div className="flex items-center gap-4">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <ShimmerOverlay />
        </div>
        <div className="flex-1 space-y-2">
          <div className="relative h-4 w-3/4 overflow-hidden rounded-[8px] bg-neutral-100 dark:bg-neutral-800">
            <ShimmerOverlay />
          </div>
          <div className="relative h-3 w-1/2 overflow-hidden rounded-[8px] bg-neutral-100 dark:bg-neutral-800">
            <ShimmerOverlay />
          </div>
        </div>
      </div>

      {/* Text Block Skeletons */}
      <div className="space-y-2">
        <div className="relative h-3 w-full overflow-hidden rounded-[8px] bg-neutral-100 dark:bg-neutral-800">
          <ShimmerOverlay />
        </div>
        <div className="relative h-3 w-11/12 overflow-hidden rounded-[8px] bg-neutral-100 dark:bg-neutral-800">
          <ShimmerOverlay />
        </div>
        <div className="relative h-3 w-4/5 overflow-hidden rounded-[8px] bg-neutral-100 dark:bg-neutral-800">
          <ShimmerOverlay />
        </div>
      </div>
    </div>
  </motion.div>
);

const LoadedCard = () => (
  <div
    className="overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-md dark:border-neutral-800 dark:bg-neutral-900"
    style={{
      animation: "fadeIn 0.5s ease-out forwards",
    }}
  >
    <div className="h-48 w-full bg-gradient-to-br from-indigo-500 to-purple-600" />
    <div className="space-y-4 p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
          K
        </div>
        <div>
          <h3 className="font-bold text-neutral-900 dark:text-white">
            Karl Koch
          </h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Design Engineer
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        Just shipped a new course on UI animation! Learn how to build beautiful,
        fluid interfaces with React and Framer Motion.
      </p>

      <div className="flex justify-end">
        <button className="rounded-[12px] bg-neutral-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100">
          Read More
        </button>
      </div>
    </div>
  </div>
);

export function SkeletonLoadingDemo() {
  const [loading, setLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const toggleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const cssCode = `@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.shimmer-bg {
  background: linear-gradient(to right, #f0f0f0 0%, #e0e0e0 20%, #f0f0f0 40%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}`;

  const motionCode = `import { motion } from "motion/react";

function Skeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="skeleton-card"
    >
      {/* Shimmer effect */}
      <motion.div
        className="shimmer-overlay"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
      {/* ... skeleton elements ... */}
    </motion.div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Skeleton Loading"
      description="Placeholder UI that mimics content structure while data is being fetched."
      controls={
        <div className="flex items-center justify-between">
          <button
            onClick={toggleLoading}
            className="flex items-center gap-2 bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 dark:ring-1 dark:ring-neutral-700/80 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
            {loading ? "Loading..." : "Reload Data"}
          </button>
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="skeleton"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <SkeletonCard />
                </motion.div>
              ) : (
                <motion.div
                  key="loaded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <LoadedCard />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Perceived Performance
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The moving gradient (shimmer) indicates activity. It tells the
              user "the app is working, not frozen."
            </p>
          </div>
          <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Reduced Layout Shift
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              By reserving space for content, we prevent layout shift (CLS) when
              the data loads, creating a smoother experience.
            </p>
          </div>
        </div>

        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
