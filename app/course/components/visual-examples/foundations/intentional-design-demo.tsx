"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { InfoCircle } from "iconoir-react";

type DesignIntent = "arbitrary" | "intentional";

export function IntentionalDesignDemo() {
  const [intent, setIntent] = useState<DesignIntent>("intentional");
  const [showRationale, setShowRationale] = useState(false);

  return (
    <ExampleWrapper
      title="Intentional Design"
      description="Compare arbitrary styling vs. decisions with a purpose"
      controls={
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between w-full">
          <ControlGroup label="Approach">
            <ControlButton
              active={intent === "arbitrary"}
              onClick={() => {
                setIntent("arbitrary");
                setShowRationale(false);
              }}
            >
              Arbitrary
            </ControlButton>
            <ControlButton
              active={intent === "intentional"}
              onClick={() => setIntent("intentional")}
            >
              Intentional
            </ControlButton>
          </ControlGroup>
          
          {intent === "intentional" && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-500">Show Rationale</span>
              <button
                onClick={() => setShowRationale(!showRationale)}
                className={cn(
                  "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2",
                  showRationale ? "bg-neutral-900 dark:bg-white" : "bg-neutral-200 dark:bg-neutral-700"
                )}
              >
                <span
                  className={cn(
                    "inline-block h-3 w-3 transform rounded-full bg-white transition-transform dark:bg-neutral-900",
                    showRationale ? "translate-x-5" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          )}
        </div>
      }
    >
      <div className="grid gap-8 lg:grid-cols-2">
        {/* The Component */}
        <div className="flex items-center justify-center p-6 bg-neutral-50 rounded-lg border border-neutral-200 dark:bg-neutral-900/50 dark:border-neutral-800">
          {intent === "arbitrary" ? (
            <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-neutral-900">
              <div className="h-24 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <div className="px-6 py-4 -mt-10 relative">
                <div className="h-20 w-20 rounded-xl bg-white p-1 shadow-lg mx-auto transform rotate-3">
                  <div className="h-full w-full bg-neutral-200 rounded-lg"></div>
                </div>
                <div className="mt-3 text-center">
                  <h3 className="text-xl font-serif text-blue-600 dark:text-blue-400">Sarah Jenkins</h3>
                  <p className="text-xs text-neutral-400 uppercase tracking-widest mt-1">Product Designer</p>
                </div>
                <div className="mt-6 flex justify-center gap-3">
                  <button className="rounded-full bg-pink-500 text-white px-6 py-2 text-sm shadow-md shadow-pink-200 dark:shadow-none hover:rotate-2 transition-transform">
                    Follow
                  </button>
                </div>
              </div>
              <div className="px-6 py-4 border-t border-dashed border-neutral-300 bg-neutral-50 dark:bg-neutral-950 dark:border-neutral-800">
                <div className="flex justify-between text-center">
                  <div>
                    <div className="text-lg font-bold text-neutral-800 dark:text-neutral-200">1.2k</div>
                    <div className="text-[10px] text-neutral-500">Followers</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-neutral-800 dark:text-neutral-200">450</div>
                    <div className="text-[10px] text-neutral-500">Following</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-[280px] bg-white rounded-lg border border-neutral-200 shadow-sm overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="h-12 w-12 rounded-full bg-neutral-200 shrink-0"></div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 dark:text-white">Sarah Jenkins</h3>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Product Designer</p>
                    </div>
                  </div>
                  <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                    <span className="sr-only">Options</span>
                    <div className="flex gap-0.5">
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                      <div className="h-1 w-1 rounded-full bg-current"></div>
                    </div>
                  </button>
                </div>
                
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed dark:text-neutral-300">
                  Designing thoughtful interfaces for complex problems. Currently building design systems at Acme Corp.
                </p>
                
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 rounded-md bg-neutral-900 py-1.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors">
                    Follow
                  </button>
                  <button className="flex-1 rounded-md border border-neutral-200 bg-white py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors">
                    Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* The Analysis */}
        <div className="space-y-4">
          <h4 className="font-medium text-neutral-900 dark:text-white flex items-center gap-2">
            <InfoCircle className="h-4 w-4" />
            Analysis
          </h4>
          
          {intent === "arbitrary" ? (
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li className="flex gap-2 text-red-600 dark:text-red-400">
                <span>✗</span>
                <span><strong>Decoration:</strong> Gradient background adds noise but no information.</span>
              </li>
              <li className="flex gap-2 text-red-600 dark:text-red-400">
                <span>✗</span>
                <span><strong>Inconsistency:</strong> Mixed font styles (Serif header, Sans body).</span>
              </li>
              <li className="flex gap-2 text-red-600 dark:text-red-400">
                <span>✗</span>
                <span><strong>Confusion:</strong> Rotated avatar looks broken or "playful" without context.</span>
              </li>
              <li className="flex gap-2 text-red-600 dark:text-red-400">
                <span>✗</span>
                <span><strong>Distraction:</strong> Pink button draws attention but clashes with blue theme.</span>
              </li>
            </ul>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Every element serves a specific purpose. {showRationale ? "Hover over highlighted areas to see why." : "Toggle 'Show Rationale' to see the reasoning."}
              </p>
              
              {showRationale ? (
                <ul className="space-y-3 text-sm">
                  <li className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                    <span className="block text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-0.5">Hierarchy</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Name is boldest (primary), role is lighter (secondary), bio is regular (content).</span>
                  </li>
                  <li className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                    <span className="block text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-0.5">Grouping</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Avatar and text are grouped by proximity to establish relationship.</span>
                  </li>
                  <li className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                    <span className="block text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-0.5">Actions</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Primary action (Follow) is filled. Secondary action (Message) is outlined.</span>
                  </li>
                  <li className="relative pl-4 border-l-2 border-neutral-200 dark:border-neutral-800">
                    <span className="block text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider mb-0.5">Constraint</span>
                    <span className="text-neutral-600 dark:text-neutral-400">Minimal styling ensures content (the person) is the focus, not the card.</span>
                  </li>
                </ul>
              ) : (
                 <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex gap-2 text-green-600 dark:text-green-400">
                    <span>✓</span>
                    <span><strong>Clear Hierarchy:</strong> Name → Role → Bio → Actions</span>
                  </li>
                  <li className="flex gap-2 text-green-600 dark:text-green-400">
                    <span>✓</span>
                    <span><strong>Standard Patterns:</strong> Actions look like actions, text looks like text.</span>
                  </li>
                  <li className="flex gap-2 text-green-600 dark:text-green-400">
                    <span>✓</span>
                    <span><strong>Scannability:</strong> Left-aligned text is easier to read than centered.</span>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </ExampleWrapper>
  );
}

