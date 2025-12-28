"use client";

import React, { useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { LayoutGrid, List, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Layout = "grid" | "list" | "featured";

const items = [
  { id: "a", title: "Design", color: "from-blue-500 to-blue-600", emoji: "🎨" },
  { id: "b", title: "Code", color: "from-violet-500 to-violet-600", emoji: "💻" },
  { id: "c", title: "Motion", color: "from-emerald-500 to-emerald-600", emoji: "✨" },
  { id: "d", title: "Ship", color: "from-amber-500 to-amber-600", emoji: "🚀" },
];

export function LayoutAnimationDemo() {
  const [layout, setLayout] = useState<Layout>("grid");
  const [order, setOrder] = useState(items);
  const [showCode, setShowCode] = useState(false);

  const shuffleItems = () => {
    setOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const motionCode = `import { motion, LayoutGroup } from "motion/react";

function LayoutDemo() {
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [items, setItems] = useState([...]);

  return (
    <LayoutGroup>
      <div className={cn(
        layout === "grid" 
          ? "grid grid-cols-2 gap-4" 
          : "flex flex-col gap-2"
      )}>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layoutId={item.id}
            layout
            transition={{
              layout: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            }}
            className={cn(
              "rounded-xl",
              layout === "grid" ? "h-32" : "h-16"
            )}
          >
            {item.title}
          </motion.div>
        ))}
      </div>
    </LayoutGroup>
  );
}

// Key concepts:
// 1. layout prop animates size/position changes
// 2. layoutId enables shared element transitions
// 3. LayoutGroup coordinates related elements
// 4. Spring transitions feel more natural`;

  const codeTabs: CodeTab[] = [
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Layout Animation"
      description="Elements smoothly animate between layouts. Try switching views and shuffling."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <ControlGroup label="Layout">
              <ControlButton active={layout === "grid"} onClick={() => setLayout("grid")}>
                <LayoutGrid className="mr-1 size-3.5" />
                Grid
              </ControlButton>
              <ControlButton active={layout === "list"} onClick={() => setLayout("list")}>
                <List className="mr-1 size-3.5" />
                List
              </ControlButton>
              <ControlButton active={layout === "featured"} onClick={() => setLayout("featured")}>
                Featured
              </ControlButton>
            </ControlGroup>
            <button
              onClick={shuffleItems}
              className="flex items-center gap-1.5 rounded-md bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
            >
              <Shuffle className="size-3.5" />
              Shuffle
            </button>
          </div>
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
        {/* Layout demo */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <LayoutGroup>
            <div
              className={cn(
                "transition-[grid-template-columns]",
                layout === "grid" && "grid grid-cols-2 gap-4",
                layout === "list" && "flex flex-col gap-3",
                layout === "featured" && "grid grid-cols-2 gap-4"
              )}
            >
              {order.map((item, index) => (
                <motion.div
                  key={item.id}
                  layoutId={item.id}
                  layout
                  transition={{
                    layout: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  className={cn(
                    "flex items-center overflow-hidden rounded-xl bg-gradient-to-br shadow-md",
                    item.color,
                    layout === "grid" && "h-28 justify-center",
                    layout === "list" && "h-14 px-4",
                    layout === "featured" && (index === 0 ? "col-span-2 h-40 justify-center" : "h-24 justify-center")
                  )}
                >
                  <motion.div
                    layout="position"
                    className={cn(
                      "flex items-center gap-3",
                      layout === "grid" && "flex-col",
                      layout === "list" && "flex-row",
                      layout === "featured" && (index === 0 ? "flex-col" : "flex-col")
                    )}
                  >
                    <span
                      className={cn(
                        layout === "grid" && "text-3xl",
                        layout === "list" && "text-xl",
                        layout === "featured" && (index === 0 ? "text-5xl" : "text-2xl")
                      )}
                    >
                      {item.emoji}
                    </span>
                    <span
                      className={cn(
                        "font-bold text-white",
                        layout === "grid" && "text-lg",
                        layout === "list" && "text-base",
                        layout === "featured" && (index === 0 ? "text-2xl" : "text-sm")
                      )}
                    >
                      {item.title}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        </div>

        {/* Layout types */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { layout: "grid", desc: "2x2 grid with equal sized cards" },
            { layout: "list", desc: "Vertical list, compact rows" },
            { layout: "featured", desc: "First item spans full width" },
          ].map((item) => (
            <div
              key={item.layout}
              className={cn(
                "rounded-lg border p-3 transition-colors",
                layout === item.layout
                  ? "border-swiss-red bg-swiss-red/5"
                  : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
              )}
            >
              <p className="text-xs font-semibold capitalize text-neutral-900 dark:text-white">
                {item.layout}
              </p>
              <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>FLIP technique:</strong> Motion uses First-Last-Invert-Play (FLIP) under 
            the hood. It measures the element's position before and after the layout change, 
            then animates the difference. This means you just change the CSS—Motion handles 
            the animation automatically.
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

