"use client";

import React, { useState, useEffect } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type LoadingType = "spinner" | "progress" | "skeleton";

export function LoadingStatesDemo() {
  const [type, setType] = useState<LoadingType>("skeleton");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (type === "progress") {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 1));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [type]);

  return (
    <ExampleWrapper
      title="Loading States"
      description="Different wait times require different feedback patterns"
      controls={
        <ControlGroup label="Pattern">
          <ControlButton active={type === "spinner"} onClick={() => setType("spinner")}>Spinner (&lt;1s)</ControlButton>
          <ControlButton active={type === "skeleton"} onClick={() => setType("skeleton")}>Skeleton (1-3s)</ControlButton>
          <ControlButton active={type === "progress"} onClick={() => setType("progress")}>Progress (&gt;3s)</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-6 bg-neutral-100 rounded-xl dark:bg-neutral-900/50">
        <div className="w-full max-w-[340px] bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden min-h-[300px] flex flex-col dark:bg-neutral-950 dark:border-neutral-800">
          
          <div className="h-14 border-b border-neutral-100 flex items-center justify-between px-4 dark:border-neutral-900">
            <div className="h-4 w-24 bg-neutral-100 rounded dark:bg-neutral-900"></div>
            <div className="h-8 w-8 rounded-full bg-neutral-100 dark:bg-neutral-900"></div>
          </div>

          <div className="flex-1 p-6 flex flex-col justify-center">
             
             {type === "spinner" && (
               <div className="flex flex-col items-center gap-3">
                 <Loader2 className="animate-spin text-blue-600" size={32} />
                 <span className="text-sm text-neutral-500">Loading...</span>
               </div>
             )}

             {type === "skeleton" && (
               <div className="space-y-6 animate-pulse">
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-neutral-100 rounded-full dark:bg-neutral-900"></div>
                   <div className="space-y-2 flex-1 pt-1">
                     <div className="h-4 w-3/4 bg-neutral-100 rounded dark:bg-neutral-900"></div>
                     <div className="h-3 w-1/2 bg-neutral-100 rounded dark:bg-neutral-900"></div>
                   </div>
                 </div>
                 <div className="space-y-2">
                   <div className="h-32 w-full bg-neutral-100 rounded-lg dark:bg-neutral-900"></div>
                   <div className="h-4 w-full bg-neutral-100 rounded dark:bg-neutral-900"></div>
                   <div className="h-4 w-2/3 bg-neutral-100 rounded dark:bg-neutral-900"></div>
                 </div>
               </div>
             )}

             {type === "progress" && (
               <div className="space-y-4 max-w-[200px] mx-auto w-full text-center">
                 <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden dark:bg-neutral-900">
                   <div 
                     className="bg-blue-600 h-full transition-all duration-100 ease-linear rounded-full"
                     style={{ width: `${progress}%` }}
                   ></div>
                 </div>
                 <div className="text-sm text-neutral-500 font-medium font-mono">
                   {progress}% Uploaded
                 </div>
                 <button className="text-xs text-red-500 hover:text-red-700 font-medium">
                   Cancel Upload
                 </button>
               </div>
             )}

          </div>
        </div>
      </div>
    </ExampleWrapper>
  );
}

