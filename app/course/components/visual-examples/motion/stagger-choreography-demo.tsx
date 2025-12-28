"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { RotateCcw, Mail, MessageSquare, Calendar, Bell, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton, SliderControl } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Direction = "forward" | "reverse" | "center";

const items = [
  { id: 1, title: "New Message", sub: "Sarah sent you a photo", time: "2m", icon: MessageSquare, color: "bg-indigo-500" },
  { id: 2, title: "Meeting Reminder", sub: "Team Standup in 15m", time: "15m", icon: Calendar, color: "bg-emerald-500" },
  { id: 3, title: "Email Received", sub: "Project Update: Q4 Goals", time: "1h", icon: Mail, color: "bg-blue-500" },
  { id: 4, title: "System Alert", sub: "Backup completed successfully", time: "2h", icon: CheckCircle2, color: "bg-amber-500" },
  { id: 5, title: "New Follower", sub: "Alex started following you", time: "3h", icon: Bell, color: "bg-rose-500" },
];

export function StaggerChoreographyDemo() {
  const [staggerDelay, setStaggerDelay] = useState(80);
  const [direction, setDirection] = useState<Direction>("forward");
  const [showCode, setShowCode] = useState(false);
  const [key, setKey] = useState(0);

  const calculateDelay = (index: number) => {
    switch (direction) {
      case "forward":
        return index * staggerDelay;
      case "reverse":
        return (items.length - 1 - index) * staggerDelay;
      case "center":
        const center = (items.length - 1) / 2;
        return Math.abs(index - center) * staggerDelay;
    }
  };

  const replay = () => setKey(k => k + 1);

  const cssCode = `.item:nth-child(1) { animation-delay: ${calculateDelay(0)}ms; }
.item:nth-child(2) { animation-delay: ${calculateDelay(1)}ms; }
.item:nth-child(3) { animation-delay: ${calculateDelay(2)}ms; }

/* 
  Manually calculating delays in CSS is tedious 
  and hard to maintain if the list length changes.
*/`;

  const motionCode = `import { motion } from "motion/react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // For complex staggering (like center out),
      // we often calculate delays manually per item
      // or use a custom variant function.
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: (customDelay) => ({
    opacity: 1,
    y: 0,
    transition: { delay: customDelay }
  })
};

<motion.ul 
  variants={container} 
  initial="hidden" 
  animate="visible"
>
  {items.map((i, index) => (
    <motion.li 
      key={i.id} 
      custom={calculateDelay(index) / 1000} 
      variants={item} 
    />
  ))}
</motion.ul>`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Stagger Choreography"
      description="Coordinate multiple elements with staggered delays for elegant list animations."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <SliderControl
              label="Stagger"
              value={staggerDelay}
              min={20}
              max={200}
              step={10}
              onChange={setStaggerDelay}
              unit="ms"
            />
            <ControlGroup label="Direction">
              {(["forward", "reverse", "center"] as const).map((dir) => (
                <ControlButton key={dir} active={direction === dir} onClick={() => setDirection(dir)}>
                  {dir.charAt(0).toUpperCase() + dir.slice(1)}
                </ControlButton>
              ))}
            </ControlGroup>
          </div>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Interactive List */}
        <div className="relative min-h-[400px] overflow-hidden border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">Notifications</h4>
            <button
              onClick={replay}
              className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              <RotateCcw className="size-3" />
              Replay
            </button>
          </div>
          
          <motion.ul
            key={key}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 }
            }}
            className="space-y-3"
          >
            {items.map((item, index) => {
              const delay = calculateDelay(index) / 1000;
              
              return (
                <motion.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { 
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                        delay: delay 
                      }
                    }
                  }}
                  className="flex items-center gap-4 rounded-[24px] bg-white p-3 shadow-sm ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/5"
                >
                  <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-white shadow-sm", item.color)}>
                    <item.icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h5 className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{item.title}</h5>
                    <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{item.sub}</p>
                  </div>
                  <span className="text-xs font-medium text-neutral-400">{item.time}</span>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Timeline Visualizer */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[32px] border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">Timeline</h4>
            <div className="space-y-4">
              {items.map((item, index) => {
                const delay = calculateDelay(index);
                const maxDelay = Math.max(...items.map((_, i) => calculateDelay(i)));
                const widthPercent = (delay / (maxDelay + 200)) * 100; // +200 for buffer
                
                return (
                  <div key={item.id} className="group flex items-center gap-3">
                    <span className="w-6 text-xs font-medium text-neutral-400">#{index + 1}</span>
                    <div className="relative flex-1">
                      {/* Grid line */}
                      <div className="absolute inset-0 flex items-center">
                        <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800" />
                      </div>
                      
                      {/* Delay bar */}
                      <div 
                        className="relative h-2 rounded-full bg-neutral-200 dark:bg-neutral-800"
                        style={{ width: `${widthPercent}%` }}
                      />
                      
                      {/* Active block */}
                      <motion.div
                        key={key}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: delay / 1000, duration: 0.1 }}
                        className={cn("absolute top-1/2 h-4 w-12 -translate-y-1/2 rounded-full shadow-sm", item.color)}
                        style={{ left: `${widthPercent}%` }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono text-xs text-neutral-500">
                      {delay}ms
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="rounded-[24px] bg-neutral-100 p-4 text-xs leading-relaxed text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            <span className="font-semibold text-neutral-900 dark:text-white">Pro Tip:</span> Stagger delays should be short (30-100ms). Too long and the animation feels sluggish; too short and it looks like a single block moving.
          </div>
        </div>
      </div>

      {showCode && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-8">
          <CodePanel tabs={codeTabs} />
        </motion.div>
      )}
    </ExampleWrapper>
  );
}
