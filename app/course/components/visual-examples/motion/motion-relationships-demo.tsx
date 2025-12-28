"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Settings, User, LogOut, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Origin = "center" | "top-left" | "button";

const menuItems = [
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
  { icon: LogOut, label: "Sign out" },
];

export function MotionRelationshipsDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [origin, setOrigin] = useState<Origin>("button");
  const [showCode, setShowCode] = useState(false);

  const getTransformOrigin = () => {
    switch (origin) {
      case "center":
        return "center center";
      case "top-left":
        return "top left";
      case "button":
        return "top center";
    }
  };

  const cssCode = `.dropdown {
  transform-origin: top center; /* Expands from trigger */
  animation: dropdownOpen 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes dropdownOpen {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Different origins create different relationships */
.dropdown--from-center {
  transform-origin: center center;
}

.dropdown--from-top-left {
  transform-origin: top left;
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        Menu
        <ChevronDown className={cn(
          "transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute top-full mt-2 w-48 rounded-lg 
              bg-white shadow-lg border"
          >
            {/* Menu items */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Motion Shows Relationships"
      description="The dropdown expands FROM its trigger, creating a clear spatial relationship."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <ControlGroup label="Transform Origin">
            {(["button", "center", "top-left"] as const).map((o) => (
              <ControlButton
                key={o}
                active={origin === o}
                onClick={() => setOrigin(o)}
              >
                {o === "button" ? "From Button" : o}
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
      <div className="space-y-8">
        {/* Interactive dropdown */}
        <div className="flex h-64 items-start justify-center rounded-lg bg-neutral-100 p-8 dark:bg-neutral-800">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-medium text-neutral-900 shadow-sm transition-colors",
                "hover:bg-neutral-50 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600",
                isOpen && "ring-2 ring-swiss-red/20"
              )}
            >
              <User className="size-4" />
              Account
              <ChevronDown
                className={cn(
                  "size-4 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-10"
                  />

                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: getTransformOrigin() }}
                    className="absolute left-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <div className="py-1">
                      {menuItems.map((item, index) => (
                        <motion.button
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setIsOpen(false)}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
                        >
                          <item.icon className="size-4 text-neutral-400" />
                          {item.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Origin explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div
            className={cn(
              "rounded-lg border p-4 transition-colors",
              origin === "button"
                ? "border-swiss-red bg-swiss-red/5"
                : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            )}
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              From Button
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Menu appears to grow from the button—shows a clear parent-child relationship
            </p>
          </div>
          <div
            className={cn(
              "rounded-lg border p-4 transition-colors",
              origin === "center"
                ? "border-swiss-red bg-swiss-red/5"
                : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            )}
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              From Centre
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Menu expands from its own centre—feels disconnected from the trigger
            </p>
          </div>
          <div
            className={cn(
              "rounded-lg border p-4 transition-colors",
              origin === "top-left"
                ? "border-swiss-red bg-swiss-red/5"
                : "border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900"
            )}
          >
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              From Top-Left
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              Menu grows from corner—might work for corner-positioned triggers
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>The principle:</strong> Motion should reveal relationships. When a 
            menu expands from its trigger, users intuitively understand where it came 
            from and how to dismiss it. This is why "From Button" feels most natural.
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

