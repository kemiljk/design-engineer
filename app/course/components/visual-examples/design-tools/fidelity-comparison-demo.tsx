"use client";

import React, { useState } from "react";
import { ExampleWrapper, ControlButton, ControlGroup } from "../base/example-wrapper";
import { cn } from "@/lib/utils";
import { User, Pin, Star } from "iconoir-react";

type Fidelity = "low" | "medium" | "high";

export function FidelityComparisonDemo() {
  const [fidelity, setFidelity] = useState<Fidelity>("medium");

  return (
    <ExampleWrapper
      title="Prototype Fidelity"
      description="The same screen at different levels of detail"
      controls={
        <ControlGroup label="Fidelity">
          <ControlButton active={fidelity === "low"} onClick={() => setFidelity("low")}>Low (Wireframe)</ControlButton>
          <ControlButton active={fidelity === "medium"} onClick={() => setFidelity("medium")}>Medium (Grayscale)</ControlButton>
          <ControlButton active={fidelity === "high"} onClick={() => setFidelity("high")}>High (Polished)</ControlButton>
        </ControlGroup>
      }
    >
      <div className="flex justify-center p-6 bg-neutral-100 rounded-xl dark:bg-neutral-900/50">
        <div className="w-[320px] bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-neutral-800 dark:border-neutral-700 dark:bg-neutral-950 flex flex-col h-[580px]">
          
          {/* Header */}
          <div className={cn(
            "h-14 flex items-center justify-between px-4 shrink-0",
            fidelity === "high" ? "bg-white border-b border-neutral-100 dark:bg-neutral-950 dark:border-neutral-800" : "border-b border-neutral-300 dark:border-neutral-700"
          )}>
            <div className={cn("w-6 h-6", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded-full dark:bg-neutral-800")}></div>
            <div className={cn("w-24 h-4", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded dark:bg-neutral-800")}></div>
            <div className={cn("w-6 h-6", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded-full dark:bg-neutral-800")}></div>
          </div>

          {/* Hero Image */}
          <div className={cn(
            "h-48 w-full flex items-center justify-center shrink-0 relative",
            fidelity === "low" ? "bg-white border-b border-neutral-300 relative" : "",
            fidelity === "medium" ? "bg-neutral-300 dark:bg-neutral-800" : "",
            fidelity === "high" ? "bg-blue-600" : ""
          )}>
             {fidelity === "low" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-[1px] bg-neutral-300 absolute top-1/2 -translate-y-1/2 rotate-12"></div>
                  <div className="w-full h-[1px] bg-neutral-300 absolute top-1/2 -translate-y-1/2 -rotate-12"></div>
                </div>
             )}
             {fidelity === "high" && (
                <div className="text-white text-opacity-80 text-6xl">🏔️</div>
             )}
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            {/* Title Row */}
            <div className="flex justify-between items-start mb-2">
              <div className={cn("h-6 w-3/4 mb-2", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-800 rounded dark:bg-neutral-200")}>
                 {fidelity === "high" && <span className="text-xl font-bold text-neutral-900 block -mt-1 dark:text-white">Alpine Lodge</span>}
              </div>
              <div className={cn("h-6 w-12", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded dark:bg-neutral-800")}>
                  {fidelity === "high" && (
                    <div className="flex items-center gap-1 text-sm font-semibold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded dark:bg-neutral-800 dark:text-white">
                      <Star width={12} height={12} fill="currentColor" /> 4.9
                    </div>
                  )}
              </div>
            </div>

            {/* Location */}
             <div className="flex items-center gap-2 mb-6">
                <div className={cn("w-4 h-4", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-300 rounded-full dark:bg-neutral-700")}>
                    {fidelity === "high" && <Pin width={16} height={16} className="text-neutral-500" />}
                </div>
                <div className={cn("h-3 w-1/2", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded dark:bg-neutral-800")}>
                    {fidelity === "high" && <span className="text-sm text-neutral-500 block -mt-1">Aspen, Colorado</span>}
                </div>
             </div>

            {/* Description lines */}
            <div className="space-y-2 mb-6">
              <div className={cn("h-2 w-full", fidelity === "low" ? "border border-neutral-300" : "bg-neutral-100 rounded dark:bg-neutral-900")}></div>
              <div className={cn("h-2 w-full", fidelity === "low" ? "border border-neutral-300" : "bg-neutral-100 rounded dark:bg-neutral-900")}></div>
              <div className={cn("h-2 w-2/3", fidelity === "low" ? "border border-neutral-300" : "bg-neutral-100 rounded dark:bg-neutral-900")}></div>
              {fidelity === "high" && <p className="text-sm text-neutral-600 mt-[-3.5rem] relative z-10 bg-white/80 p-1 dark:bg-neutral-950/80 dark:text-neutral-400">Experience the ultimate winter getaway in our luxury cabins...</p>}
            </div>

            {/* Avatar Stack */}
             <div className="flex items-center gap-3 mt-auto">
                <div className="flex -space-x-2">
                   {[1,2,3].map(i => (
                     <div key={i} className={cn("w-8 h-8 rounded-full border-2 border-white dark:border-neutral-950", fidelity === "low" ? "bg-white border-neutral-400" : "bg-neutral-300 dark:bg-neutral-800")}>
                        {fidelity === "high" && <User className="w-full h-full p-1.5 text-white/50" />}
                     </div>
                   ))}
                </div>
                <div className={cn("h-3 w-20", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded dark:bg-neutral-800")}>
                   {fidelity === "high" && <span className="text-xs text-neutral-500 block -mt-1">+12 friends</span>}
                </div>
             </div>
          </div>

          {/* Bottom Action Bar */}
          <div className={cn(
            "p-5 border-t",
            fidelity === "low" ? "border-neutral-300 bg-white" : "",
            fidelity === "medium" ? "border-neutral-100 bg-white dark:bg-neutral-950 dark:border-neutral-800" : "",
            fidelity === "high" ? "border-neutral-100 bg-white flex items-center justify-between dark:bg-neutral-950 dark:border-neutral-800" : ""
          )}>
            {fidelity === "high" ? (
               <>
                 <div>
                   <div className="text-sm text-neutral-500">Total Price</div>
                   <div className="text-lg font-bold text-neutral-900 dark:text-white">$320<span className="text-sm font-normal text-neutral-500">/night</span></div>
                 </div>
                 <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-colors">
                   Book Now
                 </button>
               </>
            ) : (
              <div className="flex items-center justify-between w-full">
                 <div className="flex flex-col gap-1">
                   <div className={cn("h-3 w-16", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-200 rounded dark:bg-neutral-800")}></div>
                   <div className={cn("h-5 w-24", fidelity === "low" ? "border border-neutral-400" : "bg-neutral-800 rounded dark:bg-neutral-200")}></div>
                 </div>
                 <div className={cn("h-12 w-32", fidelity === "low" ? "border border-neutral-400 bg-white" : "bg-neutral-800 rounded-lg dark:bg-neutral-200")}></div>
              </div>
            )}
          </div>

        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {fidelity === "low" && "Focus on layout, structure, and content placement."}
        {fidelity === "medium" && "Focus on hierarchy, spacing, and contrast without color distraction."}
        {fidelity === "high" && "Focus on visual polish, branding, and emotional impact."}
      </div>
    </ExampleWrapper>
  );
}

