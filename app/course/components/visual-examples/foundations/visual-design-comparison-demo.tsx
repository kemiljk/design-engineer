"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Check, AlertCircle } from "lucide-react";

type DesignMode = "decoration" | "communication";

export function VisualDesignComparisonDemo() {
  const [mode, setMode] = useState<DesignMode>("communication");

  return (
    <ExampleWrapper
      title="Communication vs. Decoration"
      description="See how visual choices impact clarity and usability"
      controls={
        <ControlGroup label="Focus">
          <ControlButton
            active={mode === "decoration"}
            onClick={() => setMode("decoration")}
          >
            Decoration
          </ControlButton>
          <ControlButton
            active={mode === "communication"}
            onClick={() => setMode("communication")}
          >
            Communication
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="mx-auto max-w-sm rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950 overflow-hidden">
        {mode === "decoration" ? (
          // Decoration Mode
          <div className="p-6 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-md shadow-lg flex items-center justify-center border-2 border-white/50">
                <span className="text-3xl">✨</span>
              </div>
            </div>
            
            <h3 className="mb-2 text-center text-2xl font-black tracking-widest uppercase drop-shadow-md">
              Complete
            </h3>
            
            <p className="mb-8 text-center text-white/90 font-serif italic text-lg">
              Your task has been successfully processed by our systems.
            </p>
            
            <button className="w-full rounded-full bg-white/20 backdrop-blur-md border border-white/40 py-4 font-bold uppercase tracking-widest shadow-xl hover:bg-white/30 transition-all transform hover:scale-105">
              Continue
            </button>
            
            <div className="mt-4 text-center text-xs text-white/60">
              * Decoration prioritises aesthetics over clarity
            </div>
          </div>
        ) : (
          // Communication Mode
          <div className="p-6 bg-white dark:bg-neutral-950">
            <div className="mb-6 flex justify-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <Check className="h-6 w-6" />
              </div>
            </div>
            
            <h3 className="mb-2 text-center text-lg font-semibold text-neutral-900 dark:text-white">
              Payment Successful
            </h3>
            
            <p className="mb-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
              Your transfer of £450.00 has been sent to James Smith.
            </p>
            
            <div className="space-y-3">
              <button className="w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors">
                Done
              </button>
              
              <button className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 border border-neutral-200 dark:bg-transparent dark:border-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white transition-colors">
                View Receipt
              </button>
            </div>
            
            <div className="mt-6 flex items-start gap-2 rounded-md bg-neutral-50 p-3 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
              <AlertCircle className="h-4 w-4 shrink-0 text-neutral-500" />
              <p>Communication prioritises clarity, hierarchy, and actionable feedback.</p>
            </div>
          </div>
        )}
      </div>
    </ExampleWrapper>
  );
}

