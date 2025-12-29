"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  MessageSquare,
  Mail,
  Calendar,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

type Notification = {
  id: string;
  title: string;
  message: string;
  type: "message" | "mail" | "event";
  time: string;
};

export function MotionAttentionDemo() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  const addNotification = (type: Notification["type"]) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      type,
      title:
        type === "message"
          ? "New Message"
          : type === "mail"
            ? "New Email"
            : "Upcoming Event",
      message:
        type === "message"
          ? "Sarah sent you a photo"
          : type === "mail"
            ? "Invoice #2024-001"
            : "Team Standup in 15m",
      time: "Just now",
    };

    setNotifications((prev) => [newNotification, ...prev].slice(0, 3));
    setUnreadCount((prev) => prev + 1);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const cssCode = `.badge {
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast {
  animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes popIn {
  from { transform: scale(0); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function NotificationSystem() {
  return (
    <>
      {/* Badge Animation */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -right-1 -top-1 size-5 rounded-full bg-red-500"
          >
            {count}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Stack */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <AnimatePresence initial={false} mode="popLayout">
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className="w-80 rounded-2xl bg-white p-4 shadow-lg"
            >
              {/* Content */}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Motion Guides Attention"
      description="Motion captures focus. Use it to signal important updates without being disruptive."
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
        <div className="relative flex h-[400px] flex-col overflow-hidden bg-neutral-50 dark:bg-neutral-900">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>

            <button
              ref={bellRef}
              onClick={clearAll}
              className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              <Bell className="size-5" />
              <AnimatePresence>
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-neutral-900"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Main Area */}
          <div className="flex-1 p-6">
            <div className="mx-auto max-w-md space-y-4 text-center">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Trigger Notification
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Click a button below to simulate an incoming notification. Watch
                how motion guides your eye.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4">
                <button
                  onClick={() => addNotification("message")}
                  className="group flex flex-col items-center gap-3 rounded-[20px] bg-neutral-800 p-5 ring-1 ring-neutral-700/50 transition-all hover:bg-neutral-750 hover:ring-neutral-600 active:scale-[0.98] dark:bg-neutral-800 dark:ring-neutral-700/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 ring-1 ring-indigo-500/30 transition-colors group-hover:bg-indigo-500/25">
                    <MessageSquare className="size-5 text-indigo-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">
                    Message
                  </span>
                </button>

                <button
                  onClick={() => addNotification("mail")}
                  className="group flex flex-col items-center gap-3 rounded-[20px] bg-neutral-800 p-5 ring-1 ring-neutral-700/50 transition-all hover:bg-neutral-750 hover:ring-neutral-600 active:scale-[0.98] dark:bg-neutral-800 dark:ring-neutral-700/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 ring-1 ring-blue-500/30 transition-colors group-hover:bg-blue-500/25">
                    <Mail className="size-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">
                    Email
                  </span>
                </button>

                <button
                  onClick={() => addNotification("event")}
                  className="group flex flex-col items-center gap-3 rounded-[20px] bg-neutral-800 p-5 ring-1 ring-neutral-700/50 transition-all hover:bg-neutral-750 hover:ring-neutral-600 active:scale-[0.98] dark:bg-neutral-800 dark:ring-neutral-700/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 ring-1 ring-amber-500/30 transition-colors group-hover:bg-amber-500/25">
                    <Calendar className="size-5 text-amber-400" />
                  </div>
                  <span className="text-sm font-medium text-neutral-300">
                    Event
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Toast Container */}
          <div className="pointer-events-none absolute right-6 bottom-6 flex w-80 flex-col gap-2">
            <AnimatePresence initial={false} mode="popLayout">
              {notifications.map((n) => (
                <motion.div
                  key={n.id}
                  layout
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 300 }}
                  onDragEnd={(e, { offset, velocity }) => {
                    if (offset.x > 100 || velocity.x > 500) {
                      removeNotification(n.id);
                    }
                  }}
                  className="pointer-events-auto relative overflow-hidden rounded-[24px] border border-neutral-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/90"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                        n.type === "message"
                          ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                          : n.type === "mail"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
                      )}
                    >
                      {n.type === "message" ? (
                        <MessageSquare className="size-4" />
                      ) : n.type === "mail" ? (
                        <Mail className="size-4" />
                      ) : (
                        <Calendar className="size-4" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-neutral-400">
                          {n.time}
                        </span>
                      </div>
                      <p className="line-clamp-1 text-xs text-neutral-500 dark:text-neutral-400">
                        {n.message}
                      </p>
                    </div>
                    <button
                      onClick={() => removeNotification(n.id)}
                      className="-mt-1 -mr-1 ml-1 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Visual Explanation */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <CheckCircle2 className="size-4 text-emerald-500" />
              Non-Blocking
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              The notifications appear in the periphery (bottom-right) and don't
              block the main content area. This respects user flow.
            </p>
          </div>
          <div className="rounded-[12px] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
              <AlertCircle className="size-4 text-indigo-500" />
              Natural Entry
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              They slide in from the nearest edge (right), which feels physical
              and predictable. No teleporting elements.
            </p>
          </div>
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
