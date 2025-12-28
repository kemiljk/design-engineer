"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type TransitionType = "fade" | "slide" | "scale" | "slideUp";

const pages = [
  { id: 1, title: "Home", color: "from-blue-500 to-blue-600", content: "Welcome to the app" },
  { id: 2, title: "Products", color: "from-violet-500 to-violet-600", content: "Browse our products" },
  { id: 3, title: "About", color: "from-emerald-500 to-emerald-600", content: "Learn about us" },
];

const transitions: Record<TransitionType, { initial: object; animate: object; exit: object }> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
};

export function PageTransitionTypesDemo() {
  const [currentPage, setCurrentPage] = useState(0);
  const [transitionType, setTransitionType] = useState<TransitionType>("fade");
  const [showCode, setShowCode] = useState(false);

  const goToPage = (index: number) => {
    setCurrentPage(index);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
  };

  const page = pages[currentPage];
  const transition = transitions[transitionType];

  const cssCode = `/* Fade transition */
.page-fade-enter {
  opacity: 0;
}
.page-fade-enter-active {
  opacity: 1;
  transition: opacity 0.3s ease-out;
}
.page-fade-exit-active {
  opacity: 0;
  transition: opacity 0.2s ease-in;
}

/* Slide transition */
.page-slide-enter {
  opacity: 0;
  transform: translateX(100px);
}
.page-slide-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.page-slide-exit-active {
  opacity: 0;
  transform: translateX(-100px);
  transition: all 0.2s ease-in;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

const pageTransitions = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.1 },
  },
};

function PageWrapper({ children, transitionKey }) {
  const transition = pageTransitions.${transitionType};
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial={transition.initial}
        animate={transition.animate}
        exit={transition.exit}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        {children}
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
      title="Page Transition Types"
      description="Compare different transition styles. Each creates a different feel and suits different contexts."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Type">
            {(Object.keys(transitions) as TransitionType[]).map((type) => (
              <ControlButton
                key={type}
                active={transitionType === type}
                onClick={() => setTransitionType(type)}
              >
                {type}
              </ControlButton>
            ))}
          </ControlGroup>
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
        {/* Browser frame */}
        <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1">
              <div className="mx-auto max-w-xs rounded bg-neutral-200 px-3 py-1 text-center text-xs text-neutral-500 dark:bg-neutral-800">
                example.com/{page.title.toLowerCase()}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-2 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex gap-1">
              {pages.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => goToPage(i)}
                  className={cn(
                    "rounded px-3 py-1.5 text-xs font-medium transition-colors",
                    currentPage === i
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                  )}
                >
                  {p.title}
                </button>
              ))}
            </div>
            <div className="flex gap-1">
              <button
                onClick={prevPage}
                className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={nextPage}
                className="rounded p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Page content */}
          <div className="relative h-48 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={page.id}
                initial={transition.initial}
                animate={transition.animate}
                exit={transition.exit}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br text-white",
                  page.color
                )}
              >
                <h2 className="text-2xl font-bold">{page.title}</h2>
                <p className="mt-2 text-white/80">{page.content}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Transition explanations */}
        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { type: "fade", desc: "Subtle, universal. Good default choice." },
            { type: "slide", desc: "Shows direction. Good for navigation." },
            { type: "scale", desc: "Zoom effect. Good for modals/cards." },
            { type: "slideUp", desc: "Reveals from below. Good for new content." },
          ].map((item) => (
            <div
              key={item.type}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                transitionType === item.type
                  ? "border-swiss-red bg-swiss-red/5"
                  : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              <p className="text-xs font-semibold capitalize text-neutral-900 dark:text-white">
                {item.type}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
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

