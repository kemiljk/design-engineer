"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid,
  List,
  FileImage,
  FileText,
  FileVideo,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type ViewMode = "grid" | "list";

const files = [
  {
    id: 1,
    name: "Project_Proposal.pdf",
    type: "doc",
    size: "2.4 MB",
    color: "bg-blue-500",
    icon: FileText,
  },
  {
    id: 2,
    name: "Hero_Image.png",
    type: "image",
    size: "4.1 MB",
    color: "bg-purple-500",
    icon: FileImage,
  },
  {
    id: 3,
    name: "Demo_Reel.mp4",
    type: "video",
    size: "145 MB",
    color: "bg-rose-500",
    icon: FileVideo,
  },
  {
    id: 4,
    name: "Background_Loop.mp3",
    type: "audio",
    size: "12 MB",
    color: "bg-amber-500",
    icon: Music,
  },
];

export function MotionContinuityDemo() {
  const [view, setView] = useState<ViewMode>("grid");
  const [showCode, setShowCode] = useState(false);

  const cssCode = `.grid-item {
  /* No automatic layout animation */
  width: 100%;
}

.list-item {
  width: 100%;
}

/* 
  Without FLIP animations (JavaScript), 
  changing layout happens instantly 
  and feels jarring.
*/`;

  const motionCode = `import { motion } from "motion/react";

function FileManager() {
  const [view, setView] = useState("grid");

  return (
    <div className={view === "grid" ? "grid grid-cols-2" : "flex flex-col"}>
      {files.map((file) => (
        <motion.div
          layout // The magic prop
          key={file.id}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25
          }}
          className="rounded-2xl bg-white p-4 shadow-sm"
        >
          {/* Content automatically morphs */}
          <motion.div layout className="icon" />
          <motion.span layout>{file.name}</motion.span>
        </motion.div>
      ))}
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Motion Creates Continuity"
      description="Layout animations help users maintain context when the structure of the page changes."
      controls={
        <div className="flex justify-end">
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
        <div className="relative border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900/50">
          {/* Controls - Moved to Top Right */}
          <div className="absolute top-4 right-4 z-10 flex gap-1 rounded-[8px] bg-white p-1 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-all",
                view === "grid"
                  ? "bg-neutral-100 text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200",
              )}
            >
              <LayoutGrid className="size-3.5" />
              Grid
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-all",
                view === "list"
                  ? "bg-neutral-100 text-neutral-900 shadow-sm dark:bg-neutral-700 dark:text-white"
                  : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700/50 dark:hover:text-neutral-200",
              )}
            >
              <List className="size-3.5" />
              List
            </button>
          </div>

          <div className="mt-12">
            {" "}
            {/* Add margin for controls */}
            <motion.div
              layout
              className={cn(
                "gap-4",
                view === "grid" ? "grid grid-cols-2" : "flex flex-col",
              )}
            >
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    layout
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      layout: { duration: 0.3 },
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-[24px] bg-white p-4 shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md dark:bg-neutral-800 dark:ring-neutral-700",
                      view === "list" && "flex items-center gap-4",
                    )}
                  >
                    <motion.div
                      layout
                      className={cn(
                        "flex items-center justify-center rounded-[12px] text-white",
                        file.color,
                        view === "grid"
                          ? "mb-3 aspect-square w-full"
                          : "h-10 w-10 shrink-0",
                      )}
                    >
                      <file.icon
                        className={cn(view === "grid" ? "size-8" : "size-5")}
                      />
                    </motion.div>

                    <div className="min-w-0 flex-1">
                      <motion.h4
                        layout
                        className="truncate text-sm font-medium text-neutral-900 dark:text-white"
                      >
                        {file.name}
                      </motion.h4>
                      <motion.p
                        layout
                        className="text-xs text-neutral-500 dark:text-neutral-400"
                      >
                        {file.type.toUpperCase()} • {file.size}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Spatial Constancy
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              When items move from one position to another, our brain tracks
              them. Without motion, the change feels like a "refresh" where we
              lose our place.
            </p>
          </div>
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              The `layout` Prop
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              In Framer Motion, adding `layout` to a component automatically
              calculates the start and end positions and creates a performant
              FLIP animation.
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
