"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { NavArrowRight as ChevronRight, Settings, User, LogOut, HelpCircle, Bell, Plus } from "iconoir-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Origin = "center" | "top-left" | "trigger";

const menuItems = [
  { icon: User, label: "Profile", shortcut: "P" },
  { icon: Bell, label: "Notifications", shortcut: "N", badge: 2 },
  { icon: Settings, label: "Settings", shortcut: "S" },
  { icon: HelpCircle, label: "Support", shortcut: "?" },
];

export function MotionRelationshipsDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState<Origin>("trigger");
  const [showCode, setShowCode] = useState(false);

  const cssCode = `.menu {
  transform-origin: var(--origin);
  animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function ContextMenu({ isOpen, origin }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            transformOrigin: origin === "trigger" ? "top left" : "center" 
          }}
          className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-white/80 p-1 shadow-xl backdrop-blur-xl"
        >
          {/* Menu items */}
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
      title="Motion Shows Relationships"
      description="The origin of an animation tells the user where a new element belongs in the hierarchy."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Transform Origin">
            {(["trigger", "center", "top-left"] as const).map((o) => (
              <ControlButton
                key={o}
                active={origin === o}
                onClick={() => {
                  setOrigin(o);
                  setIsOpen(false);
                  setTimeout(() => setIsOpen(true), 150);
                }}
              >
                {o === "trigger" ? "From Trigger" : o === "top-left" ? "Top Left" : "Center"}
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
        <div className="flex h-80 items-start justify-center bg-neutral-100 pt-6 dark:bg-neutral-900/50">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center gap-2 rounded-[12px] bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition-all hover:bg-neutral-50 active:scale-95 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700",
                isOpen && "ring-2 ring-indigo-500/20 dark:ring-indigo-500/40"
              )}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-[8px] bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] font-bold text-white">
                K
              </div>
              <span>Karl's Workspace</span>
              <ChevronRight className={cn("ml-2 size-4 text-neutral-400 transition-transform", isOpen && "rotate-90")} />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setIsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: origin === "trigger" ? 4 : 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: origin === "trigger" ? 4 : 0 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      transformOrigin: origin === "trigger" ? "top left" : origin === "top-left" ? "0 0" : "center",
                    }}
                    className="absolute left-0 top-full z-20 mt-2 min-w-[240px] overflow-hidden rounded-[24px] border border-neutral-200 bg-white/80 p-1.5 shadow-xl backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-900/80"
                  >
                    <div className="mb-1.5 flex items-center gap-2 px-2 py-1.5 text-xs text-neutral-500">
                      <span>karl@designengineer.com</span>
                      <span className="rounded-[6px] bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Pro</span>
                    </div>
                    
                    <div className="h-px bg-neutral-100 dark:bg-neutral-800" />
                    
                    <div className="py-1">
                      {menuItems.map((item, i) => (
                        <button
                          key={item.label}
                          className="flex w-full items-center justify-between rounded-[12px] px-2 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-indigo-50 hover:text-indigo-900 dark:text-neutral-300 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-100"
                        >
                          <div className="flex items-center gap-2.5">
                            <item.icon className="size-4 opacity-70" />
                            <span>{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.badge && (
                              <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                                {item.badge}
                              </span>
                            )}
                            <span className="text-xs text-neutral-400 opacity-60">⌘{item.shortcut}</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

                    <div className="py-1">
                      <button className="flex w-full items-center justify-between rounded-[12px] px-2 py-1.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-800">
                        <div className="flex items-center gap-2.5">
                          <Plus className="size-4 opacity-70" />
                          <span>New Team</span>
                        </div>
                      </button>
                      <button className="flex w-full items-center justify-between rounded-[12px] px-2 py-1.5 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20">
                        <div className="flex items-center gap-2.5">
                          <LogOut className="size-4 opacity-70" />
                          <span>Log Out</span>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { 
              mode: "trigger", 
              label: "From Trigger", 
              desc: "Feels connected. The menu physically grows from the button that spawned it.",
              correct: true
            },
            { 
              mode: "center", 
              label: "From Center", 
              desc: "Feels disconnected. Like a modal or alert that interrupts flow.",
              correct: false
            },
            { 
              mode: "top-left", 
              label: "From Top-Left", 
              desc: "Feels mechanical. Uses the browser's default coordinate system (0,0).",
              correct: false
            }
          ].map((item) => (
            <div 
              key={item.mode}
              className={cn(
                "rounded-[12px] border p-4 transition-colors",
                origin === item.mode
                  ? "border-neutral-900 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800"
                  : "border-transparent bg-white dark:bg-neutral-900"
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  item.correct ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-600"
                )} />
                <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                  {item.label}
                </span>
              </div>
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
