"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { Menu, Search, User } from "iconoir-react";
import { ExampleWrapper, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ScrollLinkedHeaderDemo() {
  const [showCode, setShowCode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: containerRef,
  });

  const headerHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const fontSize = useTransform(scrollY, [0, 100], [24, 18]);
  const opacity = useTransform(scrollY, [0, 60], [0, 1]);
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.2]);

  const backgroundColor = useMotionTemplate`rgba(255, 255, 255, ${backgroundOpacity})`;
  const borderColor = useMotionTemplate`rgba(229, 231, 235, ${backgroundOpacity})`; // neutral-200

  const cssCode = `/* 
  While possible with CSS scroll-timeline,
  JavaScript offers smoother interpolation
  and broader browser support for complex
  morphing headers.
*/

.header {
  height: 80px;
  background: rgba(255, 255, 255, 0);
  transition: all 0.2s ease;
}

.header.scrolled {
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
}`;

  const motionCode = `import { motion, useScroll, useTransform } from "motion/react";

function StickyHeader() {
  const { scrollY } = useScroll();
  
  const height = useTransform(scrollY, [0, 100], [80, 60]);
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.9]);
  
  return (
    <motion.header
      style={{ 
        height, 
        backgroundColor: \`rgba(255, 255, 255, \${bgOpacity})\` 
      }}
      className="sticky top-0 z-50 flex items-center px-6 backdrop-blur-md"
    >
      <motion.h1 style={{ scale: useTransform(scrollY, [0, 100], [1, 0.8]) }}>
        Title
      </motion.h1>
    </motion.header>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Scroll-Linked Header"
      description="The header adapts its form based on the scroll position, maximizing screen real estate for content."
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
        <div className="relative h-[400px] overflow-hidden border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
          <div
            ref={containerRef}
            className="absolute inset-0 overflow-y-auto scroll-smooth"
          >
            {/* Sticky Header */}
            <motion.header
              style={{
                height: headerHeight,
                backgroundColor,
                borderBottomWidth: 1,
                borderBottomColor: borderColor,
              }}
              className="sticky top-0 z-20 flex items-center justify-between px-6 backdrop-blur-md"
            >
              <div className="flex items-center gap-4">
                <Menu className="size-5 text-neutral-500" />
                <motion.span
                  style={{ opacity }}
                  className="font-semibold text-neutral-900 dark:text-white"
                >
                  Dashboard
                </motion.span>
              </div>
              <div className="flex gap-4">
                <Search className="size-5 text-neutral-500" />
                <User className="size-5 text-neutral-500" />
              </div>
            </motion.header>

            {/* Content */}
            <div className="p-6 pt-2">
              <motion.h1
                style={{ fontSize }}
                className="mb-8 origin-left font-bold text-neutral-900 dark:text-white"
              >
                Dashboard
              </motion.h1>

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-32 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800"
                    >
                      <div className="h-8 w-8 rounded-lg bg-neutral-100 dark:bg-neutral-700" />
                      <div className="mt-4 h-4 w-20 rounded bg-neutral-100 dark:bg-neutral-700" />
                      <div className="mt-2 h-6 w-12 rounded bg-neutral-100 dark:bg-neutral-700" />
                    </div>
                  ))}
                </div>

                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm dark:bg-neutral-800"
                  >
                    <div className="h-10 w-10 rounded-full bg-neutral-100 dark:bg-neutral-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 rounded bg-neutral-100 dark:bg-neutral-700" />
                      <div className="h-3 w-1/2 rounded bg-neutral-50 dark:bg-neutral-700/50" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 text-xxs text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              i
            </span>
            Mapping Scroll to Style
          </h4>
          <p className="mt-2 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
            We map the first 100px of scroll to various properties: height
            shrinks from 80px to 60px, title size scales down, and background
            opacity increases. This creates a seamless transition from &ldquo;hero&rdquo;
            state to &ldquo;sticky&rdquo; state.
          </p>
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
