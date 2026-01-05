"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { 
  Download, 
  ShareIos, 
  Trash, 
  Edit, 
  MoreHorizCircle, 
  Heart,
  Archive,
  TriangleFlag
} from "iconoir-react";

type LabelMode = "icon-only" | "icon-text" | "text-only";

export function IconTextPairingDemo() {
  const [mode, setMode] = useState<LabelMode>("icon-text");

  return (
    <ExampleWrapper
      title="Icons & Labels"
      description="Compare clarity and scanability of different labeling strategies"
      controls={
        <ControlGroup label="Style">
          <ControlButton
            active={mode === "icon-only"}
            onClick={() => setMode("icon-only")}
          >
            Icon Only
          </ControlButton>
          <ControlButton
            active={mode === "icon-text"}
            onClick={() => setMode("icon-text")}
          >
            Icon + Text
          </ControlButton>
          <ControlButton
            active={mode === "text-only"}
            onClick={() => setMode("text-only")}
          >
            Text Only
          </ControlButton>
        </ControlGroup>
      }
    >
      <div className="space-y-8">
        {/* Toolbar Example */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Toolbar Context</p>
          <div className="flex items-center gap-2 p-2 bg-neutral-100 rounded-lg border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
            {[
              { icon: Edit, label: "Edit" },
              { icon: ShareIos, label: "Share" },
              { icon: Download, label: "Export" },
              { icon: Archive, label: "Archive" },
              { icon: Trash, label: "Delete", danger: true }
            ].map((item, i) => (
              <button
                key={i}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-400",
                  item.danger 
                    ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" 
                    : "text-neutral-700 hover:bg-white hover:shadow-sm dark:text-neutral-300 dark:hover:bg-neutral-800"
                )}
                title={mode === "icon-only" ? item.label : undefined}
              >
                {mode !== "text-only" && <item.icon width={18} height={18} />}
                {mode !== "icon-only" && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Card Action Example */}
        <div className="space-y-2">
           <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider">Card Actions</p>
           <div className="max-w-sm rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:bg-neutral-950 dark:border-neutral-800">
             <div className="flex items-start justify-between">
               <div>
                 <h4 className="font-semibold text-neutral-900 dark:text-white">Project Alpha</h4>
                 <p className="text-sm text-neutral-500">Updated 2 hours ago</p>
               </div>
               <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
                 <MoreHorizCircle width={20} height={20} />
               </button>
             </div>
             
             <div className="mt-6 flex gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-900">
               <button className={cn(
                 "flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:bg-transparent dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900",
                 mode === "icon-only" && "px-0"
               )}>
                 {mode !== "text-only" && <Heart width={16} height={16} />}
                 {mode !== "icon-only" && <span>Favorite</span>}
               </button>
               
               <button className={cn(
                 "flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:bg-transparent dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900",
                  mode === "icon-only" && "px-0"
               )}>
                 {mode !== "text-only" && <TriangleFlag width={16} height={16} />}
                 {mode !== "icon-only" && <span>Report</span>}
               </button>
             </div>
           </div>
        </div>

        {/* Insight */}
        <div className="rounded-md bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
          <p className="font-semibold mb-1">
            {mode === "icon-only" && "Ambiguous:"}
            {mode === "icon-text" && "Clear & Scannable:"}
            {mode === "text-only" && "Functional but Dry:"}
          </p>
          <p className="opacity-90">
            {mode === "icon-only" && "Efficient space usage, but relies on users knowing exactly what icons mean. 'Archive' and 'Export' are easily confused."}
            {mode === "icon-text" && "Best of both worlds. Icons provide quick recognition, text removes ambiguity. Uses more space but reduces cognitive load."}
            {mode === "text-only" && "Zero ambiguity, but harder to scan quickly. Icons act as visual anchors that speed up recognition."}
          </p>
        </div>
      </div>
    </ExampleWrapper>
  );
}

