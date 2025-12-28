"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExampleWrapper, ControlGroup, ControlButton } from "../base/example-wrapper";
import { CodePanel, type CodeTab } from "./code-panel";

// Reusable Toggle Component for variants
function ToggleVariant({ 
  label, 
  activeLabel = "On",
  inactiveLabel = "Off",
  type = "ios",
  color = "indigo"
}: { 
  label: string, 
  activeLabel?: string, 
  inactiveLabel?: string,
  type?: "ios" | "neon" | "pastel",
  color?: string
}) {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className="p-6 transition-colors"
      style={{
        borderRadius: 20,
        background: type === "neon" 
          ? "linear-gradient(135deg, #0a0a0a 0%, #171717 100%)"
          : type === "pastel"
            ? "linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)"
            : "linear-gradient(135deg, #18181b 0%, #27272a 100%)",
      }}
    >
      <p className={cn(
        "mb-4 text-xs font-semibold uppercase tracking-wider",
        type === "neon" ? "text-zinc-600" : type === "pastel" ? "text-pink-400" : "text-zinc-500"
      )}>
        {label}
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOn(!isOn)}
          className="relative p-0.5 transition-all duration-300 focus:outline-none"
          style={{
            width: 56,
            height: 32,
            borderRadius: 16,
            ...(type === "ios" && {
              background: isOn ? "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)" : "#3f3f46",
              boxShadow: isOn ? "0 0 12px rgba(34, 197, 94, 0.3)" : "none",
            }),
            ...(type === "neon" && {
              background: isOn ? "rgba(34, 211, 238, 0.15)" : "rgba(255, 255, 255, 0.05)",
              border: isOn ? "2px solid #22d3ee" : "2px solid #3f3f46",
              boxShadow: isOn ? "0 0 20px rgba(34, 211, 238, 0.4), inset 0 0 12px rgba(34, 211, 238, 0.1)" : "none",
            }),
            ...(type === "pastel" && {
              background: isOn 
                ? "linear-gradient(180deg, #f9a8d4 0%, #ec4899 100%)"
                : "linear-gradient(180deg, #fecdd3 0%, #fda4af 100%)",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.05)",
            }),
          }}
        >
          <motion.div
            style={{
              width: type === "neon" ? 20 : 28,
              height: type === "neon" ? 20 : 28,
              borderRadius: type === "neon" ? 10 : 14,
              background: type === "neon" ? "#22d3ee" : "white",
              boxShadow: type === "neon" 
                ? "0 0 12px rgba(34, 211, 238, 0.8)" 
                : "0 2px 6px rgba(0, 0, 0, 0.15)",
              marginTop: type === "neon" ? 2 : 0,
              marginLeft: type === "neon" ? 2 : 0,
            }}
            animate={{ x: isOn ? (type === "neon" ? 24 : 24) : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className={cn(
          "text-sm font-medium transition-colors",
          type === "neon" 
            ? (isOn ? "text-cyan-400" : "text-zinc-600")
            : type === "pastel"
              ? (isOn ? "text-pink-600" : "text-pink-400")
              : (isOn ? "text-white" : "text-zinc-500")
        )}>
          {isOn ? activeLabel : inactiveLabel}
        </span>
      </div>
    </div>
  );
}

export function ToggleSwitchDemo() {
  const [isOn, setIsOn] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const cssCode = `.toggle {
  width: 64px;
  height: 36px;
  background: linear-gradient(180deg, #e5e7eb 0%, #d1d5db 100%);
  border-radius: 18px;
  padding: 3px;
  cursor: pointer;
  transition: background 0.3s ease;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
}

.toggle[data-state="checked"] {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.toggle-thumb {
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 1px 2px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toggle[data-state="checked"] .toggle-thumb {
  transform: translateX(28px);
}`;

  const motionCode = `import { motion } from "motion/react";

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button
      onClick={() => setIsOn(!isOn)}
      style={{
        borderRadius: 20,
        background: isOn 
          ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
          : "linear-gradient(180deg, #e5e7eb 0%, #d1d5db 100%)",
      }}
      className="relative h-10 w-[72px] p-1 transition-all duration-300"
    >
      <motion.div
        className="h-8 w-8 rounded-full bg-white shadow-lg"
        animate={{ x: isOn ? 32 : 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />
    </button>
  );
}`;

  const codeTabs: CodeTab[] = [
    { label: "CSS", language: "css", code: cssCode },
    { label: "Motion", language: "tsx", code: motionCode },
  ];

  return (
    <ExampleWrapper
      title="Toggle Switch"
      description="iOS-inspired toggle with spring physics for a satisfying bounce."
      controls={
        <div className="flex items-center justify-between">
          <ControlGroup label="">
            <span className="text-xs text-neutral-500">State: {isOn ? "On" : "Off"}</span>
          </ControlGroup>
          <ControlButton active={showCode} onClick={() => setShowCode(!showCode)}>
            {showCode ? "Hide Code" : "Show Code"}
          </ControlButton>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Main interactive showcase */}
        <div className="flex flex-col items-center gap-6">
          <div
            className="relative flex h-48 w-full items-center justify-center overflow-hidden"
            style={{
              borderRadius: 24,
              background: isOn
                ? "linear-gradient(180deg, #0f172a 0%, #1e1b4b 100%)"
                : "linear-gradient(180deg, #fef3c7 0%, #fde68a 50%, #fcd34d 100%)",
              transition: "background 0.5s ease",
            }}
          >
            {/* Animated background elements */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {isOn ? (
                // Night mode - stars
                <>
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-white"
                      style={{
                        width: 2 + (i % 3),
                        height: 2 + (i % 3),
                        left: `${5 + ((i * 17) % 90)}%`,
                        top: `${5 + ((i * 23) % 90)}%`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.3, 0.8, 0.3] }}
                      transition={{
                        duration: 2 + (i % 3),
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                  <motion.div
                    className="absolute right-12 top-8 text-4xl"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    🌙
                  </motion.div>
                </>
              ) : (
                // Day mode - sun rays
                <>
                  <motion.div
                    className="absolute left-12 top-8 text-4xl"
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ☀️
                  </motion.div>
                  <motion.div
                    className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-yellow-300/30 blur-3xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </>
              )}
            </div>

            {/* Toggle and label */}
            <div className="z-10 flex items-center gap-6">
              <button
                onClick={() => setIsOn(!isOn)}
                aria-label="Toggle dark mode"
                className="relative p-1 transition-all duration-300 focus:outline-none"
                style={{
                  width: 80,
                  height: 44,
                  borderRadius: 22,
                  background: isOn
                    ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                    : "linear-gradient(180deg, #f5f5f4 0%, #e7e5e4 100%)",
                  boxShadow: isOn
                    ? "0 0 24px rgba(99, 102, 241, 0.4), inset 0 1px 1px rgba(255,255,255,0.2)"
                    : "inset 0 2px 4px rgba(0, 0, 0, 0.08)",
                }}
                role="switch"
                aria-checked={isOn}
              >
                <motion.div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    background: "white",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                  animate={{ x: isOn ? 36 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: isOn ? 360 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isOn ? (
                      <Moon className="size-4 text-indigo-600" />
                    ) : (
                      <Sun className="size-4 text-amber-500" />
                    )}
                  </motion.div>
                </motion.div>
              </button>

              <span
                className={cn(
                  "text-sm font-semibold transition-colors duration-300",
                  isOn ? "text-indigo-300" : "text-amber-800"
                )}
              >
                {isOn ? "Night Mode" : "Day Mode"}
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500">
            Toggle between day and night with satisfying spring physics
          </p>
        </div>

        {/* Toggle variants - Interactive */}
        <div className="grid gap-4 sm:grid-cols-3">
          <ToggleVariant label="iOS Style" type="ios" activeLabel="Active" inactiveLabel="Inactive" />
          <ToggleVariant label="Neon Glow" type="neon" activeLabel="On" inactiveLabel="Off" />
          <ToggleVariant label="Pastel" type="pastel" activeLabel="On" inactiveLabel="Off" />
        </div>

        {/* Spring physics callout */}
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/30">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Why Spring Physics?</p>
          <p className="mt-2 text-sm leading-relaxed text-amber-800 dark:text-amber-300/80">
            Springs create natural-feeling motion. High stiffness (500) makes it snappy, while
            moderate damping (30) allows a subtle bounce that makes the toggle feel responsive
            without being bouncy. Compare this to a linear transition—the spring feels more
            physical and satisfying.
          </p>
        </div>

        {/* Code panel */}
        {showCode && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
            <CodePanel tabs={codeTabs} />
          </motion.div>
        )}
      </div>
    </ExampleWrapper>
  );
}
