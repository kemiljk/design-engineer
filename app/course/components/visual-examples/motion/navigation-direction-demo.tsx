"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, Home, Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface PathItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const paths: PathItem[][] = [
  [{ id: "home", label: "Home", icon: Home }],
  [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Folder },
  ],
  [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "design-system", label: "Design System", icon: Folder },
  ],
  [
    { id: "home", label: "Home", icon: Home },
    { id: "projects", label: "Projects", icon: Folder },
    { id: "design-system", label: "Design System", icon: Folder },
    { id: "tokens", label: "tokens.json", icon: File },
  ],
];

const pageContent: Record<string, { title: string; items: string[] }> = {
  home: { title: "Home", items: ["Projects", "Settings", "Profile"] },
  projects: { title: "Projects", items: ["Design System", "Marketing Site", "Mobile App"] },
  "design-system": { title: "Design System", items: ["tokens.json", "components/", "docs/"] },
  tokens: { title: "tokens.json", items: ["colors", "spacing", "typography", "shadows"] },
};

export function NavigationDirectionDemo() {
  const [currentPathIndex, setCurrentPathIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showCode, setShowCode] = useState(false);

  const currentPath = paths[currentPathIndex];
  const currentPage = currentPath[currentPath.length - 1];
  const content = pageContent[currentPage.id];

  const navigateTo = (pathIndex: number) => {
    setDirection(pathIndex > currentPathIndex ? 1 : -1);
    setCurrentPathIndex(pathIndex);
  };

  const goForward = () => {
    if (currentPathIndex < paths.length - 1) {
      setDirection(1);
      setCurrentPathIndex((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentPathIndex > 0) {
      setDirection(-1);
      setCurrentPathIndex((prev) => prev - 1);
    }
  };

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { useState, useRef } from "react";

function DirectionalNav() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const navigate = (newPage: number) => {
    // Set direction based on navigation
    setDirection(newPage > currentPage ? 1 : -1);
    setCurrentPage(newPage);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={currentPage}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Page content */}
      </motion.div>
    </AnimatePresence>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <ExampleWrapper
      title="Directional Navigation"
      description="Pages slide left when going 'forward' and right when going 'back', maintaining spatial awareness."
      controls={
        <div className="flex items-center justify-end">
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
      }
    >
      <div className="space-y-6">
        {/* Browser-like interface */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1 border-b border-neutral-200 bg-neutral-50 px-4 py-2 dark:border-neutral-800 dark:bg-neutral-950">
            {currentPath.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && (
                  <ChevronRight className="size-4 text-neutral-400" />
                )}
                <button
                  onClick={() => navigateTo(index)}
                  className={cn(
                    "flex items-center gap-1.5 rounded px-2 py-1 text-sm transition-colors",
                    index === currentPath.length - 1
                      ? "font-medium text-neutral-900 dark:text-white"
                      : "text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                  )}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>

          {/* Content */}
          <div className="relative h-64 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentPage.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 p-6"
              >
                <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                  {content.title}
                </h2>
                <div className="mt-4 space-y-2">
                  {content.items.map((item, i) => (
                    <motion.button
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={goForward}
                      disabled={currentPathIndex === paths.length - 1}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-left transition-colors dark:border-neutral-800 dark:bg-neutral-800",
                        currentPathIndex < paths.length - 1 &&
                          "hover:border-swiss-red/30 hover:bg-swiss-red/5"
                      )}
                    >
                      {item.includes(".") ? (
                        <File className="size-5 text-neutral-400" />
                      ) : (
                        <Folder className="size-5 text-blue-500" />
                      )}
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        {item}
                      </span>
                      {currentPathIndex < paths.length - 1 && (
                        <ChevronRight className="ml-auto size-4 text-neutral-400" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between border-t border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
            <button
              onClick={goBack}
              disabled={currentPathIndex === 0}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                currentPathIndex === 0
                  ? "text-neutral-300 dark:text-neutral-700"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              ← Back
            </button>
            <span className="text-xs text-neutral-400">
              Depth: {currentPathIndex + 1} / {paths.length}
            </span>
            <button
              onClick={goForward}
              disabled={currentPathIndex === paths.length - 1}
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors",
                currentPathIndex === paths.length - 1
                  ? "text-neutral-300 dark:text-neutral-700"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
              )}
            >
              Forward →
            </button>
          </div>
        </div>

        {/* Direction indicator */}
        <div className="flex items-center justify-center gap-8 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="text-center">
            <p className="text-xs font-medium text-neutral-500">Going Deeper</p>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
              Content slides ← left
            </p>
          </div>
          <div className="h-8 w-px bg-neutral-200 dark:bg-neutral-700" />
          <div className="text-center">
            <p className="text-xs font-medium text-neutral-500">Going Back</p>
            <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
              Content slides right →
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Spatial consistency:</strong> By sliding content in the direction of 
            navigation, users maintain a mental model of where they are in the hierarchy. 
            Going "forward" pushes old content left; going "back" brings it from the left. 
            This matches our natural reading direction (LTR) and iOS navigation patterns.
          </p>
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
      </div>
    </ExampleWrapper>
  );
}

