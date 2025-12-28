"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, X, MessageSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

interface Toast {
  id: number;
  title: string;
  icon: React.ElementType;
  color: string;
}

let toastId = 0;

export function MotionAttentionDemo() {
  const [count, setCount] = useState(3);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showCode, setShowCode] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  const addNotification = () => {
    setCount((prev) => prev + 1);
  };

  const addToast = () => {
    const icons = [MessageSquare, Heart, User];
    const titles = ["New message received", "Someone liked your post", "New follower"];
    const colors = ["bg-blue-500", "bg-rose-500", "bg-violet-500"];
    const index = toastId % 3;

    const newToast: Toast = {
      id: toastId++,
      title: titles[index],
      icon: icons[index],
      color: colors[index],
    };

    setToasts((prev) => [...prev.slice(-2), newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const cssCode = `/* Badge pulse animation */
.badge {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Toast slide-in */
.toast {
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Toast exit */
.toast-exit {
  animation: slideOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes slideOut {
  to {
    opacity: 0;
    transform: translateX(100%);
  }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

// Notification badge with pulse
function NotificationBell({ count }: { count: number }) {
  return (
    <button className="relative">
      <Bell className="size-6" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 flex h-5 w-5 
            items-center justify-center rounded-full 
            bg-swiss-red text-xs text-white"
        >
          {count}
          {/* Pulse ring */}
          <motion.span
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeOut" 
            }}
            className="absolute inset-0 rounded-full bg-swiss-red"
          />
        </motion.span>
      )}
    </button>
  );
}

// Toast notifications
function Toasts({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 25 }}
            className="rounded-lg bg-white p-4 shadow-lg"
          >
            {toast.title}
          </motion.div>
        ))}
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
      title="Motion Guides Attention"
      description="Animation directs focus to new content without being disruptive."
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
      <div className="space-y-8">
        {/* Demo area */}
        <div className="relative flex h-64 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
          {/* Bell with badge */}
          <div className="flex flex-col items-center gap-4">
            <button
              ref={bellRef}
              onClick={addNotification}
              className="relative rounded-full bg-white p-4 shadow-md transition-transform hover:scale-105 active:scale-95 dark:bg-neutral-700"
            >
              <Bell className="size-6 text-neutral-700 dark:text-neutral-300" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-swiss-red px-1 text-xs font-bold text-white"
                  >
                    {count > 99 ? "99+" : count}
                    {/* Pulse ring */}
                    <motion.span
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0.4, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full bg-swiss-red"
                    />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <div className="flex gap-2">
              <button
                onClick={addNotification}
                className="rounded bg-swiss-red px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-swiss-red/90"
              >
                Add Badge +1
              </button>
              <button
                onClick={() => setCount(0)}
                className="rounded bg-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-600 dark:text-neutral-300"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Toast trigger */}
          <div className="absolute bottom-4 left-4">
            <button
              onClick={addToast}
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
            >
              <MessageSquare className="size-4" />
              Trigger Toast
            </button>
          </div>

          {/* Toast container */}
          <div className="absolute bottom-4 right-4 space-y-2">
            <AnimatePresence>
              {toasts.map((toast) => (
                <motion.div
                  key={toast.id}
                  initial={{ opacity: 0, x: 100, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 100, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full",
                      toast.color
                    )}
                  >
                    <toast.icon className="size-4 text-white" />
                  </div>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">
                    {toast.title}
                  </p>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="ml-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                  >
                    <X className="size-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Badge Animation
            </p>
            <ul className="mt-2 space-y-1 text-xs text-neutral-500">
              <li>• Scale in when count goes from 0 to 1</li>
              <li>• Subtle pulse ring draws peripheral attention</li>
              <li>• Spring physics makes appearance feel natural</li>
            </ul>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Toast Animation
            </p>
            <ul className="mt-2 space-y-1 text-xs text-neutral-500">
              <li>• Slides in from right (non-intrusive position)</li>
              <li>• Spring transition feels physical</li>
              <li>• Stacks elegantly without pushing content</li>
            </ul>
          </div>
        </div>

        {/* Key insight */}
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/20">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>The balance:</strong> Motion should attract attention without demanding it. 
            The pulse is subtle enough to notice in peripheral vision without distracting 
            from the current task. Toasts slide in from the edge, announcing themselves 
            without blocking content.
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

