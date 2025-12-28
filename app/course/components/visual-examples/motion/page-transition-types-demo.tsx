"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Smartphone, Settings, User, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type TransitionType = "push" | "modal" | "fade";

export function PageTransitionTypesDemo() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [type, setType] = useState<TransitionType>("push");
  const [showCode, setShowCode] = useState(false);

  const pages = [
    { id: 0, title: "Home", color: "bg-white dark:bg-neutral-900", icon: Home },
    { id: 1, title: "Profile", color: "bg-neutral-50 dark:bg-neutral-800", icon: User },
    { id: 2, title: "Settings", color: "bg-neutral-100 dark:bg-neutral-900", icon: Settings },
  ];

  const next = () => setCurrentPage((prev) => (prev + 1) % pages.length);
  const prev = () => setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);

  const getVariants = () => {
    switch (type) {
      case "push":
        return {
          initial: { x: "100%", opacity: 1 },
          animate: { x: 0, opacity: 1 },
          exit: { x: "-20%", opacity: 0.5 }, // iOS style parallax
        };
      case "modal":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
      case "fade":
        return {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.05 },
        };
    }
  };

  const cssCode = `.page-enter {
  transform: translateX(100%);
}

.page-enter-active {
  transform: translateX(0);
  transition: transform 300ms;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

const variants = {
  push: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "-25%" }
  },
  modal: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" }
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
};

function App() {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants[type]}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        className="page"
      >
        <Component />
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
      title="Page Transition Patterns"
      description="Different transitions communicate different spatial models to the user."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Transition Type">
            {(["push", "modal", "fade"] as const).map((t) => (
              <ControlButton
                key={t}
                active={type === t}
                onClick={() => {
                  setType(t);
                  setCurrentPage(0);
                }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </ControlButton>
            ))}
          </ControlGroup>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-12">
        {/* Interactive Demo */}
        <div className="flex justify-center">
          <div className="relative h-[500px] w-[280px] overflow-hidden rounded-[32px] border-[8px] border-neutral-900 bg-black shadow-2xl dark:border-neutral-700">
            {/* Status Bar */}
            <div className="absolute left-0 right-0 top-0 z-20 flex justify-between px-6 py-3 text-[10px] font-bold text-neutral-900 dark:text-white">
              <span>9:41</span>
              <div className="flex gap-1">
                <div className="h-2.5 w-2.5 rounded-full bg-current opacity-20" />
                <div className="h-2.5 w-2.5 rounded-full bg-current opacity-20" />
                <div className="h-2.5 w-2.5 rounded-full bg-current" />
              </div>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={currentPage}
                variants={getVariants()}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                className={cn(
                  "absolute inset-0 flex flex-col pt-12",
                  pages[currentPage].color
                )}
              >
                <div className="flex-1 px-6">
                  <h2 className="mb-2 text-2xl font-bold text-neutral-900 dark:text-white">
                    {pages[currentPage].title}
                  </h2>
                  <div className="space-y-3">
                    <div className="h-4 w-2/3 rounded-[4px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                    <div className="h-4 w-full rounded-[4px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                    <div className="h-4 w-5/6 rounded-[4px] bg-neutral-200/50 dark:bg-neutral-800/50" />
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    <div className="aspect-square rounded-[16px] bg-neutral-100 dark:bg-neutral-800" />
                    <div className="aspect-square rounded-[16px] bg-neutral-100 dark:bg-neutral-800" />
                  </div>
                </div>

                {/* Simulated Tab Bar */}
                <div className="mt-auto flex justify-around border-t border-neutral-200 bg-white py-4 dark:border-neutral-800 dark:bg-neutral-900">
                  {pages.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setCurrentPage(i)}
                      className={cn(
                        "flex flex-col items-center gap-1 transition-colors",
                        currentPage === i ? "text-indigo-600 dark:text-indigo-400" : "text-neutral-400"
                      )}
                    >
                      <p.icon className="size-5" />
                      <span className="text-[10px] font-medium">{p.title}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dynamic Island Notch */}
            <div className="absolute left-1/2 top-2 z-30 h-6 w-20 -translate-x-1/2 rounded-full bg-black" />
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { 
              mode: "push", 
              label: "Push", 
              desc: "Standard iOS navigation. Implies moving deeper into a hierarchy (x-axis)."
            },
            { 
              mode: "modal", 
              label: "Modal", 
              desc: "Temporary context. Implies layering on top of current view (y-axis)."
            },
            { 
              mode: "fade", 
              label: "Fade", 
              desc: "State change. Implies changing content within the same container."
            }
          ].map((item) => (
            <div 
              key={item.mode}
              className={cn(
                "rounded-[12px] border p-4 transition-colors",
                type === item.mode
                  ? "border-neutral-900 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"
                  : "border-transparent bg-white dark:bg-neutral-900"
              )}
            >
              <h4 className="mb-1 text-sm font-semibold text-neutral-900 dark:text-white">
                {item.label}
              </h4>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
          ))}
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
