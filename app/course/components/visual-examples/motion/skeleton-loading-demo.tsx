"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function SkeletonLoadingDemo() {
  const [isLoading, setIsLoading] = useState(true);
  const [showCode, setShowCode] = useState(false);

  const reload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const cssCode = `.skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-200) 25%,
    var(--neutral-100) 50%,
    var(--neutral-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Dark mode */
.dark .skeleton {
  background: linear-gradient(
    90deg,
    var(--neutral-800) 25%,
    var(--neutral-700) 50%,
    var(--neutral-800) 75%
  );
  background-size: 200% 100%;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function CardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image skeleton */}
      <div className="h-40 w-full animate-shimmer rounded-lg bg-gradient-to-r 
        from-neutral-200 via-neutral-100 to-neutral-200 
        bg-[length:200%_100%]" 
      />
      
      {/* Text skeletons */}
      <div className="h-4 w-3/4 animate-shimmer rounded bg-gradient-to-r 
        from-neutral-200 via-neutral-100 to-neutral-200 
        bg-[length:200%_100%]" 
      />
      <div className="h-4 w-1/2 animate-shimmer rounded bg-gradient-to-r 
        from-neutral-200 via-neutral-100 to-neutral-200 
        bg-[length:200%_100%]" 
      />
    </div>
  );
}

function Card({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <CardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Real content */}
        </motion.div>
      )}
    </AnimatePresence>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Skeleton Loading"
      description="Shimmer skeleton that morphs into real content with smooth transitions."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <ControlButton active={isLoading} onClick={() => setIsLoading(true)}>
              Loading
            </ControlButton>
            <ControlButton active={!isLoading} onClick={() => setIsLoading(false)}>
              Loaded
            </ControlButton>
          </ControlGroup>
          <div className="flex items-center gap-2">
            <button
              onClick={reload}
              className="flex h-8 w-8 items-center justify-center rounded bg-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-600"
              aria-label="Reload"
            >
              <RefreshCw className="size-4" />
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                showCode
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              )}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Card preview */}
        <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                {/* Image skeleton */}
                <div
                  className={cn(
                    "mb-4 flex h-40 items-center justify-center rounded-lg",
                    "animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800",
                    "bg-[length:200%_100%]"
                  )}
                  style={{
                    animation: "shimmer 1.5s infinite linear",
                  }}
                >
                  <ImageIcon className="size-10 text-neutral-300 dark:text-neutral-600" />
                </div>

                {/* Text skeletons */}
                <div className="space-y-3">
                  <div
                    className="h-5 w-3/4 rounded bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800"
                    style={{ animation: "shimmer 1.5s infinite linear" }}
                  />
                  <div
                    className="h-4 w-full rounded bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800"
                    style={{
                      animation: "shimmer 1.5s infinite linear",
                      animationDelay: "0.1s",
                    }}
                  />
                  <div
                    className="h-4 w-2/3 rounded bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800"
                    style={{
                      animation: "shimmer 1.5s infinite linear",
                      animationDelay: "0.2s",
                    }}
                  />
                </div>

                {/* Button skeleton */}
                <div
                  className="mt-4 h-10 w-full rounded-lg bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800"
                  style={{
                    animation: "shimmer 1.5s infinite linear",
                    animationDelay: "0.3s",
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {/* Real image */}
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-violet-500 to-purple-600">
                  <span className="text-4xl">🎨</span>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Design Systems 101
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                    Learn how to build scalable, consistent design systems that bridge
                    design and engineering.
                  </p>
                  <button className="mt-4 w-full rounded-lg bg-swiss-red py-2.5 text-sm font-semibold text-white transition-colors hover:bg-swiss-red/90">
                    Start Learning
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skeleton types */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Text Skeleton</p>
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Avatar Skeleton</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
              <div className="space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
                <div className="h-2 w-16 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="mb-3 text-xs font-medium text-neutral-500">Button Skeleton</p>
            <div className="h-9 w-24 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}

        {/* CSS keyframes (injected) */}
        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    </ExampleWrapper>
  );
}

