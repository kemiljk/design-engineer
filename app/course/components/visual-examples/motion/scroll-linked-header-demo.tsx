"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { Menu, Search, Bell, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

export function ScrollLinkedHeaderDemo() {
  const [showCode, setShowCode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    container: containerRef,
  });

  // Transform values based on scroll position
  const headerHeight = useTransform(scrollY, [0, 100], [80, 56]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Track if scrolled for conditional rendering
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const cssCode = `/* Scroll-driven header with CSS */
.header {
  position: sticky;
  top: 0;
  height: 80px;
  background: transparent;
  backdrop-filter: blur(0);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease-out;
}

.header.scrolled {
  height: 56px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom-color: rgba(0, 0, 0, 0.1);
}

.header .logo {
  transform: scale(1);
  transition: transform 0.3s ease-out;
}

.header.scrolled .logo {
  transform: scale(0.85);
}

/* Detect scroll with JS and toggle class */
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});`;

  const motionCode = `import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useState, useRef } from "react";

function ScrollHeader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollY } = useScroll({
    container: containerRef,
  });

  // Continuous transforms
  const headerHeight = useTransform(scrollY, [0, 100], [80, 56]);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.85]);
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1]);

  // Track scroll state for conditional styles
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <div ref={containerRef} className="h-screen overflow-y-auto">
      <motion.header
        style={{ 
          height: headerHeight,
          backgroundColor: \`rgba(255, 255, 255, \${bgOpacity.get()})\`,
        }}
        className={cn(
          "sticky top-0 z-50 transition-shadow",
          isScrolled && "shadow-sm backdrop-blur-md"
        )}
      >
        <motion.div style={{ scale: logoScale }}>
          <Logo />
        </motion.div>
        {/* Nav items */}
      </motion.header>
      
      {/* Content */}
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Scroll-Linked Header"
      description="Header shrinks, adds blur, and shows border as you scroll down."
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
        {/* Demo container */}
        <div
          ref={containerRef}
          className="relative h-80 overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800"
        >
          {/* Header */}
          <motion.header
            style={{ height: headerHeight }}
            className={cn(
              "sticky top-0 z-10 flex items-center justify-between px-4 transition-all",
              isScrolled
                ? "bg-white/90 shadow-sm backdrop-blur-md dark:bg-neutral-900/90"
                : "bg-transparent"
            )}
          >
            <motion.div
              style={{ borderBottomWidth: borderOpacity.get() }}
              className="absolute inset-x-0 bottom-0 border-neutral-200 dark:border-neutral-700"
            />

            <div className="flex items-center gap-3">
              <button className="rounded p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                <Menu className="size-5" />
              </button>
              <motion.div
                style={{ scale: logoScale }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-swiss-red font-bold text-white">
                  d
                </div>
                <span
                  className={cn(
                    "font-bold text-neutral-900 transition-opacity dark:text-white",
                    isScrolled ? "opacity-0" : "opacity-100"
                  )}
                >
                  design×engineer
                </span>
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                <Search className="size-5" />
              </button>
              <button className="rounded p-1.5 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                <Bell className="size-5" />
              </button>
              <button className="rounded-full p-1 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
                <User className="size-5" />
              </button>
            </div>
          </motion.header>

          {/* Content */}
          <div className="bg-neutral-50 p-6 dark:bg-neutral-900">
            <div className="mx-auto max-w-lg space-y-4">
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Welcome to the Platform
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Scroll down to see the header transform. Notice how it:
              </p>
              <ul className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <li>• Shrinks from 80px to 56px</li>
                <li>• Adds a frosted glass backdrop blur</li>
                <li>• Shows a subtle border at the bottom</li>
                <li>• Hides the full logo text</li>
                <li>• Reduces logo scale to 85%</li>
              </ul>
              <div className="h-96 rounded-lg border border-dashed border-neutral-300 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
                <p className="text-sm text-neutral-500">
                  Content area - keep scrolling...
                </p>
              </div>
              <div className="h-48 rounded-lg border border-dashed border-neutral-300 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800">
                <p className="text-sm text-neutral-500">More content...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transformation breakdown */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Height", from: "80px", to: "56px" },
            { label: "Logo Scale", from: "100%", to: "85%" },
            { label: "Background", from: "transparent", to: "blur(12px)" },
            { label: "Border", from: "hidden", to: "visible" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="text-xs font-semibold text-neutral-900 dark:text-white">
                {item.label}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="text-neutral-500">{item.from}</span>
                <span className="text-neutral-400">→</span>
                <span className="text-swiss-red">{item.to}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Why it works:</strong> A compact header gives more screen real estate 
            for content while keeping navigation accessible. The blur effect maintains 
            legibility when content scrolls behind. These micro-animations feel polished 
            without demanding attention.
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

