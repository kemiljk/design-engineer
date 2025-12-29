"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ExampleWrapper,
  ControlGroup,
  ControlButton,
  SliderControl,
} from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

const notificationTexts = [
  "New message from Sarah",
  "Meeting in 15 minutes",
  "Your order shipped!",
  "2 new followers",
];

export function NotificationBellDemo() {
  const [showCode, setShowCode] = useState(false);
  const [particleCount, setParticleCount] = useState(12);
  const [rippleCount, setRippleCount] = useState(3);
  const [showStack, setShowStack] = useState(true);

  // Animation state
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState<number[]>([]);
  const [particles, setParticles] = useState<
    { id: number; angle: number; distance: number }[]
  >([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState<
    { id: number; text: string }[]
  >([]);

  const triggerNotification = useCallback(() => {
    if (isActive) return;

    setIsActive(true);

    // Add ripples
    const rippleIds = Array.from(
      { length: rippleCount },
      (_, i) => Date.now() + i
    );
    setRipples(rippleIds);

    // Add particles
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      angle: (i / particleCount) * 360,
      distance: 40 + Math.random() * 20,
    }));
    setParticles(newParticles);

    // Increment count and add notification
    setNotificationCount((c) => Math.min(c + 1, 9));
    if (showStack) {
      setNotifications((n) => [
        {
          id: Date.now(),
          text: notificationTexts[n.length % notificationTexts.length],
        },
        ...n.slice(0, 2),
      ]);
    }

    // Clean up after animation
    setTimeout(() => {
      setIsActive(false);
      setRipples([]);
      setParticles([]);
    }, 600);
  }, [isActive, particleCount, rippleCount, showStack]);

  const reset = useCallback(() => {
    setIsActive(false);
    setRipples([]);
    setParticles([]);
    setNotificationCount(0);
    setNotifications([]);
  }, []);

  const cssCode = `/* CSS alone can't achieve this level of coordination.
   You'd need multiple @keyframes and careful timing: */

@keyframes bellShake {
  0%, 100% { transform: rotate(0); }
  15% { transform: rotate(-15deg); }
  30% { transform: rotate(15deg); }
  45% { transform: rotate(-10deg); }
  60% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
  90% { transform: rotate(5deg); }
}

@keyframes rippleExpand {
  from { 
    width: 60px; height: 60px; 
    opacity: 0.8; 
  }
  to { 
    width: 140px; height: 140px; 
    opacity: 0; 
  }
}

@keyframes particleBurst {
  from { transform: scale(0); opacity: 1; }
  to { transform: scale(1.2) translate(var(--x), var(--y)); opacity: 0; }
}

/* Each particle needs custom properties for direction */
.particle:nth-child(1) { --x: 40px; --y: 0; }
.particle:nth-child(2) { --x: 28px; --y: 28px; }
/* ...and so on for each particle */`;

  const motionCode = `import { motion, AnimatePresence } from "motion/react";

function NotificationBell() {
  const [isActive, setIsActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [particles, setParticles] = useState([]);

  const trigger = () => {
    setIsActive(true);
    
    // Create ripples with staggered IDs
    setRipples([Date.now(), Date.now() + 1, Date.now() + 2]);
    
    // Create particles with calculated angles
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i / 12) * 360,
        distance: 40 + Math.random() * 20,
      }))
    );

    setTimeout(() => {
      setIsActive(false);
      setRipples([]);
      setParticles([]);
    }, 600);
  };

  return (
    <div className="relative">
      {/* Ripple rings */}
      <AnimatePresence>
        {ripples.map((id, i) => (
          <motion.div
            key={id}
            className="absolute rounded-full border-2"
            initial={{ width: 60, height: 60, opacity: 0.8 }}
            animate={{ width: 140, height: 140, opacity: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}
      </AnimatePresence>

      {/* Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0 }}
            animate={{
              x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
              y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 0.6 }}
          />
        ))}
      </AnimatePresence>

      {/* Bell with shake animation */}
      <motion.button
        onClick={trigger}
        animate={isActive ? {
          rotate: [0, -15, 15, -10, 10, -5, 5, 0],
          scale: [1, 1.1, 1],
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <Bell />
      </motion.button>
    </div>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Layered Notification Animation"
      description="Coordinate multiple animated layers—ripples, particles, badges, and stacked cards—into a cohesive, attention-grabbing notification experience."
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-6">
            <SliderControl
              label="Particles"
              value={particleCount}
              min={4}
              max={20}
              step={2}
              onChange={setParticleCount}
            />
            <SliderControl
              label="Ripples"
              value={rippleCount}
              min={1}
              max={5}
              step={1}
              onChange={setRippleCount}
            />
            <ControlGroup label="Stack">
              <ControlButton
                active={showStack}
                onClick={() => setShowStack(!showStack)}
              >
                {showStack ? "On" : "Off"}
              </ControlButton>
            </ControlGroup>
          </div>
          <ControlButton
            active={showCode}
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Main Interactive Demo */}
        <div className="relative min-h-[400px] overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-br from-amber-50 to-orange-50 p-8 dark:border-neutral-800 dark:from-neutral-900 dark:to-neutral-800">
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {/* Bell Container */}
            <div className="relative">
              {/* Ripple rings */}
              <AnimatePresence>
                {ripples.map((id, i) => (
                  <motion.div
                    key={id}
                    className="absolute left-1/2 top-1/2 rounded-full border-2 border-amber-400"
                    initial={{
                      width: 60,
                      height: 60,
                      x: "-50%",
                      y: "-50%",
                      opacity: 0.8,
                    }}
                    animate={{ width: 140, height: 140, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </AnimatePresence>

              {/* Particles */}
              <AnimatePresence>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-amber-400"
                    initial={{ x: "-50%", y: "-50%", scale: 0 }}
                    animate={{
                      x: Math.cos((p.angle * Math.PI) / 180) * p.distance - 4,
                      y: Math.sin((p.angle * Math.PI) / 180) * p.distance - 4,
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                ))}
              </AnimatePresence>

              {/* Glow effect */}
              <motion.div
                className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400/30 blur-xl"
                animate={{
                  scale: isActive ? 1.5 : 1,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Bell button */}
              <motion.button
                onClick={triggerNotification}
                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30 transition-shadow hover:shadow-xl hover:shadow-amber-500/40"
                animate={
                  isActive
                    ? {
                        rotate: [0, -15, 15, -10, 10, -5, 5, 0],
                        scale: [1, 1.1, 1],
                      }
                    : { rotate: 0, scale: 1 }
                }
                transition={{ duration: 0.5, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-10 w-10 text-white" fill="currentColor" />

                {/* Notification badge */}
                <AnimatePresence>
                  {notificationCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                      }}
                      className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white shadow-md"
                    >
                      {notificationCount}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* Stacked Notifications */}
            {showStack && (
              <div className="relative h-28 w-72">
                <AnimatePresence>
                  {notifications.map((notif, i) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{
                        opacity: 1 - i * 0.3,
                        y: i * 8,
                        scale: 1 - i * 0.05,
                        zIndex: 10 - i,
                      }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                      className="absolute inset-x-0 top-0 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
                          <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <p className="flex-1 truncate text-sm font-medium text-neutral-900 dark:text-white">
                          {notif.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3">
              <button
                onClick={triggerNotification}
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-amber-600 hover:shadow-lg"
                data-demo-trigger
              >
                <Sparkles className="h-4 w-4" />
                Trigger Notification
              </button>
              <button
                onClick={reset}
                className="flex items-center gap-2 rounded-xl bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Breakdown cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
              <div className="h-4 w-4 rounded-full border-2 border-amber-500" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Ripple Rings
            </h4>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Expanding circles with staggered delays create a radar-like pulse
              effect.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 dark:bg-orange-900/30">
              <Sparkles className="h-4 w-4 text-orange-500" />
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Particle Burst
            </h4>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Calculated angles distribute particles evenly for a satisfying
              explosion.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                3
              </div>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Badge Pop
            </h4>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Spring animation makes the badge feel physical as it pops into
              view.
            </p>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-6 rounded bg-indigo-400" />
                <div className="h-1 w-5 rounded bg-indigo-300" />
                <div className="h-1 w-4 rounded bg-indigo-200" />
              </div>
            </div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
              Stacked Cards
            </h4>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              Notifications stack with decreasing opacity and scale for depth.
            </p>
          </div>
        </div>

        {/* Pro tip */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">
            Layering Creates Delight
          </p>
          <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-300/80">
            The magic of this animation comes from coordinating multiple
            layers—each simple on its own, but combined they create a rich,
            app-quality experience. The bell shake draws attention, ripples add
            spatial context, particles provide celebration, and the badge gives
            actionable information. Time your layers to feel simultaneous but
            not identical.
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

