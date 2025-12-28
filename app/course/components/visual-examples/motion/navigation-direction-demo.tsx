"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Layers, Layout, FileText, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Level = 0 | 1 | 2;

export function NavigationDirectionDemo() {
  const [level, setLevel] = useState<Level>(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [showCode, setShowCode] = useState(false);

  const navigate = (newLevel: Level) => {
    setDirection(newLevel > level ? "forward" : "back");
    setLevel(newLevel);
  };

  const variants = {
    enter: (direction: "forward" | "back") => ({
      x: direction === "forward" ? "100%" : "-25%",
      opacity: direction === "forward" ? 1 : 0.5,
      scale: direction === "forward" ? 1 : 0.95,
      zIndex: direction === "forward" ? 10 : 0
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      zIndex: 5,
    },
    exit: (direction: "forward" | "back") => ({
      x: direction === "forward" ? "-25%" : "100%",
      opacity: direction === "forward" ? 0.5 : 1,
      scale: direction === "forward" ? 0.95 : 1,
      zIndex: direction === "forward" ? 0 : 10
    }),
  };

  const cssCode = `/* 
  Directional transitions require knowing 
  both the "from" and "to" states.
  This is best handled in JS.
*/

.slide-forward-enter { transform: translateX(100%); }
.slide-forward-exit { transform: translateX(-25%); }

.slide-back-enter { transform: translateX(-25%); }
.slide-back-exit { transform: translateX(100%); }`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-25%",
    opacity: direction > 0 ? 1 : 0.5
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({
    x: direction > 0 ? "-25%" : "100%",
    opacity: direction > 0 ? 0.5 : 1
  })
};

function Navigation() {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={page}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <PageContent />
      </motion.div>
    </AnimatePresence>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Direction Indicates Hierarchy"
      description="Movement on the X-axis communicates depth. Forward (right-to-left) means deeper, Back (left-to-right) means shallower."
      controls={
        <div className="flex justify-end">
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Hierarchy Visualization */}
          <div className="flex flex-col justify-center rounded-[12px] border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h4 className="mb-6 text-sm font-semibold text-neutral-900 dark:text-white">
              Information Architecture
            </h4>
            <div className="space-y-4">
              <button 
                onClick={() => navigate(0)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-[8px] border p-3 transition-all",
                  level === 0 
                    ? "border-indigo-500 bg-indigo-50 shadow-sm dark:bg-indigo-900/20" 
                    : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900"
                )}
              >
                <Layout className={cn("size-5", level === 0 ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400")} />
                <span className={cn("font-medium", level === 0 ? "text-indigo-900 dark:text-indigo-100" : "text-neutral-600 dark:text-neutral-400")}>
                  Level 1: Dashboard
                </span>
                {level === 0 && <span className="ml-auto flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />}
              </button>

              <div className="ml-3 flex items-start gap-2 sm:ml-6 sm:gap-4">
                <CornerDownRight className="mt-4 hidden size-5 text-neutral-300 sm:block" />
                <button 
                  onClick={() => navigate(1)}
                  className={cn(
                    "flex flex-1 items-center gap-3 rounded-[8px] border p-3 transition-all",
                    level === 1
                      ? "border-indigo-500 bg-indigo-50 shadow-sm dark:bg-indigo-900/20" 
                      : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900"
                  )}
                >
                  <Layers className={cn("size-5 shrink-0", level === 1 ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400")} />
                  <span className={cn("truncate font-medium", level === 1 ? "text-indigo-900 dark:text-indigo-100" : "text-neutral-600 dark:text-neutral-400")}>
                    Level 2: Projects
                  </span>
                  {level === 1 && <span className="ml-auto flex h-2 w-2 shrink-0 rounded-full bg-indigo-500 animate-pulse" />}
                </button>
              </div>

              <div className="ml-6 flex items-start gap-2 sm:ml-12 sm:gap-4">
                <CornerDownRight className="mt-4 hidden size-5 text-neutral-300 sm:block" />
                <button 
                  onClick={() => navigate(2)}
                  className={cn(
                    "flex flex-1 items-center gap-3 rounded-[8px] border p-3 transition-all",
                    level === 2
                      ? "border-indigo-500 bg-indigo-50 shadow-sm dark:bg-indigo-900/20" 
                      : "border-neutral-200 bg-white hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900"
                  )}
                >
                  <FileText className={cn("size-5 shrink-0", level === 2 ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400")} />
                  <span className={cn("truncate font-medium", level === 2 ? "text-indigo-900 dark:text-indigo-100" : "text-neutral-600 dark:text-neutral-400")}>
                    Level 3: Details
                  </span>
                  {level === 2 && <span className="ml-auto flex h-2 w-2 shrink-0 rounded-full bg-indigo-500 animate-pulse" />}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative h-[400px] w-[240px] overflow-hidden rounded-[24px] border-[6px] border-neutral-900 bg-black shadow-xl dark:border-neutral-700">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={level}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={cn(
                    "absolute inset-0 flex flex-col p-4",
                    level === 0 ? "bg-white dark:bg-neutral-900" :
                    level === 1 ? "bg-neutral-50 dark:bg-neutral-800" :
                    "bg-neutral-100 dark:bg-neutral-900"
                  )}
                >
                  <div className="mb-4 flex items-center gap-2">
                    {level > 0 && (
                      <button onClick={() => navigate((level - 1) as Level)}>
                        <ChevronLeft className="size-5 text-neutral-500" />
                      </button>
                    )}
                    <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                      {level === 0 ? "Dashboard" : level === 1 ? "Projects" : "Project A"}
                    </h3>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="h-24 rounded-[12px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                    <div className="h-12 rounded-[8px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                    <div className="h-12 rounded-[8px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                    
                    {level < 2 && (
                      <button
                        onClick={() => navigate((level + 1) as Level)}
                        className="mt-4 flex w-full items-center justify-between rounded-[8px] bg-indigo-600 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                      >
                        Go Deeper <ChevronRight className="size-3" />
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {showCode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
