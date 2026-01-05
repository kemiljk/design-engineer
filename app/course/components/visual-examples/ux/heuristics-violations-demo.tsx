"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { AlertCircle, HelpCircle, CheckCircle2 } from "lucide-react";

type Mode = "violations" | "fixes";

export function HeuristicsViolationsDemo() {
  const [mode, setMode] = useState<Mode>("fixes");

  return (
    <ExampleWrapper
      title="Usability Heuristics"
      description="Identifying and fixing common usability violations"
      controls={
        <ControlGroup label="Version">
          <ControlButton active={mode === "violations"} onClick={() => setMode("violations")}>Violations</ControlButton>
          <ControlButton active={mode === "fixes"} onClick={() => setMode("fixes")}>Fixes</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-6 bg-neutral-100 rounded-xl dark:bg-neutral-900/50">
        <div className="w-full max-w-[340px] bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden dark:bg-neutral-950 dark:border-neutral-800">
          
          {/* Header */}
          <div className="h-12 border-b border-neutral-100 flex items-center justify-between px-4 dark:border-neutral-900">
            <span className="font-bold text-neutral-900 dark:text-white">Settings</span>
            {mode === "fixes" && <button className="text-neutral-400 hover:text-neutral-900"><HelpCircle size={18} /></button>}
          </div>

          <div className="p-5 space-y-6">
            
            {/* Violation 1: Visibility of System Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {mode === "violations" ? "System Config" : "Notification Status"}
              </label>
              {mode === "violations" ? (
                <div className="text-sm text-neutral-500">Processing...</div>
              ) : (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-100 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium">Changes Saved</span>
                </div>
              )}
              {mode === "violations" && <p className="text-[10px] text-red-500">Violation: No visibility of status</p>}
            </div>

            {/* Violation 2: Match between System and Real World */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {mode === "violations" ? "Execute Cron Job" : "Schedule Backup"}
              </label>
              <select className="w-full p-2 border border-neutral-200 rounded-md text-sm bg-white dark:bg-neutral-900 dark:border-neutral-800">
                {mode === "violations" ? (
                  <>
                    <option>0 0 * * 0</option>
                    <option>0 12 * * 1-5</option>
                  </>
                ) : (
                  <>
                    <option>Weekly on Sundays</option>
                    <option>Daily at Noon (Mon-Fri)</option>
                  </>
                )}
              </select>
              {mode === "violations" && <p className="text-[10px] text-red-500">Violation: System-oriented terms</p>}
            </div>

            {/* Violation 3: Consistency and Standards */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <button className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md",
                  mode === "violations" 
                    ? "bg-red-500 text-white" // "Save" shouldn't be red usually
                    : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                )}>
                  {mode === "violations" ? "Do It" : "Save Changes"}
                </button>
                <button className={cn(
                  "flex-1 py-2 text-sm font-medium rounded-md border",
                  mode === "violations"
                    ? "bg-blue-500 text-white border-blue-500" // "Cancel" shouldn't be primary color
                    : "border-neutral-200 bg-white text-neutral-700 dark:bg-transparent dark:border-neutral-800 dark:text-neutral-300"
                )}>
                  Cancel
                </button>
              </div>
              {mode === "violations" && <p className="text-[10px] text-red-500">Violation: Inconsistent patterns</p>}
            </div>

          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

